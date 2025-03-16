"use server";

import prisma from "@/libs/prisma/prisma";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/datatables/pagination";
import { OfficeLocation } from "@prisma/client";
import { TCreateOrUpdateOfficeLocationValidation } from "../validation/create-validation";

export const getOfficeLocations = async (
  queryParams: TIndexQueryParam,
): Promise<TPaginationResponse<OfficeLocation[]>> => {
  const [data, meta] = await prisma.officeLocation
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

export const createOfficeLocation = async (data: TCreateOrUpdateOfficeLocationValidation) => {
  return await prisma.officeLocation.create({
    data: {
      name: data.name,
    },
  });
};

export const getOfficeLocation = async (id: number) => {
  return await prisma.officeLocation.findUnique({
    where: { id },
  });
};

export const updateOfficeLocation = async (
  id: number,
  data: TCreateOrUpdateOfficeLocationValidation,
) => {
  return await prisma.officeLocation.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
};

export const deleteOfficeLocation = async (id: number) => {
  const officeLocationToDelete = await prisma.officeLocation.findUnique({
    where: { id },
  });

  await prisma.employeeType.delete({ where: { id } });

  return officeLocationToDelete;
};

export const isOfficeLocationNameExists = async (name: string) => {
  const officeLocation = await prisma.officeLocation.findFirst({
    where: {
      name: name,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  return !!officeLocation;
};

export const isOfficeLocationUsedByUsers = async (id: number) => {
  const userCount = await prisma.user.count({ where: { typeId: id } });

  return userCount > 0;
};
