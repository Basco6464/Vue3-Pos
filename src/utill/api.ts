import axios from "axios";
import { config } from "./config";
import { getAccessToken } from "../store/profile.stroe";
export const request = async (
  url?: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
) => {
  const access_token = getAccessToken();
  try {
    const res = await axios({
      url: config.base_url + url,
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    });

    return res.data;
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
