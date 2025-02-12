import { PERMISSIONS } from "@/common/enums/permissions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function permissionsSeeder() {
  await prisma.permission.createMany({
    data: Object.values(PERMISSIONS).map((permission) => ({
      name: permission,
    })),
    skipDuplicates: true,
  });
}
