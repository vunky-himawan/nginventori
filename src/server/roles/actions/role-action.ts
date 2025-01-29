import { PERMISSIONS } from "@/common/enums/permissions";
import { serverCheckPermissions } from "@/utils/permission";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../repository/role-repository";
import { TIndexQueryParam } from "@/types/index-query-param";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import NotFoundException from "@/errors/NotFoundException";
import { TCreateOrUpdateRoleValidation } from "../validation/create-validation";

export const getRolesAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_ROLES]);
  return await getRoles(queryParams);
};

export const createRoleAction = async (data: TCreateOrUpdateRoleValidation) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_ROLE]);
    return await createRole(data);
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException("Internal server error");
  }
};

export const getRoleAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.SHOW_ROLE]);
    const role = await getRole(id);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    return role;
  } catch {
    throw new InternalServerErrorException("Internal server error");
  }
};

export const updateRoleAction = async (id: number, data: TCreateOrUpdateRoleValidation) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_ROLE]);
    return await updateRole(id, data);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new BadRequestException("Role name is already taken");
    }
    throw new InternalServerErrorException("Internal server error");
  }
};

export const deleteRoleAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_ROLE]);

    return await deleteRole(id);
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException("Internal server error");
  }
};
