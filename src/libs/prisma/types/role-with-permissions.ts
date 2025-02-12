import { Prisma } from "@prisma/client";

export type RoleWithPermissions = Omit<
  Prisma.RoleGetPayload<{
    include: {
      permissions: {
        select: {
          permission: {
            select: {
              id: true;
              name: true;
            };
          };
        };
      };
    };
  }>,
  "permissions"
> & {
  permissions: {
    id: number;
    name: string;
  }[];
};
