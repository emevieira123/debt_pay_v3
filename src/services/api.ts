import { __API_BASE_URL__ } from "@/infra/env";
import axios from "axios";

const api = axios.create({
  baseURL: __API_BASE_URL__,
});

// Attach persisted token on startup
const persistedToken =
  typeof window !== "undefined"
    ? localStorage.getItem("debt_pay_auth_token")
    : null;
if (persistedToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${persistedToken}`;
}

export default api;
