import InternalServerErrorException from "@/errors/InternalServerErrorException";
import UnauthorizedException from "@/errors/UnauthorizedException";
import { SuccessResponse } from "@/responses/success-response";
import { getUserByClerkIdAction } from "@/server/users/actions/user-action";
import { auth } from "@clerk/nextjs/server";

// GET /api/auth/me
export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new UnauthorizedException("Unauthorized");
    }

    const user = await getUserByClerkIdAction(userId);

    return new SuccessResponse(user);
  } catch (error) {
    if (error instanceof UnauthorizedException) {
      return new UnauthorizedException(error.message);
    }
    console.log("[GET] Error while getting user", error);
    throw new InternalServerErrorException("Internal server error");
  }
};
