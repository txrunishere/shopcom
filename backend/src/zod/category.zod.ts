import { z } from "zod";

const createCategoryValidationSchema = z.object({
  categoryName: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category must be of string type",
    })
    .trim()
    .min(2, { message: "Category name must be at least 2 characters" })
    .max(35, { message: "Category name must be at most 35 characters" }),
});

export {
  createCategoryValidationSchema
}
