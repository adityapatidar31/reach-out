import { z } from "zod";
import { Category, HelpOfferStatus, HelpStatus, HelpType } from "@/types/enums";

export const helpSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().max(2000),
  helpImageUrl: z.string().url(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  type: z.nativeEnum(HelpType),
  status: z.nativeEnum(HelpStatus),
  reward: z.string().max(2000),
  categories: z.array(z.nativeEnum(Category)),
  createdAt: z.string(),
});

export const helpArraySchema = z.array(helpSchema);

export type Help = z.infer<typeof helpSchema>;

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  imageUrl: z.string().url().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;

export const detailedHelpSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().max(2000),
  helpImageUrl: z.string().url(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  type: z.nativeEnum(HelpType),
  status: z.nativeEnum(HelpStatus),
  reward: z.string().max(2000),
  categories: z.array(z.nativeEnum(Category)),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  createdBy: userSchema,
});

export type DetailedHelp = z.infer<typeof detailedHelpSchema>;

export const helpOfferSchema = z.object({
  id: z.number(),
  helpId: z.number(),
  userId: z.number(),
  message: z.string(),
  status: z.nativeEnum(HelpOfferStatus),
  createdAt: z.string(),
});

export const helpOfferNullableSchema = helpOfferSchema.nullable();

export type HelpOffer = z.infer<typeof helpOfferSchema>;

export const myHelpOfferSchema = z.object({
  id: z.number(),
  helpId: z.number(),
  offeredById: z.number(),
  message: z.string(),
  status: z.nativeEnum(HelpOfferStatus),
  createdAt: z.string(),
  help: helpSchema,
});

export const myHelpOfferArraySchema = z.array(myHelpOfferSchema);

export const helpOfferWithUserSchema = z.object({
  id: z.number(),
  helpId: z.number(),
  message: z.string(),
  status: z.nativeEnum(HelpOfferStatus),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  userId: z.number(),
  userName: z.string(),
  userEmail: z.string().email(),
  userImageUrl: z.string(),
});

export type helpOfferWithUser = z.infer<typeof helpOfferWithUserSchema>;

export const helpOfferWithUserListSchema = z.array(helpOfferWithUserSchema);

export const helpFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Max 2000 characters"),
  reward: z
    .string()
    .min(1, "Reward is required")
    .max(2000, "Max 2000 characters"),
  type: z.nativeEnum(HelpType, { required_error: "Help type is required" }),
  area: z.string().min(1, "Area is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.coerce.number().min(100000, "Valid Pincode is required"),
  helpImageUrl: z
    .string()
    .min(1, "Image URL is required")
    .url("Enter a valid image URL"),
  categories: z
    .array(z.nativeEnum(Category))
    .nonempty("Select at least one category"),
});

export type HelpFormData = z.infer<typeof helpFormSchema>;

// login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const errorResponseSchema = z.object({
  status: z.enum(["fail", "error"]),
  message: z.string(),
});

export type ErrorResponseType = z.infer<typeof errorResponseSchema>;
