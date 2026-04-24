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

export interface PatientAppointment {
  id: number;
  patientId: number;
  requestedDate: string;
  requestedTime: string;
  treatmentType?: string;
  notes?: string;
  status: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  communicationNeeds?: string;
  patientName?: string;
  email?: string;
  phoneNumber?: string;
  isNewPatient: boolean;
  appointmentSlotId?: number | null;
  scheduledStartTime?: string | null;
  scheduledEndTime?: string | null;
  room?: string | null;
  dentistName?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  errors?: string[] | null;
  data: T;
}

export interface CreatePatientAppointmentRequestDto {
  requestedDate: string;
  requestedTime: string;
  treatmentType?: string;
  notes?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  communicationNeeds?: string;
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

export const getPatientAppointments = async (patientId: number) => {
  const response = await api.get<ApiResponse<PatientAppointment[]>>(
    `/patients/${patientId}/appointments`
  );

  return response.data;
};

export const createPatientAppointment = async (
  patientId: number,
  payload: CreatePatientAppointmentRequestDto
) => {
  const response = await api.post<ApiResponse<PatientAppointment>>(
    `/patients/${patientId}/appointments`,
    payload
  );

  return response.data;
};