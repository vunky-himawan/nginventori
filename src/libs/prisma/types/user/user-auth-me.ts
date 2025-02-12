import { Prisma } from "@prisma/client";

export type UserAuthMe = Prisma.UserGetPayload<{
  select: {
    email: true;
    name: true;
    profilePicture: true;
  };
}>;
