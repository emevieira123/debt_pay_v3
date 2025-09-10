import { create } from "zustand";
import { User } from "../types";
import api from "@/services/api";
import { loginService } from "@/services/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,

  login: async (email: string, password: string) => {
    const { access_token, nome, usuarioGithub } = await loginService({
      email,
      password,
    });
    // Opcional: se o backend não retornar dados do usuário, armazene apenas o token
    const user: User = { id: "self", name: nome, email, usuarioGithub };
    localStorage.setItem("debt_pay_auth_token", access_token);
    localStorage.setItem("debt_pay_auth_user", JSON.stringify(user));
    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    set({ user, isAuthenticated: true, token: access_token });
    return true;
  },

  register: async (name: string, email: string, password: string) => {
    // Simulação de registro
    if (name && email && password) {
      const user = {
        id: "1",
        name: name,
        email: email,
        usuarioGithub: "jhon_doe",
      };
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("debt_pay_auth_token");
    localStorage.removeItem("debt_pay_auth_user");
    delete api.defaults.headers.common["Authorization"];
    set({ user: null, isAuthenticated: false, token: null });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("debt_pay_auth_token");
    const userStr = localStorage.getItem("debt_pay_auth_user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        set({ user, isAuthenticated: true, token });
      } catch {
        // Se houver erro ao fazer parse do usuário, limpa o localStorage
        localStorage.removeItem("debt_pay_auth_token");
        localStorage.removeItem("debt_pay_auth_user");
        delete api.defaults.headers.common["Authorization"];
        set({ user: null, isAuthenticated: false, token: null });
      }
    }
  },
}));
