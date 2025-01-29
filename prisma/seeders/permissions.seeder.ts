import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function permissionsSeeder() {
  const permissions = [
    { name: "dashboard-employee" },
    { name: "dashboard-admin" },
    { name: "create-role" },
    { name: "update-role" },
    { name: "delete-role" },
    { name: "show-role" },
    { name: "view-roles" },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission.name,
      },
      update: {},
      create: permission,
    });
  }
}
