import { z } from "zod";

export const IndexQueryParamSchema = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  search: z.string().optional(),
  order: z.string().optional(),
  sort: z.string().optional(),
  withTrashed: z.number().optional(),
});

export type TIndexQueryParam = z.infer<typeof IndexQueryParamSchema>;
