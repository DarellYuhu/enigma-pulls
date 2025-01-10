import axios from "axios";
import { toast } from "sonner";

export const FacebookClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FACEBOOK_BASE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

FacebookClient.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message || error.message);
    return Promise.reject(error);
  }
);

FacebookClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
