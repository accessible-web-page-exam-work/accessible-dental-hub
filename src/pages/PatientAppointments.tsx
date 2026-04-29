import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Stethoscope,
  MapPin,
} from "lucide-react";
import {
  getMyAppointments,
  cancelMyAppointment,
  type PatientAppointment,
} from "@/services/api/appointments";

type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

const statusClasses: Record<AppointmentStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 border border-amber-200",
  Confirmed: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  Cancelled: "bg-rose-100 text-rose-800 border border-rose-200",
  Completed: "bg-slate-100 text-slate-800 border border-slate-200",
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateTime = (dateTimeString?: string) => {
  if (!dateTimeString) return null;

  return new Date(dateTimeString).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | AppointmentStatus>(
    "All",
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getMyAppointments();

        if (!result.success) {
          setError(result.message || "Failed to load appointments");
          return;
        }

        setAppointments(result.data ?? []);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "All") return appointments;
    return appointments.filter((a) => a.status === activeFilter);
  }, [activeFilter, appointments]);

  const handleCancelAppointment = async (appointmentId: number) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setCancellingId(appointmentId);
      setError(null);
      setSuccessMessage("");

      const result = await cancelMyAppointment(appointmentId);

      if (!result.success) {
        setError(result.message || "Could not cancel appointment.");
        return;
      }

      setSuccessMessage("Appointment cancelled successfully.");

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "Cancelled" }
            : appointment,
        ),
      );
    } catch {
      setError("Could not cancel appointment.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <Layout minimalHeader>
        <div className="container px-4 py-16">Loading appointments...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout minimalHeader>
        <div className="container px-4 py-16">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout minimalHeader>
      <section
        className="py-16 md:py-24"
        aria-labelledby="patient-appointments-heading"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-4">
              <Link
                to="/patient/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent/90 focus-visible:outline-offset-4 no-underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to patient portal
              </Link>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Patient Portal
                </p>
                <h1
                  id="patient-appointments-heading"
                  className="text-fluid-4xl font-bold text-foreground"
                >
                  My Appointments
                </h1>
                <p className="max-w-2xl text-fluid-base text-muted-foreground">
                  Review your appointment requests, upcoming visits, and
                  previous bookings in one place.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Total appointments
                </p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {appointments.length}
                </p>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {appointments.filter((a) => a.status === "Pending").length}
                </p>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {appointments.filter((a) => a.status === "Confirmed").length}
                </p>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {appointments.filter((a) => a.status === "Completed").length}
                </p>
              </article>
            </div>
            {successMessage && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                {successMessage}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {(
                [
                  "All",
                  "Pending",
                  "Confirmed",
                  "Completed",
                  "Cancelled",
                ] as const
              ).map((status) => {
                const isActive = activeFilter === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveFilter(status)}
                    className={[
                      "rounded-full border px-5 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    {status}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {filteredAppointments.length === 0 ? (
                <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground">
                    No appointments found
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    There are no appointments in this category yet.
                  </p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <article
                    key={appointment.id}
                    className="rounded-2xl border bg-card p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-2xl font-semibold text-foreground">
                            Appointment #{appointment.id}
                          </h2>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusClasses[appointment.status]}`}
                          >
                            {appointment.status}
                          </span>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarDays className="h-4 w-4" />
                              Requested date
                            </div>
                            <p className="text-lg font-semibold text-foreground">
                              {formatDate(appointment.requestedDate)}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock3 className="h-4 w-4" />
                              Requested time
                            </div>
                            <p className="text-lg font-semibold text-foreground">
                              {appointment.requestedTime}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FileText className="h-4 w-4" />
                              Treatment
                            </div>
                            <p className="text-lg font-semibold text-foreground">
                              {appointment.treatmentType}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Stethoscope className="h-4 w-4" />
                              Dentist
                            </div>
                            <p className="text-lg font-semibold text-foreground">
                              {appointment.dentistName ?? "Not assigned yet"}
                            </p>
                          </div>
                        </div>

                        {(appointment.scheduledStartTime ||
                          appointment.room) && (
                          <div className="grid gap-6 sm:grid-cols-2">
                            {appointment.scheduledStartTime && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CalendarDays className="h-4 w-4" />
                                  Scheduled visit
                                </div>
                                <p className="text-base font-medium text-foreground">
                                  {formatDateTime(
                                    appointment.scheduledStartTime,
                                  )}
                                  {appointment.scheduledEndTime
                                    ? ` - ${new Date(
                                        appointment.scheduledEndTime,
                                      ).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}`
                                    : ""}
                                </p>
                              </div>
                            )}

                            {appointment.room && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  Room
                                </div>
                                <p className="text-base font-medium text-foreground">
                                  {appointment.room}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 xl:min-w-[180px]">
                        {(appointment.status === "Pending" ||
                          appointment.status === "Confirmed") && (
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            disabled={cancellingId === appointment.id}
                            onClick={() =>
                              handleCancelAppointment(appointment.id)
                            }
                            className="w-full"
                          >
                            {cancellingId === appointment.id
                              ? "Cancelling..."
                              : appointment.status === "Pending"
                                ? "Cancel Request"
                                : "Cancel Appointment"}
                          </Button>
                        )}

                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PatientAppointments;
