import { Prisma } from "@prisma/client";

type BaseModel = Record<string, unknown>;

const transformValue = (value: unknown): unknown => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map(transformValue);
  }
  if (typeof value === "object" && value !== null) {
    return transformToJSON(value as BaseModel);
  }
  return value;
};

export const transformToJSON = <T extends BaseModel>(data: T): Prisma.JsonValue => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, transformValue(value)]),
  ) as Prisma.JsonValue;
};
