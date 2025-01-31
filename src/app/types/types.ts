import { Product } from "../modules/orders/OrderInterface";

export interface ErrorResponse {
    status: number;
    message: string;
    field?: Record<string, any>; // Optional key-value pair for duplicate fields
    details?: string;
  }

  export interface ProductOrder{
    product:Product[]
  }