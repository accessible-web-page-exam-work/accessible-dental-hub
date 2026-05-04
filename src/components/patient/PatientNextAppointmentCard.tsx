import type { PatientAppointment } from "@/services/api/appointments";

interface Props {
  appointment?: PatientAppointment;
  isLoading: boolean;
}

export default function PatientNextAppointmentCard({
  appointment,
  isLoading,
}: Props) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground">
        Next Appointment
      </h2>

      {isLoading ? (
        <p className="mt-3 text-muted-foreground" aria-live="polite">
          Loading appointment...
        </p>
      ) : appointment ? (
        <dl className="mt-3 space-y-2 text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Date</dt>
            <dd>
              {new Date(
                appointment.scheduledStartTime ?? appointment.requestedDate,
              ).toLocaleDateString("sv-SE")}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-foreground">Time</dt>
            <dd>
              {appointment.scheduledStartTime && appointment.scheduledEndTime
                ? `${new Date(
                    appointment.scheduledStartTime,
                  ).toLocaleTimeString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${new Date(
                    appointment.scheduledEndTime,
                  ).toLocaleTimeString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : appointment.requestedTime}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-foreground">Treatment</dt>
            <dd>{appointment.treatmentType || "Not specified"}</dd>
          </div>

          <div>
            <dt className="font-medium text-foreground">Dentist</dt>
            <dd>{appointment.dentistName || "Not assigned yet"}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-3 text-muted-foreground">
          No upcoming appointment booked yet.
        </p>
      )}
    </article>
  );
}
