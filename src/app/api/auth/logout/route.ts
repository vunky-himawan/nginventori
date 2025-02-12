import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { createLogoutActivityLogAction } from "@/server/activity-logs/action/activity-logs-action";

// POST /auth/logout
export const POST = async () => {
  try {
    await createLogoutActivityLogAction();

    return new SuccessResponse(null);
  } catch (error) {
    console.log("[GET] Error while getting user", error);
    throw new InternalServerErrorException("Internal Server Error");
  }
};
