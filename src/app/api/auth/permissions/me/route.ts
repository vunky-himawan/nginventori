import ForbiddenException from "@/errors/ForbiddenException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import { SuccessResponse } from "@/responses/success-response";
import { getUserWithPermissionsAction } from "@/server/users/actions/user-action";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new ForbiddenException("Forbidden");
    }

    const data = await getUserWithPermissionsAction(userId);

    return new SuccessResponse(data, "User permissions retrieved");
  } catch {
    return new InternalServerErrorException("Internal Server Error");
  }
};
