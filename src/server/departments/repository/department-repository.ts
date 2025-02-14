"use server";

import prisma from "@/libs/prisma/prisma";
import { TCreateOrUpdateDepartmentValidation } from "../validation/create-update-validation";
import { Department } from "@prisma/client";
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
        ...(queryParams.withTrashed === 1 ? {} : { deletedAt: null }),
        ...(queryParams.withTrashed === 2 ? { deletedAt: { not: null } } : {}),
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
  return {
    data,
    meta: convertPaginationMeta(meta, queryParams),
  };
};

export const createDepartment = async (data: TCreateOrUpdateDepartmentValidation) => {
  return await prisma.department.create({
    data: {
      name: data.name,
    },
  });
};

export const getDepartment = async (id: number) => {
  return await prisma.department.findUnique({
    where: { id },
  });
};

export const updateDepartment = async (id: number, data: TCreateOrUpdateDepartmentValidation) => {
  return await prisma.department.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
};

export const deleteDepartment = async (id: number) => {
  const departmentToDelete = await prisma.department.findUnique({
    where: { id },
  });

  await prisma.department.delete({ where: { id } });

  return departmentToDelete;
};

export const isDepartmentNameExists = async (name: string) => {
  const department = await prisma.department.findFirst({
    where: {
      name: name,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  return !!department;
};

export const isDepartmentUsedByUsers = async (id: number) => {
  const userCount = await prisma.user.count({ where: { departmentId: id } });

  return userCount > 0;
};
