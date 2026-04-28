import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  getPatientAppointments,
  type PatientAppointment,
} from "@/services/api/appointments";

const PatientDashboard = () => {
  const { patientId } = useParams();
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!patientId) return;

      try {
        const result = await getPatientAppointments(Number(patientId));
        setAppointments(result.data ?? []);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, [patientId]);

  const nextAppointment = appointments
    .filter((a) => a.status === "Confirmed")
    .sort(
      (a, b) =>
        new Date(a.scheduledStartTime ?? a.requestedDate).getTime() -
        new Date(b.scheduledStartTime ?? b.requestedDate).getTime(),
    )[0];
  return (
    <Layout minimalHeader>
      <section
        className="py-16 md:py-24"
        aria-labelledby="patient-dashboard-heading"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Patient Portal
              </p>
              <h1
                id="patient-dashboard-heading"
                className="text-fluid-4xl font-bold text-foreground"
              >
                Welcome back
              </h1>
              <p className="max-w-2xl text-fluid-base text-muted-foreground">
                View your appointments, request a new booking, and keep your
                contact preferences up to date.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground">
                  Next Appointment
                </h2>
                {isLoading ? (
                  <p className="mt-3 text-muted-foreground" aria-live="polite">
                    Loading appointment...
                  </p>
                ) : nextAppointment ? (
                  <dl className="mt-3 space-y- text-muted-foreground">
                    <div>
                      <dt className="font-medium text-foreground">Date</dt>
                      <dd>
                        {new Date(
                          nextAppointment.scheduledStartTime ??
                            nextAppointment.requestedDate,
                        ).toLocaleDateString("sv-SE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>

                    <div>
                      <dt className="font-medium text-foreground">Time</dt>
                      <dd>
                        {nextAppointment.scheduledStartTime &&
                        nextAppointment.scheduledEndTime
                          ? `${new Date(
                              nextAppointment.scheduledStartTime,
                            ).toLocaleTimeString("sv-SE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })} - ${new Date(
                              nextAppointment.scheduledEndTime,
                            ).toLocaleTimeString("sv-SE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : nextAppointment.requestedTime}
                      </dd>
                    </div>

                    <div>
                      <dt className="font-medium text-foreground">Treatment</dt>
                      <dd>
                        {nextAppointment.treatmentType || "Not specified"}
                      </dd>
                    </div>

                    <div>
                      <dt className="font-medium text-foreground">Dentist</dt>
                      <dd>
                        {nextAppointment.dentistName || "Not assigned yet"}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="mt-3 text-muted-foreground">
                    No upcoming appointment booked yet.
                  </p>
                )}
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  My Appointments
                </h2>
                <p className="mt-3 text-muted-foreground">
                  View pending, confirmed, and past appointments.
                </p>
                <div className="pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full min-h-touch hover:bg-accent hover:text-accent-foreground no-underline"
                  >
                    <Link to={`/patient/${patientId}/appointments`}>
                      View Appointments
                    </Link>
                  </Button>
                </div>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Book New Appointment
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Request a new appointment with your preferred date and time.
                </p>
                <div className="pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full min-h-touch hover:bg-accent hover:text-accent-foreground no-underline"
                  >
                    <Link to={`/patient/${patientId}/book`}>
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PatientDashboard;
