import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smile, 
  Sparkles, 
  Shield, 
  Heart, 
  Stethoscope, 
  Baby,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Smile,
    title: 'General Dentistry',
    description: 'Comprehensive check-ups, cleanings, and preventive care to maintain your oral health.',
  },
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Teeth whitening, veneers, and smile makeovers to enhance your confidence.',
  },
  {
    icon: Shield,
    title: 'Restorative Care',
    description: 'Fillings, crowns, bridges, and implants to restore damaged or missing teeth.',
  },
  {
    icon: Heart,
    title: 'Emergency Care',
    description: 'Same-day appointments available for dental emergencies and urgent pain relief.',
  },
  {
    icon: Stethoscope,
    title: 'Periodontal Treatment',
    description: 'Gum disease prevention and treatment to protect your dental foundation.',
  },
  {
    icon: Baby,
    title: 'Pediatric Dentistry',
    description: 'Gentle, child-friendly care in a comfortable environment for young patients.',
  },
];

export function Services() {
  return (
    <section 
      className="py-16 md:py-24 bg-secondary/30"
      aria-labelledby="services-heading"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 
            id="services-heading"
            className="text-fluid-3xl font-bold text-foreground mb-4"
          >
            Our Dental Services
          </h2>
          <p className="text-fluid-base text-muted-foreground">
            We offer a comprehensive range of dental services to meet all your 
            oral health needs in an accessible, comfortable environment.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="List of dental services"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-focus-ring"
                role="listitem"
              >
                <div 
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <Link 
                  to="/services"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only"> about {service.title}</span>
                </Link>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="min-h-touch text-base font-semibold">
            <Link to="/book">
              Book Your Appointment Today
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
