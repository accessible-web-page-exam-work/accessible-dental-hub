import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  getAllAppointments,
  updateAppointmentStatus,
  getAvailableSlots,
  confirmAppointmentWithSlot,
  rescheduleAppointment,
} from "@/services/api/appointments";
import AvailableSlotsModal, {
  AppointmentSlot,
  ReceptionistAppointment,
} from "@/components/receptionist/AvailableSlotsModal";
import { createPatientAccount } from "@/services/api/patients";
import AppointmentCard from "@/components/receptionist/AppointmentCard";

interface Appointment extends ReceptionistAppointment {
  patientId: number;
  treatmentType?: string | null;
  notes?: string | null;
  status: "Pending" | "Confirmed" | "Cancelled";
  preferredContactMethod?: string | null;
  preferredContactTime?: string | null;
  communicationNeeds?: string | null;
  patientName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  isNewPatient?: boolean;
}

type FilterStatus = "All" | "Pending" | "Confirmed" | "Cancelled";

export default function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingId, setIsUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("Pending");
  const [isRescheduling, setIsRescheduling] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [isConfirmingSlot, setIsConfirmingSlot] = useState<number | null>(null);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [isCreatingAccountId, setIsCreatingAccountId] = useState<number | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");

  const loadAppointments = async () => {
    try {
      setError("");
      setIsLoading(true);

      const response = await getAllAppointments();
      const data = Array.isArray(response) ? response : (response.data ?? []);

      setAppointments(data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError("Could not load appointment requests.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleOpenSlots = async (appointment: Appointment) => {
    try {
      setError("");
      setSelectedAppointment(appointment);
      setIsSlotModalOpen(true);
      setIsSlotsLoading(true);

      const response = await getAvailableSlots(
        appointment.requestedDate,
        appointment.requestedTime,
      );

      const data = Array.isArray(response) ? response : (response.data ?? []);
      setAvailableSlots(data);
    } catch (err) {
      console.error("Failed to load available slots:", err);
      setError("Could not load available slots.");
      setAvailableSlots([]);
    } finally {
      setIsSlotsLoading(false);
    }
  };

  const handleCloseSlotsModal = () => {
    setIsSlotModalOpen(false);
    setSelectedAppointment(null);
    setAvailableSlots([]);
    setIsRescheduling(false);
  };

  const handleConfirmWithSlot = async (
    appointmentId: number,
    slotId: number,
  ) => {
    try {
      setError("");
      setIsConfirmingSlot(slotId);
      if (isRescheduling) {
        await rescheduleAppointment(appointmentId, slotId);
        setSuccessMessage("Appointment rescheduled successfully.");
      } else {
        await confirmAppointmentWithSlot(appointmentId, slotId);
        setSuccessMessage("Appointment confirmed successfully.");
      }
      handleCloseSlotsModal();
      setIsRescheduling(false);
      await loadAppointments();
    } catch (err) {
      console.error("Failed to confirm appointment with slot:", err);
      setError("Could not confirm appointment with the selected slot.");
    } finally {
      setIsConfirmingSlot(null);
      setIsRescheduling(false);
    }
  };

  const handleStatusUpdate = async (
    appointmentId: number,
    status: "Pending" | "Confirmed" | "Cancelled",
  ) => {
    try {
      setIsUpdatingId(appointmentId);
      await updateAppointmentStatus(appointmentId, status);
      await loadAppointments();
    } catch (err) {
      console.error(`Failed to update appointment ${appointmentId}:`, err);
      setError("Could not update appointment status.");
    } finally {
      setIsUpdatingId(null);
    }
  };

  const handleCreatePatientAccount = async (patientId: number) => {
    try {
      setError("");
      setSuccessMessage("");
      setIsCreatingAccountId(patientId);

      await createPatientAccount(patientId);

      setSuccessMessage("Patient account created successfully.");
      await loadAppointments();
    } catch (err) {
      console.error("Failed to create patient account:", err);
      setError("Could not create patient account.");
    } finally {
      setIsCreatingAccountId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeLabel = (time?: string | null) => {
    if (!time) return "Not specified";

    const map: Record<string, string> = {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
    };

    return map[time.toLowerCase()] || time;
  };

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "All") return appointments;
    return appointments.filter(
      (appointment) => appointment.status === activeFilter,
    );
  }, [appointments, activeFilter]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === "Pending").length,
      withSupportNeeds: appointments.filter(
        (a) => !!a.communicationNeeds?.trim(),
      ).length,
      withNotes: appointments.filter((a) => !!a.notes?.trim()).length,
    };
  }, [appointments]);

  const FilterButton = ({
    label,
    value,
  }: {
    label: string;
    value: FilterStatus;
  }) => (
    <button
      type="button"
      onClick={() => setActiveFilter(value)}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        activeFilter === value
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-secondary"
      }`}
      aria-pressed={activeFilter === value}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Receptionist workspace
            </p>
            <h1 className="text-fluid-3xl font-bold text-foreground">
              Appointment Requests Dashboard
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Review pending requests, identify communication or accessibility
              needs quickly, and confirm or cancel appointments efficiently.
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total loaded</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.total}
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Pending requests</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.pending}
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Support needs</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.withSupportNeeds}
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">With notes</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.withNotes}
              </p>
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            <FilterButton label="Pending" value="Pending" />
            <FilterButton label="All" value="All" />
            <FilterButton label="Confirmed" value="Confirmed" />
            <FilterButton label="Cancelled" value="Cancelled" />
          </section>
          {successMessage && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800"
            >
              {successMessage}
            </div>
          )}

          {error && (
            <div
              className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="rounded-2xl border bg-card p-6 text-muted-foreground shadow-sm">
              Loading appointment requests...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="rounded-2xl border bg-card p-6 text-muted-foreground shadow-sm">
              No appointment requests found for this filter.
            </div>
          ) : (
            <section className="space-y-5">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  isUpdating={isUpdatingId === appointment.id}
                  isCreatingAccount={
                    isCreatingAccountId === appointment.patientId
                  }
                  onCancel={() =>
                    handleStatusUpdate(appointment.id, "Cancelled")
                  }
                  onOpenSlots={() => handleOpenSlots(appointment)}
                  onReschedule={() => {
                    setIsRescheduling(true);
                    handleOpenSlots(appointment);
                  }}
                  onCreateAccount={() =>
                    handleCreatePatientAccount(appointment.patientId)
                  }
                  formatDate={formatDate}
                  formatTimeLabel={formatTimeLabel}
                />
              ))}
            </section>
          )}
        </div>
      </div>

      <AvailableSlotsModal
        isOpen={isSlotModalOpen}
        appointment={selectedAppointment}
        availableSlots={availableSlots}
        isLoading={isSlotsLoading}
        isConfirmingSlot={isConfirmingSlot}
        onClose={handleCloseSlotsModal}
        onConfirmSlot={handleConfirmWithSlot}
        formatDate={formatDate}
        formatTimeLabel={formatTimeLabel}
      />
    </Layout>
  );
}
