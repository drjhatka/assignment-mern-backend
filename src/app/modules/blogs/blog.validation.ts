import { z } from 'zod';

// Define the Zod schema for a blog post
const createBlogValidationSchema = z.object({
  title: z.string().min(10, 'Title is required'), // String and required
  content: z.string().min(10, 'Content is required'), // String and required
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format').optional(), // MongoDB ObjectId validation
  isPublished: z.boolean().optional().default(true),
});

const updateBlogValidationSchema = z.object({
  title: z.string().min(10, 'Title is required').optional(), // String and required
  content: z.string().min(10, 'Content is required').optional(), // String and required
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format').optional(), // MongoDB ObjectId validation
  isPublished: z.boolean().optional().default(true),
});

// Export for reuse
export const BlogValidation ={ createBlogValidationSchema, updateBlogValidationSchema}