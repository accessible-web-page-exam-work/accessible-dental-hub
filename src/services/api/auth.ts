import { api } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  roles: string[];
  email?: string;
  userId?: string;
  patientId?: number | null;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>('/Auth/login', data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await api.post("/Auth/reset-password", data);
  return response.data;
};