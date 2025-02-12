import { pagination } from "prisma-extension-pagination";
import { PrismaClient } from "@prisma/client";
import { createSoftDeleteExtension } from "prisma-extension-soft-delete";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error", "warn"],
  });
};

const globalThisWithPrisma = globalThis as typeof globalThis & {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const prisma = globalThisWithPrisma.prisma ?? prismaClientSingleton();

export const prismaWithTrashed = prisma.$extends(
  pagination({
    pages: {
      includePageCount: true,
    },
  }),
);

const prismaWithExtensions = prisma
  .$extends(
    pagination({
      pages: {
        includePageCount: true,
      },
    }),
  )
  .$extends(
    createSoftDeleteExtension({
      models: {
        User: true,
        Role: true,
      },
      defaultConfig: {
        field: "deletedAt",
        createValue: (deleted) => {
          if (deleted) return new Date();
          return null;
        },
      },
    }),
  );

if (process.env.NODE_ENV !== "production") globalThisWithPrisma.prisma = prisma;

export default prismaWithExtensions;
