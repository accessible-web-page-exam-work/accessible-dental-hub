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
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>('/Auth/login', data);
  return response.data;
};