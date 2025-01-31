import { z } from "zod";
import { Product } from './OrderInterface';

const createOrderValidationSchema =z.object({
    product:z.object({
        user:z.string(),
        product:z.object({
            product:z.string(),
            quantity:z.number()
        }).array()
    })
})


export const OrderValidation = {
    createOrderValidationSchema,
    
}