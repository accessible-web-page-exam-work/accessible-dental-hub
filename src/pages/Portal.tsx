import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Users, UserRound, ArrowRight } from 'lucide-react';

const Portal = () => {
  return (
    <Layout minimalHeader>
      <section className="py-16 md:py-24" aria-labelledby="portal-heading">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="text-center space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Portal Access
              </p>
              <h1
                id="portal-heading"
                className="text-fluid-4xl font-bold text-foreground"
              >
                How would you like to continue?
              </h1>
              <p className="mx-auto max-w-2xl text-fluid-base text-muted-foreground">
                Choose the option that fits your role. Guests can book appointments,
                staff can manage requests, and registered patient access can be added later.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <article className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">
                        Continue as Guest
                    </h2>
                    <p className="text-muted-foreground">
                        Enter the public website to explore services, accessibility information,
                        and book an appointment when you are ready.
                    </p>
                    </div>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Browse services</li>
                    <li>Read accessibility information</li>
                    <li>Book an appointment online</li>
                    </ul>
                </div>

                <div className="pt-6">
                    <Button asChild size="lg" className="w-full min-h-touch hover:bg-accent hover:text-accent-foreground no-underline">
                    <Link to="/home">
                        Enter Website
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                    </Button>
                </div>
                </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">
                      Receptionist / Staff
                    </h2>
                    <p className="text-muted-foreground">
                      Review incoming appointment requests, see patient communication needs,
                      and confirm or cancel bookings.
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Review pending requests</li>
                    <li>See contact preferences</li>
                    <li>Manage appointment statuses</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Button asChild size="lg" className="w-full min-h-touch hover:bg-accent hover:text-accent-foreground no-underline">
                    <Link to="/receptionist/login">
                      Open Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>

              <article className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between opacity-80">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                    <UserRound className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">
                      Registered Patient
                    </h2>
                    <p className="text-muted-foreground">
                      Future patient access for viewing bookings, managing appointments,
                      and receiving updates in one place.
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>View your appointments</li>
                    <li>Manage future bookings</li>
                    <li>Access patient tools</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Button size="lg" variant="secondary" className="w-full min-h-touch" disabled>
                    Coming Soon
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

export default Portal;