"use server";

import prisma from "@/libs/prisma/prisma";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/datatables/pagination";
import { EmployeeType } from "@prisma/client";
import { TCreateOrUpdateEmployeeTypeValidation } from "../validation/create-validation";

export const getEmployeeTypes = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<EmployeeType[]>> => {
  const [data, meta] = await prisma.employeeType
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
        ...(queryParams.withTrashed === 0 ? { deletedAt: null } : {}),
        ...(queryParams.withTrashed === 1 ? { deletedAt: { not: null } } : {}),
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

export const createEmployeeType = async (data: TCreateOrUpdateEmployeeTypeValidation) => {
  return await prisma.employeeType.create({
    data: {
      name: data.name,
    },
  });
};

export const getEmployeeType = async (id: number) => {
  return await prisma.employeeType.findUnique({
    where: { id },
  });
};

export const updateEmployeeType = async (
  id: number,
  data: TCreateOrUpdateEmployeeTypeValidation,
) => {
  return await prisma.employeeType.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
};

export const deleteEmployeeType = async (id: number) => {
  const employeeTypeToDelete = await prisma.employeeType.findUnique({
    where: { id },
  });

  await prisma.employeeType.delete({ where: { id } });

  return employeeTypeToDelete;
};

export const isEmployeeTypeNameExists = async (name: string) => {
  const employeeType = await prisma.employeeType.findFirst({
    where: {
      name: name,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  return !!employeeType;
};

export const isEmployeeTypeUsedByUsers = async (id: number) => {
  const userCount = await prisma.user.count({ where: { typeId: id } });

  return userCount > 0;
};
