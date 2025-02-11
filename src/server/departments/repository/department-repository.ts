"use server";

import prisma from "@/libs/prisma/prisma";
import { TCreateOrUpdateDepartmentValidation } from "../validation/create-update-validation";
import BadRequestException from "@/errors/BadRequestException";
import { Department, Prisma } from "@prisma/client";
import { PrismaError } from "@/common/enums/prisma-error-enum";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/datatables/pagination";

export const getDepartments = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<Department[]>> => {
  const [data, meta] = await prisma.department
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
        ...(queryParams.withTrashed === 0 ? { deleted_at: null } : {}),
        ...(queryParams.withTrashed === 1 ? { deleted_at: { not: null } } : {}),
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

export const createDepartment = async (data: TCreateOrUpdateDepartmentValidation) => {
  const existingDepartment = await prisma.department.findFirst({
    where: {
      name: data.name,
      deleted_at: null,
    },
  });

  if (existingDepartment) {
    throw new BadRequestException("A department with this name already exists");
  }

  try {
    return await prisma.department.create({
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PrismaError.P2002) {
        throw new BadRequestException("A department with this name already exists");
      }
    }
    throw error;
  }
};

export const getDepartment = async (id: number) => {
  const department = await prisma.department.findUnique({
    where: { id },
  });
  if (!department) return null;

  return {
    ...department,
  };
};

export const updateDepartment = async (id: number, data: TCreateOrUpdateDepartmentValidation) => {
  await prisma.department.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
  return await prisma.department.findUnique({ where: { id } });
};

export const deleteDepartment = async (id: number) => {
  try {
    const userCount = await prisma.user.count({ where: { department_id: id } });

    if (userCount > 0) {
      throw new BadRequestException("Cannot delete department with users");
    }

    return await prisma.department.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
};
