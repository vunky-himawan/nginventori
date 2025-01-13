import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string(),
});

export type TCreateRoleValidation = z.infer<typeof createRoleSchema>;
