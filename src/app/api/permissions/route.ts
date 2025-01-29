import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { getPermissionsAction } from "@/server/permissions/actions/permissions-action";

export const GET = async () => {
  try {
    const permissions = await getPermissionsAction();

    return new SuccessResponse(permissions, "Permissions retrieved successfully");
  } catch (error) {
    console.log("[/api/permissions] error", error);
    return new InternalServerErrorException("Internal Server Error");
  }
};
