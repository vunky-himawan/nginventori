import { PrismaClient } from "@prisma/client";
import { permissionsSeeder } from "./permissions.seeder";

const prisma = new PrismaClient();

interface SeedDependencies {
  role: { id: bigint };
  location: { id: bigint };
  department: { id: bigint };
  position: { id: bigint };
  type: { id: bigint };
}

async function seedLocation() {
  const location = await prisma.officeLocation.findFirst({
    where: { name: "Jakarta", deletedAt: null },
  });

  if (location) {
    return location;
  }

  return prisma.officeLocation.create({
    data: {
      name: "Jakarta",
    },
  });
}

async function seedDepartment() {
  const department = await prisma.department.findFirst({
    where: { name: "Engineering", deletedAt: null },
  });

  if (department) {
    return department;
  }

  return prisma.department.create({
    data: {
      name: "Engineering",
    },
  });
}

async function seedPosition() {
  const position = await prisma.employeePosition.findFirst({
    where: { name: "Software Engineer", deletedAt: null },
  });

  if (position) {
    return position;
  }

  return prisma.employeePosition.create({
    data: {
      name: "Software Engineer",
    },
  });
}

async function seedEmployeeType() {
  const type = await prisma.employeeType.findFirst({
    where: { name: "Full-time", deletedAt: null },
  });

  if (type) {
    return type;
  }

  return prisma.employeeType.create({
    data: {
      name: "Full-time",
    },
  });
}

async function seedRole() {
  await permissionsSeeder();

  const permissions = await prisma.permission.findMany();

  let role = await prisma.role.findFirst({
    where: { name: "Administrator" },
  });

  if (!role) {
    role = await prisma.role.create({
      data: {
        name: "Administrator",
        permissions: {
          create: permissions.map((permission) => ({
            permissionId: permission.id,
          })),
        },
      },
    });
  }

  return role;
}

async function seedUsers(dependencies: SeedDependencies) {
  const { role, location, department, position, type } = dependencies;

  const head = await prisma.user.upsert({
    where: { email: "head@company.com" },
    update: {},
    create: {
      email: "head@company.com",
      password: "hashedPassword",
      clerkId: "user_1rFSRFbbTMZ8ziZE5BioGIyq6Ye",
      name: "Head User",
      birthLocation: "Jakarta",
      birthDate: new Date("1980-01-01"),
      gender: "MALE",
      waNumber: "081234567891",
      nik: "1234567890123451",
      joinedDate: new Date(),
      roleId: role.id,
      locationId: location.id,
      departmentId: department.id,
      positionId: position.id,
      typeId: type.id,
      headId: null,
      levelId: null,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "testing@testing.com" },
    update: {},
    create: {
      email: "testing@testing.com",
      clerkId: "user_2rFSRFbbTMZ8ziZE5BioGIyq6Ye",
      password: "akuntesting123",
      name: "Testing User",
      birthLocation: "Jakarta",
      birthDate: new Date("1990-01-01"),
      gender: "MALE",
      waNumber: "081234567890",
      nik: "1234567890123456",
      joinedDate: new Date(),
      roleId: role.id,
      locationId: location.id,
      departmentId: department.id,
      positionId: position.id,
      typeId: type.id,
      headId: head.id,
      levelId: null,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "testing2@example.com" },
    update: {},
    create: {
      email: "testing2@example.com",
      clerkId: "user_2sUMmz6147ykHuHZLiMQuYFq8zt",
      password: "@testing2123!",
      name: "Testing User 2",
      birthLocation: "Jakarta",
      birthDate: new Date("1990-01-01"),
      gender: "MALE",
      waNumber: "081234567890",
      nik: "1234567890123457",
      joinedDate: new Date(),
      roleId: role.id,
      locationId: location.id,
      departmentId: department.id,
      positionId: position.id,
      typeId: type.id,
      headId: head.id,
      levelId: null,
    },
  });

  return { head, user1, user2 };
}

async function main() {
  try {
    console.log("Starting seed...");

    const [location, department, position, type, role] = await Promise.all([
      seedLocation(),
      seedDepartment(),
      seedPosition(),
      seedEmployeeType(),
      seedRole(),
    ]);

    const users = await seedUsers({
      role,
      location,
      department,
      position,
      type,
    });

    console.log("✅ Seed completed successfully");

    return { ...users, role };
  } catch (error) {
    console.error("❌ Seed failed:");
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Failed to seed database:", e);
  process.exit(1);
});
