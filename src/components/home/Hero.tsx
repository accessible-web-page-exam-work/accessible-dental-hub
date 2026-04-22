import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="text-fluid-4xl font-bold text-foreground leading-tight"
              >
                Quality Dental Care for <span className="text-primary">Everyone</span>
              </h1>
              <p className="text-fluid-lg text-muted-foreground max-w-xl">
                At BrightSmile Dental, we&apos;re committed to providing accessible,
                comfortable dental care. Our website and clinic are designed to
                accommodate all patients.
              </p>
            </div>

            <ul className="space-y-3" aria-label="Our key features">
              {[
                'Wheelchair accessible facilities',
                'Screen reader friendly website',
                'Sensory-friendly waiting area',
                'Extended appointment times available',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle
                    className="h-5 w-5 text-success flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="min-h-touch text-base font-semibold hover:bg-accent hover:text-accent-foreground no-underline"
              >
                <Link to="/book">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Book an Appointment
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="min-h-touch text-base font-semibold hover:bg-accent hover:text-accent-foreground no-underline"
              >
                <a href="tel:+1234567890">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Call (123) 456-7890
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="aspect-square max-w-md mx-auto lg:max-w-none rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
              role="img"
              aria-label="Illustration of a friendly dental professional"
            >
              <svg
                className="w-3/4 h-3/4 text-primary"
                viewBox="0 0 200 200"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M100 20c-30 0-55 25-55 55 0 35 15 60 25 85 8 20 15 30 30 30s22-10 30-30c10-25 25-50 25-85 0-30-25-55-55-55z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M100 30c-25 0-45 20-45 45 0 30 12 50 20 70 7 18 12 25 25 25s18-7 25-25c8-20 20-40 20-70 0-25-20-45-45-45z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <circle cx="85" cy="70" r="8" fill="currentColor" opacity="0.6" />
                <circle cx="115" cy="80" r="5" fill="currentColor" opacity="0.5" />
                <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.4" />
              </svg>
            </div>

            <div
              className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}