import React from 'react';
import { 
  Eye, 
  Ear, 
  Accessibility, 
  Volume2, 
  Keyboard,
  Smartphone
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Visual Accessibility',
    description: 'High contrast mode, adjustable text sizes, and screen reader compatibility for visually impaired users.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    description: 'Full keyboard access with visible focus indicators. Navigate using Tab, Enter, and arrow keys.',
  },
  {
    icon: Volume2,
    title: 'Screen Reader Support',
    description: 'Semantic HTML and ARIA labels ensure compatibility with JAWS, NVDA, VoiceOver, and other screen readers.',
  },
  {
    icon: Accessibility,
    title: 'Physical Accessibility',
    description: 'Our clinic features wheelchair ramps, accessible restrooms, and barrier-free treatment rooms.',
  },
  {
    icon: Ear,
    title: 'Communication Support',
    description: 'Sign language interpretation available upon request. Written instructions provided.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Our website works seamlessly on all devices and supports 200% zoom without breaking layout.',
  },
];

export function AccessibilityInfo() {
  return (
    <section 
      className="py-16 md:py-24"
      aria-labelledby="accessibility-heading"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 
            id="accessibility-heading"
            className="text-fluid-3xl font-bold text-foreground mb-4"
          >
            Committed to Accessibility
          </h2>
          <p className="text-fluid-base text-muted-foreground">
            We believe everyone deserves quality dental care. Our website and clinic 
            are designed following WCAG 2.1 AA guidelines to ensure accessibility for all.
          </p>
        </div>

        {/* Features Grid */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Accessibility features"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center"
                role="listitem"
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Accessibility Statement Link */}
        <div className="text-center mt-12 p-6 bg-secondary/50 rounded-xl">
          <p className="text-foreground mb-2">
            <strong>Having trouble accessing our website?</strong>
          </p>
          <p className="text-muted-foreground">
            Please contact us at{' '}
            <a 
              href="mailto:accessibility@brightsmile.com"
              className="text-primary"
            >
              accessibility@brightsmile.com
            </a>
            {' '}or call{' '}
            <a 
              href="tel:+1234567890"
              className="text-primary"
            >
              (123) 456-7890
            </a>
            {' '}for assistance.
          </p>
        </div>
      </div>
    </section>
  );
}
