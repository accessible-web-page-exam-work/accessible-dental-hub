import { api } from "./client";

export interface CreateAppointmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isNewPatient: boolean;
  requestedDate: string;
  requestedTime: string;
  treatmentType?: string | null;
  notes?: string | null;
}

export const createAppointment = async (data: CreateAppointmentRequest) => {
  const response = await api.post("/appointments", data);
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

export const getPendingAppointments = async () => {
  const response = await api.get("/appointments/pending");
  return response.data;
};

export const updateAppointmentStatus = async (
  id: number,
  status: "Pending" | "Confirmed" | "Cancelled"
) => {
  const response = await api.put(`/appointments/${id}/status`, { status });
  return response.data;
};