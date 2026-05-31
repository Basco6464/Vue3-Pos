import axios from "axios";
import { config } from "./config";
export const request = async (
  url?: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
) => {
  try {
    const res = await axios({
      url: config.base_url + url,
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
