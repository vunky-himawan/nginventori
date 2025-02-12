import { PERMISSIONS } from "@/common/enums/permissions";
import { serverCheckPermissions } from "@/utils/permission";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  isRoleNameExists,
  isRoleUsedByUsers,
  updateRole,
} from "../repository/role-repository";
import { TIndexQueryParam } from "@/types/index-query-param";
import BadRequestException from "@/errors/BadRequestException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import NotFoundException from "@/errors/NotFoundException";
import { TCreateOrUpdateRoleValidation } from "../validation/create-validation";
import { createActivityLog } from "@/server/activity-logs/repository/activity-logs-repository";
import { transformToJSON } from "@/utils/transform-json";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";

export const getRolesAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_ROLES]);
  return await getRoles(queryParams);
};

export const createRoleAction = async (data: TCreateOrUpdateRoleValidation) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_ROLE]);

    if (await isRoleNameExists(data.name)) {
      throw new BadRequestException("A role with this name already exists");
    }

    const role = await createRole(data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.CREATE,
      description: "Create role success",
      logName: "Create role",
      properties: transformToJSON(role),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[RolesAction] Error creating role", error);
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
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[RolesAction] Error getting role", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const updateRoleAction = async (id: number, data: TCreateOrUpdateRoleValidation) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_ROLE]);

    const currentRole = await getRole(id);

    if (currentRole?.name !== data.name) {
      if (await isRoleNameExists(data.name)) {
        throw new BadRequestException("Role name is already taken");
      }
    }

    const role = await updateRole(id, data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.UPDATE,
      description: "Role updated",
      logName: "Role",
      properties: transformToJSON(role),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[RolesAction] Error updating role", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const deleteRoleAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_ROLE]);

    if (await isRoleUsedByUsers(id)) {
      throw new BadRequestException("Cannot delete role because it is used by users");
    }

    const role = await deleteRole(id);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.DELETE,
      description: "Role deleted",
      logName: "Role",
      properties: transformToJSON(role),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    } else if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[RoleAction] Error deleting role", error);
    throw new InternalServerErrorException("Internal server error");
  }
};
