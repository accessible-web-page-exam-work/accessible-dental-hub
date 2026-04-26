import { api } from "./client";

export const createPatientAccount = async (patientId: number) => {
  const response = await api.post(`/patients/${patientId}/create-account`);
  return response.data;
};