import { z } from "zod";

export const createOrUpdateEmployeeTypeSchema = z.object({
    name: z
    .string({ required_error: "Employee type name is required" })
    .min(3, { message: "Employee type name must be at least 3 characters long" })
    .max(255, { message: "Employee type name must be at most 255 characters long" }),
});

export type TCreateOrUpdateEmployeeTypeValidation = z.infer<typeof createOrUpdateEmployeeTypeSchema>;