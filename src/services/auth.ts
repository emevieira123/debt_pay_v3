import api from "@/services/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  nome: string;
  usuarioGithub: string;
};

export async function loginService(
  payload: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", payload);
  return response.data;
}

export type RegisterRequest = {
  email: string;
  senha: string;
  nome: string;
  usuarioGithub?: string;
};

export async function registerService(payload: RegisterRequest): Promise<void> {
  await api.post("/usuarios", payload);
}
