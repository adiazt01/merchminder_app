import { z } from "zod";

export const CreateSaleSchemaForm = z.object({
  /*     userId: z.string(), */
  clientId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.string(),
    })
  ),
});

export const CreateSaleSchema = z.object({
  clientId: z.number(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
    })
  ),
});