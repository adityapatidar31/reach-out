import axios from "axios";
import {
  DetailedHelp,
  detailedHelpSchema,
  helpArraySchema,
  HelpFormData,
  HelpOffer,
  helpOfferNullableSchema,
  helpOfferWithUserListSchema,
  LoginFormData,
  myHelpOfferArraySchema,
  SignupFormData,
  userSchema,
} from "@/schema/schema";
import { Help } from "@/schema/schema";
import { HelpOfferStatus, HelpStatus } from "@/types/enums";

const BASE_URL = "https://reach-out-tuzt.onrender.com/";

// const BASE_URL = "http://localhost:8080/";

const cookieSender = {
  withCredentials: true,
};

interface Query {
  search: string;
  sort: string;
  category: string;
  status: string;
}

export const getAllHelpRequest = async (query: Query): Promise<Help[]> => {
  let url = BASE_URL + "api/v1/helps";

  const params = new URLSearchParams();

  if (query.search) params.append("search", query.search);
  if (query.sort) params.append("sort", "asc");
  if (query.category) params.append("category", query.category);
  if (query.status) params.append("status", query.status);

  if (params.toString()) {
    console.log(params.toString());
    url += `?${params.toString()}`;
  }
  const response = await axios.get(url, cookieSender);

  const parsed = helpArraySchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }

  return parsed.data;
};

export const getHelpById = async (id: number): Promise<DetailedHelp> => {
  const response = await axios.get(
    `${BASE_URL}api/v1/helps/${id}`,
    cookieSender
  );

  const parsed = detailedHelpSchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid help data format");
  }

  return parsed.data;
};

export const getHelpOfferByHelpAndUserId = async (helpId: number) => {
  const response = await axios.get(
    `${BASE_URL}api/v1/help-offers/help/${helpId}/me`,
    cookieSender
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
  message: string
) => {
  const body = { helpId, message };
  await axios.post(`${BASE_URL}api/v1/help-offers`, body, cookieSender);
};

export const getAllHelpOfferByMe = async () => {
  const response = await axios.get(
    `${BASE_URL}api/v1/help-offers/me`,
    cookieSender
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
    `${BASE_URL}api/v1/help-offers/help/${helpId}`,
    cookieSender
  );

  const parsed = helpOfferWithUserListSchema.safeParse(response.data.data);

  if (!parsed.success) {
    console.log("Validation failed", parsed.error);
    throw new Error("Invalid help offer format");
  }

  return parsed.data;
};

export async function getAllHelpRequestByUserId() {
  const response = await axios.get(`${BASE_URL}api/v1/helps/me`, cookieSender);

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
  const response = await axios.patch(
    `${BASE_URL}api/v1/help-offers/${id}`,
    {
      status,
    },
    cookieSender
  );
  return response.data;
}

export async function updateHelpStatusById(id: number, status: HelpStatus) {
  const response = await axios.patch(
    `${BASE_URL}api/v1/helps/${id}`,
    {
      status,
    },
    cookieSender
  );
  console.log(response.data);
}

export async function createHelpRequest(data: HelpFormData): Promise<void> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "categories" && Array.isArray(value)) {
      value.forEach((cat) => formData.append("categories", cat)); // ✅ send each category individually
    } else if (key === "helpImage") {
      formData.append("helpImage", value as File);
    } else {
      formData.append(key, String(value));
    }
  });

  await axios.post(`${BASE_URL}api/v1/helps`, formData, cookieSender);
}

export async function verifyUserToken() {
  const response = await axios.get(
    `${BASE_URL}api/v1/verify-token`,
    cookieSender
  );

  const parsed = userSchema.safeParse(response.data.data);
  if (!parsed.success) return null;
  return parsed.data;
}

export async function loginUser(data: LoginFormData) {
  const response = await axios.post(
    `${BASE_URL}api/v1/login`,
    data,
    cookieSender
  );
  const parsed = userSchema.safeParse(response.data.data);
  if (!parsed.success) {
    console.log(parsed.error);
  }
  return parsed.data;
}

export async function signupUser(data: SignupFormData) {
  const response = await axios.post(
    `${BASE_URL}api/v1/sign-up`,
    data,
    cookieSender
  );

  const parsed = userSchema.safeParse(response.data.data);
  if (!parsed.success) {
    console.log(parsed.error);
  }
  return parsed.data;
}

export async function logoutUser() {
  await axios.post(`${BASE_URL}api/v1/logout`, null, cookieSender);
}
