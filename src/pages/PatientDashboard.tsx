import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  getMyAppointments,
  type PatientAppointment,
} from "@/services/api/appointments";
import { getMe } from "@/services/api/auth";
import PatientNextAppointmentCard from "@/components/patient/PatientNextAppointmentCard";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientName, setPatientName] = useState("Patient");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const result = await getMyAppointments();
        setAppointments(result.data ?? []);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await getMe();
        setPatientName(`${me.data.firstName} ${me.data.lastName}`);
      } catch {
        setPatientName("Patient");
      }
    };

    loadUser();
  }, []);

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
            {/* header */}
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Patient Portal
              </p>
              <h1 className="text-fluid-4xl font-bold text-foreground">
                Welcome back {patientName}!
              </h1>
              <p className="max-w-2xl text-fluid-base text-muted-foreground">
                View your appointments, request a new booking, and keep your
                contact preferences up to date.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* Next appointment */}
              <PatientNextAppointmentCard
                appointment={nextAppointment}
                isLoading={isLoading}
              />

              {/* My appointments */}
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
                    <Link to="/patient/appointments">View Appointments</Link>
                  </Button>
                </div>
              </article>

              {/* Book */}
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
                    <Link to="/patient/book">Book Appointment</Link>
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
