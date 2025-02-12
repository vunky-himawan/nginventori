import { PERMISSIONS } from "@/common/enums/permissions";
import { TIndexQueryParam } from "@/types/index-query-param";
import { serverCheckPermissions } from "@/utils/permission";
import {
  createActivityLog,
  getActivityLog,
  getActivityLogs,
} from "../repository/activity-logs-repository";
import { CreateActivityLogDto } from "../dto/create-activity-log-dto";
import NotFoundException from "@/errors/NotFoundException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";

export const getActivityLogsAction = async (queryParams: TIndexQueryParam) => {
  await serverCheckPermissions([PERMISSIONS.VIEW_ACTIVITY_LOGS]);
  return await getActivityLogs(queryParams);
};

export const getActivityLogAction = async (id: number) => {
  try {
    await serverCheckPermissions([PERMISSIONS.SHOW_ACTIVITY_LOG]);

    const activityLog = await getActivityLog(id);

    if (!activityLog) {
      throw new NotFoundException("Activity log not found");
    }

    return activityLog;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.log("[ActivityLogAction] Error getting activity log", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const createActivityLogAction = async (data: CreateActivityLogDto) => {
  try {
    return await createActivityLog(data);
  } catch (error) {
    console.log("[ActivityLogAction] Error creating activity log", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const createLogoutActivityLogAction = async () => {
  try {
    const log: CreateActivityLogDto = {
      action: ACTIVITY_LOG_ACTION_ENUM.LOGOUT,
      description: "User logged out",
      logName: "Logout",
      properties: {},
      subjectType: "User",
    };

    return await createActivityLog(log);
  } catch (error) {
    console.log("[ActivityLogAction] Error creating activity log", error);
    throw new InternalServerErrorException("Internal server error");
  }
};

export const createLoginActivityLogAction = async () => {
  try {
    const log: CreateActivityLogDto = {
      action: ACTIVITY_LOG_ACTION_ENUM.LOGIN,
      properties: {},
      subjectType: "User",
      description: "User logged in",
      logName: "Login",
    };

    return await createActivityLog(log);
  } catch (error) {
    console.log("[ActivityLogAction] Error creating activity log", error);
    throw new InternalServerErrorException("Internal server error");
  }
};
