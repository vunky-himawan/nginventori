import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SeedDependencies {
  role: { id: bigint };
  location: { id: bigint };
  department: { id: bigint };
  position: { id: bigint };
  type: { id: bigint };
}

async function seedLocation() {
  return prisma.officeLocation.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Jakarta",
    },
  });
}

async function seedDepartment() {
  return prisma.department.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Engineering",
    },
  });
}

async function seedPosition() {
  return prisma.employeePosition.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Software Engineer",
    },
  });
}

async function seedEmployeeType() {
  return prisma.employeeType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Full-time",
    },
  });
}

async function seedRole() {
  return prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Administrator",
    },
  });
}

async function seedUsers(dependencies: SeedDependencies) {
  const { role, location, department, position, type } = dependencies;

  const head = await prisma.user.upsert({
    where: { email: "head@company.com" },
    update: {},
    create: {
      email: "head@company.com",
      password: "hashedPassword",
      name: "Head User",
      birth_location: "Jakarta",
      birth_date: new Date("1980-01-01"),
      gender: "MALE",
      wa_number: "081234567891",
      nik: "1234567890123457",
      joined_date: new Date(),
      role_id: role.id,
      location_id: location.id,
      department_id: department.id,
      position_id: position.id,
      type_id: type.id,
      head_id: null,
      level_id: null,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "testing@testing.com" },
    update: {},
    create: {
      email: "testing@testing.com",
      password: "akuntesting123",
      name: "Testing User",
      birth_location: "Jakarta",
      birth_date: new Date("1990-01-01"),
      gender: "MALE",
      wa_number: "081234567890",
      nik: "1234567890123456",
      joined_date: new Date(),
      role_id: role.id,
      location_id: location.id,
      department_id: department.id,
      position_id: position.id,
      type_id: type.id,
      head_id: head.id,
      level_id: null,
    },
  });

  return { head, user };
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

    const roles = Array.from({ length: 20 }, (_, i) => ({
      name: `Role ${i + 1}`,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    for (const role of roles) {
      await prisma.role.create({
        data: role,
      });
    }

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
