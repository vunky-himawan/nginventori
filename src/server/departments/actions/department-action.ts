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
  isDepartmentNameExists,
  isDepartmentUsedByUsers,
  updateDepartment,
} from "../repository/department-repository";
import { TIndexQueryParam } from "@/types/index-query-param";
import NotFoundException from "@/errors/NotFoundException";
import { createActivityLog } from "@/server/activity-logs/repository/activity-logs-repository";
import { transformToJSON } from "@/utils/transform-json";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";

export const getDepartmentsAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_DEPARTMENTS]);
  return await getDepartments(queryParams);
};

export const createDepartmentAction = async (data: TCreateOrUpdateDepartmentValidation) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_DEPARTMENT]);

    if (await isDepartmentNameExists(data.name)) {
      throw new BadRequestException("A department with this name already exists");
    }

    const department = await createDepartment(data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.CREATE,
      description: "Create department success",
      logName: "Create department",
      properties: transformToJSON(department),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[DepartmentAction] Error creating department", error);
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
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[DepartmentAction] Error getting department", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const updateDepartmentAction = async (
  id: number,
  data: TCreateOrUpdateDepartmentValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_DEPARTMENT]);

    const currentDepartment = await getDepartment(id);

    if (currentDepartment?.name !== data.name) {
      if (await isDepartmentNameExists(data.name)) {
        throw new BadRequestException("Department name is already taken");
      }
    }

    const department = await updateDepartment(id, data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.UPDATE,
      description: "Department updated",
      logName: "Department",
      properties: transformToJSON(department),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[DepartmentAction] Error updating department", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const deleteDepartmentAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_DEPARTMENT]);

    if (await isDepartmentUsedByUsers(id)) {
      throw new BadRequestException("Cannot delete department because it is used by users");
    }

    const department = await deleteDepartment(id);

    if (!department) {
      throw new NotFoundException("Department not found");
    }

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.DELETE,
      description: "Department deleted",
      logName: "Department",
      properties: transformToJSON(department),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[DepartmentAction] Error deleting department", error);
    throw new InternalServerErrorException("Internal server error");
  }
};
