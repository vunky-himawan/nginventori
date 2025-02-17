"use server";

import prisma from "@/libs/prisma/prisma";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/datatables/pagination";
import { EmployeePosition } from "@prisma/client";
import { TCreateOrUpdateEmployeePositionValidation } from "../validation/create-validation";


export const getEmployeePositions = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<EmployeePosition[]>> => {
  const [data, meta] = await prisma.employeePosition
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

export const createEmployeePosition = async (data: TCreateOrUpdateEmployeePositionValidation) => {
  return await prisma.employeePosition.create({
    data: {
      name: data.name,
    },
  });
};

export const getEmployeePosition = async (id:number) => {
  return await prisma.employeePosition.findUnique({
    where: { id },
  });
};

export const updateEmployeePosition = async (id: number, data: TCreateOrUpdateEmployeePositionValidation) =>{
  return await prisma.employeePosition.update({
    where: {id},
    data: {
      name: data.name,
    },
  });
};

export const deleteEmployeePosition = async (id: number) => {
  const employeePositionToDelete = await prisma.employeePosition.findUnique({
    where: {id},
  });

  await prisma.employeePosition.delete({where:{id}});

  return employeePositionToDelete;
};

export const isEmployeePositionNameExists = async (name: string) => {
  const employeePosition = await prisma.employeePosition.findFirst({
    where: {
      name: name,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  return !!employeePosition;
};

export const isEmployeePositionUsedByUsers = async (id: number) => {
  const userCount = await prisma.user.count({ where: { positionId: id} });

  return userCount > 0;
};

