import { z } from "zod";

export const CreateSaleSchemaForm = z.object({
  /*     userId: z.string(), */
  clientId: z.string({
    required_error: "El cliente es requerido",
  }),
  products: z.array(
    z.object({
      productId: z.string({
        required_error: "El roducto es requerido",
      }),
      quantity: z.string({
        required_error: "La cantidad es requerida",
      }),
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