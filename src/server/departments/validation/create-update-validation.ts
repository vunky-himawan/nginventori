import { z } from "zod";

export const createOrUpdateDepartmentSchema = z.object({
  name: z
    .string({ required_error: "Department name is required" })
    .min(3, { message: "Department name must be at least 3 characters long" })
    .max(255, { message: "Department name must be at most 255 characters long" }),
});

export type TCreateOrUpdateDepartmentValidation = z.infer<typeof createOrUpdateDepartmentSchema>;
