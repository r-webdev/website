import { z } from "zod";

export const ResourceCategorySchema = z.enum([
  "html",
  "css",
  "js",
  "design",
  "tools",
  "accessibility",
]);

export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.url(),
  description: z.string().optional(),
  category: ResourceCategorySchema,
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;
export type Resource = z.infer<typeof ResourceSchema>;
