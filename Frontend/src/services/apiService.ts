import axios from "axios";
import {
  DetailedHelp,
  detailedHelpSchema,
  helpArraySchema,
  HelpFormData,
  HelpOffer,
  helpOfferNullableSchema,
  helpOfferWithUserListSchema,
  myHelpOfferArraySchema,
  userSchema,
} from "@/schema/schema";
import { Help } from "@/schema/schema";
import { HelpOfferStatus, HelpStatus } from "@/types/enums";

// const BASE_URL = "https://reach-out-tuzt.onrender.com/";

const BASE_URL = "http://localhost:8080/";

export const getAllHelpRequest = async (): Promise<Help[]> => {
  const response = await axios.get(`${BASE_URL}api/v1/helps`);

  const parsed = helpArraySchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }

  return parsed.data;
};

export const getHelpById = async (id: number): Promise<DetailedHelp> => {
  const response = await axios.get(`${BASE_URL}api/v1/helps/${id}`);

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
    `${BASE_URL}api/v1/help-offers/help/${helpId}/user/${userId}`
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
  const response = await axios.post(`${BASE_URL}api/v1/help-offers`, body);
  console.log(response.data);
};

export const getAllHelpOfferByMe = async (userId: number) => {
  const response = await axios.get(
    `${BASE_URL}api/v1/help-offers/user/${userId}`
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
    `${BASE_URL}api/v1/help-offers/help/${helpId}`
  );

  const parsed = helpOfferWithUserListSchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.log("Validation failed", parsed.error);
    throw new Error("Invalid help offer format");
  }

  return parsed.data;
};

export async function getAllHelpRequestByUserId(userId: number) {
  const response = await axios.get(`${BASE_URL}api/v1/helps/user/${userId}`);

  const parsed = helpArraySchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.log("Validation failed", parsed.error);
    throw new Error("Invalid help format");
  }
  return parsed.data;
}

export async function updateHelpOfferStatusById(
  id: number,
  status: HelpOfferStatus
): Promise<HelpOffer> {
  const response = await axios.patch(`${BASE_URL}api/v1/help-offers/${id}`, {
    status,
  });
  return response.data;
}

export async function updateHelpStatusById(id: number, status: HelpStatus) {
  const response = await axios.patch(`${BASE_URL}api/v1/helps/${id}`, {
    status,
  });
  console.log(response.data);
}

export async function createHelpRequest(data: HelpFormData, userId: number) {
  await axios.post(`${BASE_URL}api/v1/helps`, { ...data, createdBy: userId });
}

export async function verifyUserToken() {
  const response = await axios.get(`${BASE_URL}api/v1/is-login`);

  const parsed = userSchema.safeParse(response.data.data);
  if (!parsed.success) return null;
  return parsed.data;
}
