import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  getAllAppointments,
  updateAppointmentStatus,
  getAvailableSlots,
  confirmAppointmentWithSlot,
} from "@/services/api/appointments";
import { Button } from "@/components/ui/button";
import AvailableSlotsModal, {
  AppointmentSlot,
  ReceptionistAppointment,
} from "@/components/receptionist/AvailableSlotsModal";
import { createPatientAccount } from "@/services/api/patients";

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
  };

  const handleConfirmWithSlot = async (
    appointmentId: number,
    slotId: number,
  ) => {
    try {
      setError("");
      setIsConfirmingSlot(slotId);

      await confirmAppointmentWithSlot(appointmentId, slotId);

      handleCloseSlotsModal();
      await loadAppointments();
    } catch (err) {
      console.error("Failed to confirm appointment with slot:", err);
      setError("Could not confirm appointment with the selected slot.");
    } finally {
      setIsConfirmingSlot(null);
    }
  };

  const handleStatusUpdate = async (
    appointmentId: number,
    status: "Cancelled",
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

  const getStatusBadgeClass = (status: Appointment["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border border-rose-200";
      default:
        return "bg-amber-100 text-amber-800 border border-amber-200";
    }
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
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
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
              {filteredAppointments.map((appointment) => {
                const hasSupportNeeds =
                  !!appointment.communicationNeeds?.trim();
                const hasNotes = !!appointment.notes?.trim();
                const isPhonePreferred =
                  appointment.preferredContactMethod === "Phone";
                const isEmailPreferred =
                  appointment.preferredContactMethod === "Email";
                const isSmsPreferred =
                  appointment.preferredContactMethod === "SMS";

                return (
                  <article
                    key={appointment.id}
                    className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"
                    aria-labelledby={`appointment-${appointment.id}`}
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2
                              id={`appointment-${appointment.id}`}
                              className="text-xl font-semibold text-foreground"
                            >
                              Appointment #{appointment.id}
                            </h2>

                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                                appointment.status,
                              )}`}
                            >
                              {appointment.status}
                            </span>

                            {hasSupportNeeds && (
                              <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
                                Support needs
                              </span>
                            )}

                            {hasNotes && (
                              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800">
                                Has notes
                              </span>
                            )}

                            {appointment.isNewPatient && (
                              <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                                New patient
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {appointment.patientName
                              ? `Patient: ${appointment.patientName}`
                              : `Patient ID: ${appointment.patientId}`}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {appointment.status === "Pending" && (
                            <>
                              <Button
                                type="button"
                                onClick={() => handleOpenSlots(appointment)}
                                className="min-w-[140px]"
                              >
                                View Slots
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  handleStatusUpdate(
                                    appointment.id,
                                    "Cancelled",
                                  )
                                }
                                disabled={isUpdatingId === appointment.id}
                                className="min-w-[120px]"
                              >
                                Cancel
                              </Button>
                            </>
                          )}

                          {appointment.isNewPatient && (
                            <Button
                              type="button"
                              onClick={() =>
                                handleCreatePatientAccount(
                                  appointment.patientId,
                                )
                              }
                              disabled={
                                isCreatingAccountId === appointment.patientId
                              }
                              className="min-w-[160px]"
                            >
                              {isCreatingAccountId === appointment.patientId
                                ? "Creating..."
                                : "Create Account"}
                            </Button>
                          )}
                        </div>
                      </div>

                      <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Date
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {formatDate(appointment.requestedDate)}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Time
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {formatTimeLabel(appointment.requestedTime)}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Treatment
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {appointment.treatmentType || "Not specified"}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Best contact method
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {appointment.preferredContactMethod ||
                              "Not specified"}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Best time to reach
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {appointment.preferredContactTime ||
                              "Not specified"}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Phone
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {appointment.phoneNumber || "Not available"}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Email
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground break-all">
                            {appointment.email || "Not available"}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm text-muted-foreground">
                            Recommended next step
                          </dt>
                          <dd className="mt-1 font-semibold text-foreground">
                            {isPhonePreferred && appointment.phoneNumber
                              ? "Call patient"
                              : isEmailPreferred && appointment.email
                                ? "Send email"
                                : isSmsPreferred && appointment.phoneNumber
                                  ? "Send SMS"
                                  : "Review request details"}
                          </dd>
                        </div>
                      </dl>

                      {(hasSupportNeeds || hasNotes) && (
                        <div className="grid gap-4 lg:grid-cols-2">
                          {hasSupportNeeds && (
                            <section className="rounded-xl border border-sky-200 bg-sky-50 p-4">
                              <h3 className="text-sm font-semibold text-sky-900">
                                Communication & accessibility
                              </h3>
                              <p className="mt-2 whitespace-pre-line text-sm text-sky-950">
                                {appointment.communicationNeeds}
                              </p>
                            </section>
                          )}

                          {hasNotes && (
                            <section className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                              <h3 className="text-sm font-semibold text-violet-900">
                                Notes
                              </h3>
                              <p className="mt-2 whitespace-pre-line text-sm text-violet-950">
                                {appointment.notes}
                              </p>
                            </section>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
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
