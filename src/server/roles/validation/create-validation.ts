import { z } from "zod";

export const createOrUpdateRoleSchema = z.object({
  name: z
    .string({ required_error: "Role name is required" })
    .min(3, { message: "Role name must be at least 3 characters long" })
    .max(255, { message: "Role name must be at most 255 characters long" }),
  permissionIds: z
    .array(
      z
        .number({ required_error: "Permission id is required" })
        .positive({ message: "Permission id must be positive" }),
    )
    .min(1, { message: "At least one permission id is required" }),
});

export type TCreateOrUpdateRoleValidation = z.infer<typeof createOrUpdateRoleSchema>;
