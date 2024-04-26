import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.string(),
  description: z.optional(z.string().max(255)),
});

export const updateProductSchema = z.object({
  name: z.optional(z.string().min(3).max(255)),
  price: z.optional(z.string()),
  description: z.optional(z.string().max(255)),
});
