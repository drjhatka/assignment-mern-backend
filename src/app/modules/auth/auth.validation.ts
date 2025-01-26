import z from "zod";

const loginValidationSchema = z.object({
    email:z.string({required_error:"email is required"}).email('Valid Email type required'),
    password:z.string({required_error:"password is required"})
})

const refreshTokenValidationSchema=z.object({
    refreshToken: z.string({
        required_error:"Refresh Token is required"
    })
})

export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema
}