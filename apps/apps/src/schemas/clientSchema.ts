import {z} from "zod"

export const createClientFormSchema = z.object({
    name: z.string(),
    email: z.optional(z.string().email()),
    phone: z.optional(z.string()),
}) 

export const createClientSchema = z.object({
    name: z.string(),
    email: z.optional(z.string().email()),
    phone: z.optional(z.string())
})