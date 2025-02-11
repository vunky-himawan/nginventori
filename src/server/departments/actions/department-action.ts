import { serverCheckPermissions } from "@/utils/permission";
import { TCreateOrUpdateDepartmentValidation } from "../validation/create-update-validation";
import { PERMISSIONS } from "@/common/enums/permissions";
import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "../repository/department-repository";
import { TIndexQueryParam } from "@/types/index-query-param";
import NotFoundException from "@/errors/NotFoundException";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getDepartmentsAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_DEPARTMENTS]);
  return await getDepartments(queryParams);
};

export const createDepartmentAction = async (data: TCreateOrUpdateDepartmentValidation) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_DEPARTMENT]);
    return await createDepartment(data);
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException("Internal server error");
  }
};

export const getDepartmentAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.SHOW_DEPARTMENT]);
    const department = await getDepartment(id);

    if (!department) {
      throw new NotFoundException("Department not found");
    }

    return department;
  } catch {
    throw new InternalServerErrorException("Internal server error");
  }
};

export const updateDepartmentAction = async (
  id: number,
  data: TCreateOrUpdateDepartmentValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_DEPARTMENT]);
    return await updateDepartment(id, data);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new BadRequestException("Department name is already taken");
    }
    throw new InternalServerErrorException("Internal server error");
  }
};

export const deleteDepartmentAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_DEPARTMENT]);

    return await deleteDepartment(id);
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException("Internal server error");
  }
};
