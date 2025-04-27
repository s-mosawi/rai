import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords do not match",
  });

export const verifySignUpSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    cPassword: z.string(),
    otp: z.string().length(6, "OTP must be 6 characters"),
  })
  .refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords do not match",
  });

export const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export const updatePasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    cPassword: z.string(),
    otp: z.string().length(6, "OTP must be 6 characters"),
  })
  .refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords do not match",
  });

export const applicationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  businessSector: z.string().min(1, "Business sector is required"),
  businessSize: z.string().min(1, "Business size is required"),
  businessWebsite: z.string().optional(),
  businessLogoUrl: z.string().min(1, "Business logo is required"),
  pledgeUrl: z.string().min(1, "Pledge is required"),
  aiPolicyUrl: z.string().optional(),
  isoCertificationUrl: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z
    .string()
    .min(1, "Contact email is required")
    .email("Invalid email"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  otherInfo: z.any(),
});
