import axios from "axios";
import { User } from "@/types/user";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
