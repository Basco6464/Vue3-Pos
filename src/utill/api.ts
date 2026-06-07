import axios from "axios";
import { config } from "./config";
import { getAccessToken } from "../store/profile.store";
export const request = async (
  url?: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
) => {
  const access_token = getAccessToken();
  try {
    const isFormData = data instanceof FormData;
    const res = await axios({
      url: config.base_url + url,
      method: method,
      data: data,
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : {
              "Content-Type": "application/json",
            }),
      },
    });

    return res.data;
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};
