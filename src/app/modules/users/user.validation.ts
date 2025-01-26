import { z } from "zod";

const createUserValidationSchema = z.object({
    name:z.string(),
    email:z.string().email("Valid Email Required"),
    password: z.string(),
})
const updateUserValidationSchema = z.object({
    name:z.string().optional(),
    email:z.string().email("Valid Email Required").optional(),
    password: z.string().optional(),
    role:z.enum(['admin', 'user']).optional()
})

export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
}