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
  preferredContactMethod?: string | null;
  preferredContactTime?: string | null;
  communicationNeeds?: string | null;
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

export const getAvailableSlots = async (requestedDate: string, requestedTime: string) => {
  const response = await api.get('/AppointmentSlots/available', {
    params: { requestedDate, requestedTime },
  });
  return response.data;
};

export const confirmAppointmentWithSlot = async (
  appointmentId: number,
  appointmentSlotId: number
) => {
  const response = await api.put(`/appointments/${appointmentId}/confirm-with-slot`, {
    appointmentSlotId,
  });
  return response.data;
};