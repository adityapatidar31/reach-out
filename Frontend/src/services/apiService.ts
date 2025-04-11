import axios from "axios";
import {
  DetailedHelp,
  detailedHelpSchema,
  helpArraySchema,
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
