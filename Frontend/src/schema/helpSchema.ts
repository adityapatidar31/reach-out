import { z } from "zod";
import { Category, HelpStatus, HelpType } from "@/types/enums";

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
