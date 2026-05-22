import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-fluid-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
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
                    <a href="tel:+1234567890" className="text-primary text-lg">
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
                      123 Dental Street
                      <br />
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
                    <h3 className="font-semibold text-foreground">
                      Office Hours
                    </h3>
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
                Email:{" "}
                <a
                  href="mailto:accessibility@brightsmile.com"
                  className="text-primary"
                >
                  accessibility@brightsmile.com
                </a>
              </p>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  title="Map showing Bright Smile Dental location"
                  src="https://www.google.com/maps?q=123%20Dental%20Street%20Healthcare%20City&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Visit Our Clinic
                </h2>
                <p className="text-muted-foreground mb-4">
                  Find us at 123 Dental Street, Healthcare City, HC 12345.
                </p>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium"
                >
                  Open in Google Maps
                  <span className="sr-only"> (opens in new window)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
