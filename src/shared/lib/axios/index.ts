import { apiUrl } from "@/config/env";
import axios from "axios";

export const client = axios.create({
  baseURL: apiUrl || "http://localhost:3000/api",
});
