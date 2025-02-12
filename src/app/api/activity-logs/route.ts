import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { getActivityLogsAction } from "@/server/activity-logs/action/activity-logs-action";
import { TIndexQueryParam } from "@/types/index-query-param";
import { transformRequest } from "@/utils/transform-request";
import { NextRequest } from "next/server";

// GET /activity-logs
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const transformedRequest = transformRequest<TIndexQueryParam>(searchParams);

    const activityLogs = await getActivityLogsAction(transformedRequest);

    return new SuccessResponse(activityLogs, "Activity logs fetched successfully");
  } catch {
    return new InternalServerErrorException("Internal server error");
  }
};
