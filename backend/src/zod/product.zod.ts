import { reduceEachTrailingCommentRange } from "typescript";
import { z } from "zod";

const createProductValidationSchema = z.object({
  productName: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    })
    .min(1, "Product name cannot be empty"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative("Price cannot be negative"),
  category: z.string({
    required_error: "Category ID is required",
    invalid_type_error: "Category ID must be of string type",
  }),
  brand: z
    .string({
      required_error: "Brand is required",
      invalid_type_error: "Brand must be a string",
    })
    .min(1, "Brand cannot be empty"),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description cannot be empty"),
  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
  status: z.boolean({
    required_error: "Status is required",
    invalid_type_error: "Status must be a boolean",
  }),
  productImage: z.string({
    required_error: "Product image is required",
    invalid_type_error: "Product image must be a string",
  }),
});

const addReviewValidationSchema = z.object({
  comment: z
    .string({
      required_error: "Comment is required",
      invalid_type_error: "Comment must be a string",
    })
    .min(3, "Comment must be at least 3 characters")
    .max(255, "Comment must be at most 255 characters"),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

export { createProductValidationSchema, addReviewValidationSchema };
