import { z } from "zod";

const createUserValidationSchema = z.object({
    name:z.string(),
    email:z.string().email("Valid Email Required"),
    password: z.string(),
    phone:z.string(),
    address:z.string(),
    city:z.string(),
})
const updateUserValidationSchema = z.object({
    name:z.string().optional(),
    email:z.string().email("Valid Email Required").optional(),
    password: z.string().optional(),
    role:z.enum(['admin', 'user']).optional(),
    phone:z.string(),
    address:z.string(),
    city:z.string(),
})

export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
}