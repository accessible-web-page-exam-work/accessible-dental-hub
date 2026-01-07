import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  AccessibleInput, 
  AccessibleSelect, 
  AccessibleTextarea 
} from '@/components/ui/accessible-form';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const inquiryOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'appointment', label: 'Appointment Question' },
  { value: 'insurance', label: 'Insurance & Billing' },
  { value: 'accessibility', label: 'Accessibility Support' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your .NET API
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-fluid-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-fluid-lg text-muted-foreground">
            Have questions? We're here to help. Reach out using any of the methods 
            below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <a 
                      href="tel:+1234567890" 
                      className="text-primary text-lg"
                    >
                      (123) 456-7890
                    </a>
                    <p className="text-muted-foreground text-sm mt-1">
                      Mon-Fri: 8am-6pm, Sat: 9am-2pm
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a 
                      href="mailto:info@brightsmile.com" 
                      className="text-primary text-lg"
                    >
                      info@brightsmile.com
                    </a>
                    <p className="text-muted-foreground text-sm mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <address className="not-italic text-muted-foreground">
                      123 Dental Street<br />
                      Healthcare City, HC 12345
                    </address>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary text-sm inline-block mt-1"
                    >
                      Get directions
                      <span className="sr-only"> (opens in new window)</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                      <li>Saturday: 9:00 AM - 2:00 PM</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility Support */}
            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-2">
                Accessibility Support
              </h3>
              <p className="text-muted-foreground mb-4">
                Need help accessing our website or services? Our accessibility 
                coordinator is here to assist you.
              </p>
              <p className="text-muted-foreground">
                Email:{' '}
                <a href="mailto:accessibility@brightsmile.com" className="text-primary">
                  accessibility@brightsmile.com
                </a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              {isSubmitted ? (
                <div 
                  className="text-center py-8"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-success" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="min-h-touch"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AccessibleInput
                      label="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      autoComplete="name"
                    />

                    <AccessibleInput
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      autoComplete="email"
                    />

                    <AccessibleInput
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      autoComplete="tel"
                      hint="Optional - if you'd prefer a callback"
                    />

                    <AccessibleSelect
                      label="Inquiry Type"
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      options={inquiryOptions}
                      required
                    />

                    <AccessibleTextarea
                      label="Your Message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      placeholder="How can we help you?"
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full min-h-touch"
                    >
                      <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
