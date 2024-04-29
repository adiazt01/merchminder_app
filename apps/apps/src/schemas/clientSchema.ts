import { z } from "zod";

export const createClientFormSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }),
  email: z.optional(
    z
      .string({
        message: "El email no es válido",
      })
      .email({
        message: "El email no es válido",
      })
  ),
  phone: z.optional(z.string()),
});

export const createClientSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }),
  email: z.optional(z.string().email()),
  phone: z.optional(z.string()),
});

export const updateClientSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
});
