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
import { createOfficeLocation, deleteOfficeLocation, getOfficeLocation, getOfficeLocations, isOfficeLocationNameExists, isOfficeLocationUsedByUsers, updateOfficeLocation } from "../repository/office-location-repository";
import { TCreateOrUpdateOfficeLocationValidation } from "../validation/create-validation";

export const getOfficeLocationsAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_OFFICE_LOCATIONS]);
  return await getOfficeLocations(queryParams);
};

export const createOfficeLocationAction = async (
  data: TCreateOrUpdateOfficeLocationValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.CREATE_OFFICE_LOCATION]);

    if (await isOfficeLocationNameExists(data.name)) {
      throw new BadRequestException("A Employee Type with this name already exists");
    }

    const OfficeLocation = await createOfficeLocation(data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.CREATE,
      description: "Create employee Type success",
      logName: "Create employee Type",
      properties: transformToJSON(OfficeLocation),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[officeLocationAction] Error getting Employee Type", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const getOfficeLocationAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.SHOW_EMPLOYEE_TYPE]);
    const officeLocation = await getOfficeLocation(id);

    if (!officeLocation) {
      throw new NotFoundException("Office Locations not Found");
    }
    return officeLocation;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[OfficeLocationAction] Error getting Office Locations", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const updateOfficeLocationAction = async (
  id: number,
  data: TCreateOrUpdateOfficeLocationValidation,
) => {
  try {
    await serverCheckPermissions([PERMISSIONS.UPDATE_OFFICE_LOCATION]);

    const currentOfficeLocation = await getOfficeLocation(id);

    if (currentOfficeLocation?.name !== data.name) {
      if (await isOfficeLocationNameExists(data.name)) {
        throw new BadRequestException("Office Location name is already taken");
      }
    }

    const officeLocation = await updateOfficeLocation(id, data);

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.UPDATE,
      description: "Office Location updated",
      logName: "Office Location",
      properties: transformToJSON(officeLocation),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[OfficeLocationAction] Error getting Office Location", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};

export const deleteOfficeLocationAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.DELETE_OFFICE_LOCATION]);

    if (await isOfficeLocationUsedByUsers(id)) {
      throw new BadRequestException("Cannot delete Office Location because it is used by users");
    }

    const officeLocation = await deleteOfficeLocation(id);

    if (!officeLocation) {
      throw new NotFoundException("Office Location not Found");
    }

    await createActivityLog({
      action: ACTIVITY_LOG_ACTION_ENUM.DELETE,
      description: "Office Location deleted",
      logName: "Office Location",
      properties: transformToJSON(officeLocation),
      subjectType: "User",
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    console.log("[OfficeLocationAction] Error getting Employee Type", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};
