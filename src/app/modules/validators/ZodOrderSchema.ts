import { z } from "zod";

// Product validation schema
const productSchema = z.object({
  product: z.string().nonempty("Product name is required"), // Product name must be a non-empty string
  quantity: z.number().int().positive("Quantity must be a positive integer") // Quantity must be a positive integer
});

// Order validation schema
const orderSchema = z.object({
  user: z.string().refine((val) => /^[a-f\d]{24}$/i.test(val), { // Validate MongoDB ObjectId format
    message: "Invalid user ID format"
  }),
  products: z.array(productSchema).min(1, "At least one product is required"), // At least one product is required
  quantity: z.number().int().positive("Total quantity must be a positive integer"), // Total quantity validation
  totalPrice: z.number().positive("Total price must be a positive number").default(0).optional(), // Total price must be positive
  status: z.enum(["Pending", "Progress", "Completed"]).default('Pending').optional(), // Enum validation for status
  inStock:z.boolean().optional(),
});

export default orderSchema;
