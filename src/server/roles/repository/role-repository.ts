import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { Prisma, Role } from "@prisma/client";
import prisma from "@/libs/prisma/prisma";
import { convertPaginationMeta } from "@/utils/datatables/pagination";
import { TCreateOrUpdateRoleValidation } from "../validation/create-validation";
import BadRequestException from "@/errors/BadRequestException";

export const getRoles = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<Role[]>> => {
  const [data, meta] = await prisma.role
    .paginate({
      where: {
        ...(queryParams.search
          ? {
              name: {
                contains: queryParams.search,
                mode: "insensitive",
              },
            }
          : {}),
      },
      orderBy: {
        ...(queryParams.sort && queryParams.order
          ? {
              [queryParams.sort]: queryParams.order,
            }
          : {
              created_at: "desc",
            }),
      },
    })
    .withPages({
      page: queryParams.page,
      limit: queryParams.per_page,
    });

  return {
    data,
    meta: convertPaginationMeta(meta, queryParams),
  };
};

export const createRole = async (data: TCreateOrUpdateRoleValidation) => {
  const existingRole = await prisma.role.findFirst({
    where: {
      name: data.name,
      deleted_at: null,
    },
  });

  if (existingRole) {
    throw new BadRequestException("A role with this name already exists");
  }

  try {
    const role = await prisma.role.create({
      data: {
        name: data.name,
      },
    });

    if (data.permissionIds && data.permissionIds.length > 0) {
      await prisma.roleHasPermission.createMany({
        data: data.permissionIds.map((permissionId) => ({
          role_id: role.id,
          permission_id: permissionId,
        })),
      });
    }

    const roleWithPermissions = await prisma.role.findUnique({
      where: { id: role.id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return roleWithPermissions;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new BadRequestException("A role with this name already exists");
      }
    }
    throw error;
  }
};

export const getRole = async (id: number) => {
  const role = await prisma.role.findUnique({
    where: { id },
    include: {
      permissions: {
        select: {
          permission: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!role) return null;

  return {
    ...role,
    permissions: role.permissions.map((p) => p.permission),
  };
};

export const updateRole = async (id: number, data: TCreateOrUpdateRoleValidation) => {
  await prisma.role.update({
    where: { id },
    data: { name: data.name },
  });

  if (data.permissionIds) {
    await prisma.roleHasPermission.deleteMany({
      where: { role_id: id },
    });

    if (data.permissionIds.length > 0) {
      await prisma.roleHasPermission.createMany({
        data: data.permissionIds.map((permissionId) => ({
          role_id: id,
          permission_id: permissionId,
        })),
      });
    }
  }

  const roleWithPermissions = await prisma.role.findUnique({
    where: { id },
    include: { permissions: { include: { permission: true } } },
  });

  return roleWithPermissions;
};

export const deleteRole = async (id: number) => {
  try {
    const userCount = await prisma.user.count({ where: { role_id: id } });

    if (userCount > 0) {
      throw new BadRequestException("Cannot delete role because it is used by users");
    }

    await prisma.$transaction(async (tx) => {
      await tx.roleHasPermission.deleteMany({ where: { role_id: id } });
      await tx.role.delete({ where: { id } });
    });

    return true;
  } catch (error) {
    throw error;
  }
};
