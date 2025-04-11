const BASE_URL = "http://localhost:8080/";
import axios from "axios";

export const getAllHelpRequest = async () => {
  const response = await axios.get(`${BASE_URL}api/v1/help`);
  console.log(response.data.data);
};
