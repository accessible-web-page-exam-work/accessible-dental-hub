import { Button } from "@/components/ui/button";
import type { ReceptionistAppointment } from "@/components/receptionist/AvailableSlotsModal";
import CancelAppointmentDialog from "@/components/receptionist/CancelAppointmentDialog";

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

  cancelledBy?: string | null;
  cancelledAt?: string | null;
}

interface Props {
  appointment: Appointment;
  isUpdating: boolean;
  isCreatingAccount: boolean;
  onCancel: () => void;
  onOpenSlots: () => void;
  onReschedule: () => void;
  onCreateAccount: () => void;
  formatDate: (dateString: string) => string;
  formatTimeLabel: (time?: string | null) => string;
}

export default function AppointmentCard({
  appointment,
  isUpdating,
  isCreatingAccount,
  onCancel,
  onOpenSlots,
  onReschedule,
  onCreateAccount,
  formatDate,
  formatTimeLabel,
}: Props) {
  const hasSupportNeeds = !!appointment.communicationNeeds?.trim();
  const hasNotes = !!appointment.notes?.trim();
  const isPhonePreferred = appointment.preferredContactMethod === "Phone";
  const isEmailPreferred = appointment.preferredContactMethod === "Email";
  const isSmsPreferred = appointment.preferredContactMethod === "SMS";

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

  return (
    <article
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
            {/* Cancelled */}
            {appointment.status === "Cancelled" && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm">
                <p className="text-rose-900">
                  Cancelled by:{" "}
                  <span className="font-semibold">
                    {appointment.cancelledBy ?? "Unknown"}
                  </span>
                </p>

                {appointment.cancelledAt && (
                  <p className="mt-1 text-rose-900">
                    Cancelled at:{" "}
                    <span className="font-semibold">
                      {new Date(appointment.cancelledAt).toLocaleString(
                        "sv-SE",
                      )}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Pending */}
            {appointment.status === "Pending" && (
              <>
                <Button
                  type="button"
                  onClick={onOpenSlots}
                  className="min-w-[140px]"
                >
                  View Slots
                </Button>

                <CancelAppointmentDialog
                  appointmentId={appointment.id}
                  patientName={appointment.patientName}
                  isCancelling={isUpdating}
                  onConfirm={onCancel}
                  className="min-w-[120px]"
                />
              </>
            )}

            {/* Confirmed */}
            {appointment.status === "Confirmed" && (
              <>
                <CancelAppointmentDialog
                  appointmentId={appointment.id}
                  patientName={appointment.patientName}
                  isCancelling={isUpdating}
                  onConfirm={onCancel}
                  label="Cancel Appointment"
                  className="min-w-[160px]"
                />

                <Button type="button" onClick={onReschedule}>
                  Reschedule
                </Button>
              </>
            )}

            {/* New patient */}
            {appointment.isNewPatient && (
              <Button
                type="button"
                onClick={onCreateAccount}
                disabled={isCreatingAccount}
                className="min-w-[160px]"
              >
                {isCreatingAccount ? "Creating..." : "Create Account"}
              </Button>
            )}
          </div>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <dt className="text-sm text-muted-foreground">Date</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {formatDate(appointment.requestedDate)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Time</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {formatTimeLabel(appointment.requestedTime)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Treatment</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {appointment.treatmentType || "Not specified"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">
              Best contact method
            </dt>
            <dd className="mt-1 font-semibold text-foreground">
              {appointment.preferredContactMethod || "Not specified"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">
              Best time to reach
            </dt>
            <dd className="mt-1 font-semibold text-foreground">
              {appointment.preferredContactTime || "Not specified"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Phone</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {appointment.phoneNumber || "Not available"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
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
                <h3 className="text-sm font-semibold text-violet-900">Notes</h3>
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
}
