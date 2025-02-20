import { PERMISSIONS } from "@/common/enums/permissions";
import { TIndexQueryParam } from "@/types/index-query-param";
import { serverCheckPermissions } from "@/utils/permission";

import BadRequestException from "@/errors/BadRequestException";
import { createActivityLog } from "@/server/activity-logs/repository/activity-logs-repository";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";
import { transformToJSON } from "@/utils/transform-json";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import NotFoundException from "@/errors/NotFoundException";
import { console } from "inspector";
import { TCreateOrUpdateEmployeeTypeValidation } from "../validation/create-validation";
import { createEmployeeType, deleteEmployeeType, getEmployeeType, getEmployeeTypes, isEmployeeTypeNameExists, isEmployeeTypeUsedByUsers, updateEmployeeType } from "../repository/employee-type-repository";

export const getEmployeeTypesAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_EMPLOYEE_TYPES]);
  return await getEmployeeTypes(queryParams);
};

export const createEmployeeTypeAction = async (
  data: TCreateOrUpdateEmployeeTypeValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_EMPLOYEE_TYPE]);

    if (await isEmployeeTypeNameExists(data.name)) {
      throw new BadRequestException("A Employee Type with this name already exists");
    }

    const employeeType = await createEmployeeType(data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.CREATE,
      description: "Create employee Type success",
      logName: "Create employee Type",
      properties: transformToJSON(employeeType),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[EmployeeTypeAction] Error getting Employee Type", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const getEmployeeTypeAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.SHOW_EMPLOYEE_TYPE]);
    const employeeType = await getEmployeeType(id);

    if (!employeeType) {
      throw new NotFoundException("Employee Type not Found");
    }
    return employeeType;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[EmployeeTypeAction] Error getting Employee Type", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const updateEmployeeTypeAction = async (
  id: number,
  data: TCreateOrUpdateEmployeeTypeValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_EMPLOYEE_TYPE]);

    const currentEmployeeType = await getEmployeeType(id);

    if (currentEmployeeType?.name !== data.name) {
      if (await isEmployeeTypeNameExists(data.name)) {
        throw new BadRequestException("Employee Type name is already taken");
      }
    }

    const employeeType = await updateEmployeeType(id, data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.UPDATE,
      description: "Employee Type updated",
      logName: "Employee Type",
      properties: transformToJSON(employeeType),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[EmployeeTypeAction] Error getting Employee Type", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const deleteEmployeeTypeAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_EMPLOYEE_TYPE]);

    if (await isEmployeeTypeUsedByUsers(id)) {
      throw new BadRequestException("Cannot delete employee Type because it is used by users");
    }

    const employeeType = await deleteEmployeeType(id);

    if (!employeeType) {
      throw new NotFoundException("Employee Type not Found");
    }

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.DELETE,
      description: "Employee Type deleted",
      logName: "Employee Type",
      properties: transformToJSON(employeeType),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[EmployeeTypeAction] Error getting Employee Type", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};
