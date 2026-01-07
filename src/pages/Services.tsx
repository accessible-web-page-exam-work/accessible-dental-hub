import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { 
  Smile, 
  Sparkles, 
  Shield, 
  Heart, 
  Stethoscope, 
  Baby,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'general',
    icon: Smile,
    title: 'General Dentistry',
    description: 'Comprehensive check-ups, cleanings, and preventive care to maintain your oral health.',
    details: [
      'Regular dental examinations',
      'Professional teeth cleaning',
      'Dental X-rays and diagnostics',
      'Fluoride treatments',
      'Oral cancer screenings',
      'Preventive care education'
    ],
    duration: '45-60 minutes',
    recommended: 'Every 6 months'
  },
  {
    id: 'cosmetic',
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Teeth whitening, veneers, and smile makeovers to enhance your confidence.',
    details: [
      'Professional teeth whitening',
      'Porcelain veneers',
      'Dental bonding',
      'Smile makeovers',
      'Tooth reshaping',
      'Gum contouring'
    ],
    duration: '1-2 hours',
    recommended: 'As needed'
  },
  {
    id: 'restorative',
    icon: Shield,
    title: 'Restorative Care',
    description: 'Fillings, crowns, bridges, and implants to restore damaged or missing teeth.',
    details: [
      'Tooth-colored fillings',
      'Dental crowns and bridges',
      'Dental implants',
      'Root canal therapy',
      'Dentures and partials',
      'Inlays and onlays'
    ],
    duration: 'Varies by procedure',
    recommended: 'As needed'
  },
  {
    id: 'emergency',
    icon: Heart,
    title: 'Emergency Care',
    description: 'Same-day appointments available for dental emergencies and urgent pain relief.',
    details: [
      'Same-day appointments',
      'Toothache relief',
      'Broken tooth repair',
      'Lost filling replacement',
      'Abscess treatment',
      'Trauma care'
    ],
    duration: '30-90 minutes',
    recommended: 'When needed'
  },
  {
    id: 'periodontal',
    icon: Stethoscope,
    title: 'Periodontal Treatment',
    description: 'Gum disease prevention and treatment to protect your dental foundation.',
    details: [
      'Deep cleaning (scaling and root planing)',
      'Gum disease treatment',
      'Gum grafting',
      'Pocket reduction surgery',
      'Bone grafting',
      'Periodontal maintenance'
    ],
    duration: '1-2 hours',
    recommended: 'Based on condition'
  },
  {
    id: 'pediatric',
    icon: Baby,
    title: 'Pediatric Dentistry',
    description: 'Gentle, child-friendly care in a comfortable environment for young patients.',
    details: [
      'First dental visit (age 1)',
      'Gentle cleanings',
      'Sealants',
      'Fluoride treatments',
      'Space maintainers',
      'Child-friendly education'
    ],
    duration: '30-45 minutes',
    recommended: 'Every 6 months'
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-fluid-4xl font-bold text-foreground mb-4">
            Our Dental Services
          </h1>
          <p className="text-fluid-lg text-muted-foreground">
            We offer comprehensive dental care in an accessible, comfortable environment. 
            All our services are provided with your comfort and accessibility needs in mind.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-8" role="list" aria-label="Dental services">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                id={service.id}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
                role="listitem"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 flex-shrink-0 rounded-xl bg-primary/10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                          {service.description}
                        </p>
                      </div>

                      {/* Details */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          What's Included:
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-2" role="list">
                          {service.details.map((detail) => (
                            <li 
                              key={detail}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <span 
                                className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" 
                                aria-hidden="true" 
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          <span>
                            <strong>Duration:</strong> {service.duration}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" aria-hidden="true" />
                          <span>
                            <strong>Recommended:</strong> {service.recommended}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-primary/5 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Schedule Your Visit?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're here to help you achieve optimal oral health. Book your appointment 
            today and experience dental care that prioritizes your comfort and accessibility.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="min-h-touch">
              <Link to="/book">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-touch">
              <a href="tel:+1234567890">
                Call (123) 456-7890
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
