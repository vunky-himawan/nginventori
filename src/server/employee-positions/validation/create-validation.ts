import { z } from "zod";

export const createOrUpdateEmployeePositionSchema = z.object({
    name: z
    .string({ required_error: "Employee position name is required" })
    .min(3, { message: "Employee position name must be at least 3 characters long" })
    .max(255, { message: "Employee position name must be at most 255 characters long" }),
});

export type TCreateOrUpdateEmployeePositionValidation = z.infer<typeof createOrUpdateEmployeePositionSchema>;