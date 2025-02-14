import { PERMISSIONS } from "@/common/enums/permissions";
import { TIndexQueryParam } from "@/types/index-query-param";
import { serverCheckPermissions } from "@/utils/permission";
import {
  createEmployeePosition,
  deleteEmployeePosition,
  getEmployeePosition,
  getEmployeePositions,
  isEmployeePositionNameExists,
  isEmployeePositionUsedByUsers,
  updateEmployeePosition,
} from "../repository/employee-position-repository";
import { TCreateOrUpdateEmployeePositionValidation } from "../validation/create-validation";
import BadRequestException from "@/errors/BadRequestException";
import { createActivityLog } from "@/server/activity-logs/repository/activity-logs-repository";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";
import { transformToJSON } from "@/utils/transform-json";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import NotFoundException from "@/errors/NotFoundException";
import { console } from "inspector";

export const getEmployeePositionsAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_EMPLOYEE_POSITIONS]);
  return await getEmployeePositions(queryParams);
};

export const createEmployeePositionAction = async (
  data: TCreateOrUpdateEmployeePositionValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_EMPLOYEE_POSITION]);

    if (await isEmployeePositionNameExists(data.name)) {
      throw new BadRequestException("A Employee Position with this name already exists");
    }

    const employeePosition = await createEmployeePosition(data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.CREATE,
      description: "Create employee position success",
      logName: "Create employee position",
      properties: transformToJSON(employeePosition),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[EmployeePositionAction] Error getting Employee Position", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const getEmployeePositionAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.SHOW_EMPLOYEE_POSITION]);
    const employeePosition = await getEmployeePosition(id);

    if (!employeePosition) {
      throw new NotFoundException("Employee Position not Found");
    }
    return employeePosition;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[EmployeePositionAction] Error getting Employee Position", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const updateEmployeePositionAction = async (
  id: number,
  data: TCreateOrUpdateEmployeePositionValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_EMPLOYEE_POSITION]);

    const currentEmployeePosition = await getEmployeePosition(id);

    if (currentEmployeePosition?.name !== data.name) {
      if (await isEmployeePositionNameExists(data.name)) {
        throw new BadRequestException("Employee Position name is already taken");
      }
    }

    const employeePosition = await updateEmployeePosition(id, data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.UPDATE,
      description: "Employee Position updated",
      logName: "Employee Position",
      properties: transformToJSON(employeePosition),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[EmployeePositionAction] Error getting Employee Position", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const deleteEmployeePositionAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_EMPLOYEE_POSITION]);

    if (await isEmployeePositionUsedByUsers(id)) {
      throw new BadRequestException("Cannot delete employee position because it is used by users");
    }

    const employeePosition = await deleteEmployeePosition(id);

    if (!employeePosition) {
      throw new NotFoundException("Employee Position not Found");
    }

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.DELETE,
      description: "Employee Position deleted",
      logName: "Employee Position",
      properties: transformToJSON(employeePosition),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[EmployeePositionAction] Error getting Employee Position", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};
