import { z } from "zod";

export const createOrUpdateOfficeLocationSchema = z.object({
    name: z
    .string({ required_error: "Employee type name is required" })
    .min(3, { message: "Employee type name must be at least 3 characters long" })
    .max(255, { message: "Employee type name must be at most 255 characters long" }),
});

export type TCreateOrUpdateOfficeLocationValidation = z.infer<typeof createOrUpdateOfficeLocationSchema>;