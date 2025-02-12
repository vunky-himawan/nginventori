import { Prisma } from "@prisma/client";

export type ActivityLogWithActor = Prisma.ActivityLogGetPayload<{
  include: {
    actor: true;
  };
}>;
