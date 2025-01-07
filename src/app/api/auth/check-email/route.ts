"use server";

import { getUserByEmailAction } from "@/server/users/actions/user-action";
import { auth, clerkClient } from "@clerk/nextjs/server";
import NotFoundException from "@/errors/NotFoundException";
import InternalServerErrorException from "@/errors/InternalServerErrorException";
import UnauthorizedException from "@/errors/UnauthorizedException";
import { RedirectResponse } from "@/responses/redirect-response";

const client = await clerkClient();

export const GET = async () => {
  const { userId, sessionId } = await auth();

  try {
    if (!userId) {
      return new UnauthorizedException("Unauthorized");
    }

    const user = await client.users.getUser(userId);

    if (!user) {
      return new NotFoundException("User not found");
    }

    const email = (await user).emailAddresses[0].emailAddress;

    const userData = await getUserByEmailAction(email);

    if (!userData) {
      return RedirectResponse.temporary(
        `${process.env.NEXT_PUBLIC_APP_URL}?error=email-not-registered`,
      );
    }

    return RedirectResponse.permanent(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  } catch (error) {
    if (error instanceof NotFoundException) {
      await client.sessions.revokeSession(sessionId as string);
      return RedirectResponse.permanent(
        `${process.env.NEXT_PUBLIC_APP_URL}?error=email-not-registered`,
      );
    }
    return new InternalServerErrorException("Internal Server Error");
  }
};
