import { ACTIVITY_LOG_ACTION_ENUM } from "@/common/enums/activity-log-action-enum";
import { Prisma } from "@prisma/client";

export type CreateActivityLogDto = {
  logName: string;
  description: string;
  subjectType: string;
  action: ACTIVITY_LOG_ACTION_ENUM;
  properties: Prisma.JsonValue | null;
};
