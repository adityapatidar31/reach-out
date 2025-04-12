import axios from "axios";
import {
  DetailedHelp,
  detailedHelpSchema,
  helpArraySchema,
  helpOfferNullableSchema,
  helpOfferWithUserListSchema,
  myHelpOfferArraySchema,
} from "@/schema/helpSchema";
import { Help } from "@/schema/helpSchema";

const BASE_URL = "http://localhost:8080/";

export const getAllHelpRequest = async (): Promise<Help[]> => {
  const response = await axios.get(`${BASE_URL}api/v1/help`);

  const parsed = helpArraySchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }

  return parsed.data;
};

export const getHelpById = async (id: number): Promise<DetailedHelp> => {
  const response = await axios.get(`${BASE_URL}api/v1/help/${id}`);

  const parsed = detailedHelpSchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }

  return parsed.data;
};

export const getHelpOfferByHelpAndUserId = async (
  helpId: number,
  userId: number
) => {
  const response = await axios.get(
    `${BASE_URL}api/v1/help-offer/help/${helpId}/user/${userId}`
  );
  const parsed = helpOfferNullableSchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }

  return parsed.data;
};

export const createHelpOfferRequest = async (
  helpId: number,
  userId: number,
  message: string
) => {
  const body = { helpId, offeredBy: userId, message };
  const response = await axios.post(`${BASE_URL}api/v1/help-offer`, body);
  console.log(response.data);
};

export const getAllHelpOfferByMe = async (userId: number) => {
  const response = await axios.get(
    `${BASE_URL}api/v1/help-offer/user/${userId}`
  );

  console.log(response.data.data);
  const parsed = myHelpOfferArraySchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }
  return parsed.data;
};

export const getAllHelpOfferByHelpId = async (helpId: number) => {
  const response = await axios.get(
    `${BASE_URL}api/v1/help-offer/help/${helpId}`
  );

  const parsed = helpOfferWithUserListSchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.log("Validation failed", parsed.error);
    throw new Error("Invalid help offer format");
  }

  return parsed.data;
};
