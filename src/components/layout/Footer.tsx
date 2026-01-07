import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer 
      className="border-t border-border bg-secondary/50 mt-auto"
      role="contentinfo"
    >
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h2 className="text-lg font-bold mb-4">BrightSmile Dental</h2>
            <p className="text-muted-foreground">
              Providing quality dental care with a focus on accessibility and patient comfort since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2" role="list">
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/book" className="text-muted-foreground hover:text-primary">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/accessibility" className="text-muted-foreground hover:text-primary">
                    Accessibility Statement
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <address className="not-italic space-y-3 text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+1234567890" className="hover:text-primary">
                  (123) 456-7890
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@brightsmile.com" className="hover:text-primary">
                  info@brightsmile.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" aria-hidden="true" />
                <span>123 Dental Street<br />Healthcare City, HC 12345</span>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-lg font-bold mb-4">Office Hours</h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>Mon-Fri: 8:00 AM - 6:00 PM</span>
              </p>
              <p className="pl-6">Sat: 9:00 AM - 2:00 PM</p>
              <p className="pl-6">Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} BrightSmile Dental. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            This website is designed to be accessible to all users, following WCAG 2.1 AA guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
}
