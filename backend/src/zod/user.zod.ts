import { z } from "zod";

const userRegisterValidationSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .trim()
    .min(3, "Username must be at least 3 characters long"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});

const userLoginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});

const userForgotPasswordValidationSchema = z.object({
  oldPassword: z
    .string({
      required_error: "oldPassword is required",
      invalid_type_error: "oldPassword must be string",
    })
    .min(8, "Password must be atleast 8 letters long."),
  newPassword: z
    .string({
      required_error: "newPassword is required",
      invalid_type_error: "newPassword must be string",
    })
    .min(8, "Password must be atleast 8 letters long."),
});

export {
  userRegisterValidationSchema,
  userLoginValidationSchema,
  userForgotPasswordValidationSchema,
};
