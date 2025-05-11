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
  description: z.string().min(1, "Description is required").max(2000),
  reward: z.string().min(1, "Reward is required").max(2000),
  type: z.nativeEnum(HelpType, { required_error: "Help type is required" }),
  area: z.string().min(1, "Area is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.coerce.number().min(100000, "Valid Pincode is required"),
  helpImage: z
    .custom<File>((file) => file instanceof File, {
      message: "Please upload a valid file",
    })
    .refine((file) => file?.type === "image/jpeg", {
      message: "Only .jpg files are allowed",
    })
    .refine((file) => file?.size <= 1 * 1024 * 1024, {
      message: "Image must be less than 1MB",
    }),
  categories: z
    .array(z.nativeEnum(Category))
    .min(1, "Select at least one category"),
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

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// Schema for image validation
export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.[0]?.type === "image/jpeg", {
      message: "Only JPG files are allowed.",
    })
    .refine((file) => file?.[0]?.size <= 1024 * 1024, {
      message: "Max file size is 1MB.",
    }),
});

export type ImageType = z.infer<typeof imageSchema>;

export const nameSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type NameType = z.infer<typeof nameSchema>;

export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is too short"),
    newPassword: z.string().min(8, "New password is too short"),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "Passwords do not match",
  });

export type TypePasswordUpdate = z.infer<typeof passwordUpdateSchema>;

export const conversationSchema = z.object({
  conversationId: z.number(),
  helpId: z.number(),
  helpTitle: z.string(),
  helpCreatorName: z.string(),
  helpCreatorImageUrl: z.string().url(),
  helpOfferId: z.number(),
  offererName: z.string(),
  offererImageUrl: z.string().url().optional(),
  createdAt: z.string(),
});

export const conversationsSchema = z.array(conversationSchema);

export type Conversation = z.infer<typeof conversationSchema>;

export const messageSchema = z.object({
  id: z.number(),
  content: z.string(),
  senderId: z.number(),
  senderName: z.string(),
  createdAt: z.string(),
});

export const messagesSchema = z.array(messageSchema);

export type TypeMessage = z.infer<typeof messageSchema>;
