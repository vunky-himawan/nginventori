import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { Role } from "@prisma/client";
import prisma, { prismaWithTrashed } from "@/libs/prisma/prisma";
import { convertPaginationMeta } from "@/utils/datatables/pagination";
import { TCreateOrUpdateRoleValidation } from "../validation/create-validation";

export const getRoles = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<Role[]>> => {
  const [data, meta] = await prismaWithTrashed.role
    .paginate({
      include: {
        permissions: {
          select: {
            permission: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        ...(queryParams.search
          ? {
              name: {
                contains: queryParams.search,
                mode: "insensitive",
              },
            }
          : {}),
        deletedAt: null,
      },
      orderBy: {
        ...(queryParams.sort && queryParams.order
          ? {
              [queryParams.sort]: queryParams.order,
            }
          : {
              createdAt: "desc",
            }),
      },
    })
    .withPages({
      page: queryParams.page,
      limit: queryParams.perPage,
    });

  const transformedData = data.map((role) => ({
    ...role,
    permissions: role.permissions.map((p) => p.permission.name),
  }));

  return {
    data: transformedData,
    meta: convertPaginationMeta(meta, queryParams),
  };
};

export const createRole = async (data: TCreateOrUpdateRoleValidation) => {
  return await prisma.role.create({
    data: {
      name: data.name,
      permissions: {
        create: data.permissionIds.map((permissionId) => ({
          permission: { connect: { id: permissionId } },
        })),
      },
    },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });
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
  return await prisma.$transaction(async (prisma) => {
    await prisma.role.update({
      where: { id },
      data: { name: data.name },
    });

    if (data.permissionIds) {
      await prisma.roleHasPermission.deleteMany({
        where: { roleId: id },
      });

      if (data.permissionIds.length > 0) {
        await prisma.roleHasPermission.createMany({
          data: data.permissionIds.map((permissionId) => ({
            roleId: id,
            permissionId: permissionId,
          })),
        });
      }
    }

    return await prisma.role.findFirstOrThrow({
      where: { id },
      include: { permissions: { include: { permission: true } } },
    });
  });
};

export const deleteRole = async (id: number) => {
  const roleToDelete = await prisma.role.findUnique({
    where: { id },
    include: { permissions: true },
  });

  await prisma.$transaction(async (tx) => {
    await tx.roleHasPermission.deleteMany({ where: { roleId: id } });
    await tx.role.delete({ where: { id } });
  });

  return roleToDelete;
};

export const isRoleNameExists = async (name: string) => {
  const role = await prisma.role.findFirst({
    where: {
      name: name,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  return !!role;
};

export const isRoleUsedByUsers = async (id: number) => {
  const userCount = await prisma.user.count({ where: { roleId: id } });

  return userCount > 0;
};
