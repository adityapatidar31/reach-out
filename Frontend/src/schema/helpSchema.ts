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
  imageUrl: z
    .string()
    .nullable()
    .transform(
      (url) =>
        url ??
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
});

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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  userId: z.number(),
  userName: z.string(),
  userEmail: z.string().email(),
  userImageUrl: z.string(),
});

export const helpOfferWithUserListSchema = z.array(helpOfferWithUserSchema);
