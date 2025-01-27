import NotFoundException from "@/errors/NotFoundException";
import prisma from "@/libs/prisma/prisma";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserWithPermissions = async (clerkId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      clerk_id: clerkId,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found");
  }

  const permissions = await prisma.roleHasPermission.findMany({
    where: {
      role_id: user.role_id,
    },
    include: {
      permission: true,
    },
  });

  return {
    user,
    permissions: permissions.map((permission) => permission.permission.name),
  };
};
