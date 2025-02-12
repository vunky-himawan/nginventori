import NotFoundException from "@/errors/NotFoundException";
import prisma from "@/libs/prisma/prisma";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByClerkId = async (clerkId: string) => {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      name: true,
      email: true,
      profilePicture: true,
    },
  });
};

export const getUserWithPermissions = async (clerkId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found");
  }

  const permissions = await prisma.roleHasPermission.findMany({
    where: {
      roleId: user.roleId,
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
