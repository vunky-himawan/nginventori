import prisma from "@/libs/prisma/prisma";

export const getPermissions = async () => {
  return prisma.permission.findMany();
};
