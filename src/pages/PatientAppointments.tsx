import React, { useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Stethoscope,
  MapPin,
} from 'lucide-react';

type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

interface PatientAppointment {
  id: number;
  requestedDate: string;
  requestedTime: string;
  treatmentType: string;
  status: AppointmentStatus;
  dentistName?: string;
  room?: string;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
}

const mockAppointments: PatientAppointment[] = [
  {
    id: 101,
    requestedDate: '2026-04-28',
    requestedTime: 'Evening',
    treatmentType: 'Restorative',
    status: 'Pending',
  },
  {
    id: 102,
    requestedDate: '2026-05-04',
    requestedTime: 'Morning',
    treatmentType: 'Cleaning',
    status: 'Confirmed',
    dentistName: 'Dr. Sarah Lind',
    room: 'Room 2',
    scheduledStartTime: '2026-05-04T09:00:00',
    scheduledEndTime: '2026-05-04T09:30:00',
  },
  {
    id: 103,
    requestedDate: '2026-03-14',
    requestedTime: 'Afternoon',
    treatmentType: 'Check-up',
    status: 'Completed',
    dentistName: 'Dr. Adam Noor',
    room: 'Room 1',
    scheduledStartTime: '2026-03-14T13:00:00',
    scheduledEndTime: '2026-03-14T13:20:00',
  },
  {
    id: 104,
    requestedDate: '2026-02-10',
    requestedTime: 'Morning',
    treatmentType: 'Consultation',
    status: 'Cancelled',
  },
];

const statusClasses: Record<AppointmentStatus, string> = {
  Pending:
    'bg-amber-100 text-amber-800 border border-amber-200',
  Confirmed:
    'bg-emerald-100 text-emerald-800 border border-emerald-200',
  Cancelled:
    'bg-rose-100 text-rose-800 border border-rose-200',
  Completed:
    'bg-slate-100 text-slate-800 border border-slate-200',
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatDateTime = (dateTimeString?: string) => {
  if (!dateTimeString) return null;

  return new Date(dateTimeString).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const PatientAppointments = () => {
  const [activeFilter, setActiveFilter] = useState<
    'All' | AppointmentStatus
  >('All');

  const filteredAppointments = useMemo(() => {
    if (activeFilter === 'All') return mockAppointments;
    return mockAppointments.filter(a => a.status === activeFilter);
  }, [activeFilter]);

  return (
    <Layout minimalHeader>
      <section className="py-16 md:py-24" aria-labelledby="patient-appointments-heading">
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
                  Review your appointment requests, upcoming visits, and previous bookings in one place.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Total appointments</p>
                <p className="mt-3 text-4xl font-bold text-foreground">{mockAppointments.length}</p>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {mockAppointments.filter(a => a.status === 'Pending').length}
                </p>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {mockAppointments.filter(a => a.status === 'Confirmed').length}
                </p>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="mt-3 text-4xl font-bold text-foreground">
                  {mockAppointments.filter(a => a.status === 'Completed').length}
                </p>
              </article>
            </div>

            <div className="flex flex-wrap gap-3">
              {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map(status => {
                const isActive = activeFilter === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveFilter(status)}
                    className={[
                      'rounded-full border px-5 py-2.5 text-sm font-medium transition',
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:bg-muted',
                    ].join(' ')}
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
                filteredAppointments.map(appointment => (
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
                              {appointment.dentistName ?? 'Not assigned yet'}
                            </p>
                          </div>
                        </div>

                        {(appointment.scheduledStartTime || appointment.room) && (
                          <div className="grid gap-6 sm:grid-cols-2">
                            {appointment.scheduledStartTime && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CalendarDays className="h-4 w-4" />
                                  Scheduled visit
                                </div>
                                <p className="text-base font-medium text-foreground">
                                  {formatDateTime(appointment.scheduledStartTime)}
                                  {appointment.scheduledEndTime
                                    ? ` - ${new Date(appointment.scheduledEndTime).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}`
                                    : ''}
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
                        <Button asChild size="lg" className="w-full no-underline hover:bg-accent hover:text-accent-foreground">
                          <Link to="/patient/book">Book Again</Link>
                        </Button>
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