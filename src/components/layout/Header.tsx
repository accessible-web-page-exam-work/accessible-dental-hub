import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "@/components/accessibility/ThemeSwitcher";
import { Menu, X, Calendar, Phone, Home, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Info },
  { href: "/book", label: "Book Appointment", icon: Calendar },
  { href: "/contact", label: "Contact", icon: Phone },
];

type HeaderProps = {
  minimal?: boolean;
};

export function Header({ minimal = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    navigate("/");
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary no-underline hover:text-primary/90 focus-visible:outline-offset-4"
          aria-label="BrightSmile Dental - Home"
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1" />
            <path
              d="M16 6C12 6 9 9 9 13c0 4 2 8 3 11 1 3 2 4 4 4s3-1 4-4c1-3 3-7 3-11 0-4-3-7-7-7z"
              fill="currentColor"
            />
          </svg>
          <span>BrightSmile</span>
        </Link>

        {!minimal && (
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium no-underline
                  transition-colors min-h-touch
                  ${
                    isActive(href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary focus-visible:bg-secondary"
                  }
                `}
                aria-current={isActive(href) ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {token && (
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="inline md:inline-flex"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}

          {!minimal && (
            <Button
              variant="outline"
              size="icon"
              className="md:hidden min-h-touch min-w-touch"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
      </div>

      {!minimal && isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-border bg-background"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="container flex flex-col py-4 px-4 sm:px-6" role="list">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium no-underline
                    transition-colors min-h-touch
                    ${
                      isActive(href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary focus-visible:bg-secondary"
                    }
                  `}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
            {token && (
              <li>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="
                  flex w-full justify-start items-center gap-3 px-4 py-3 rounded-md
                  text-base font-medium min-h-touch
                  text-foreground hover:bg-secondary hover:text-accent focus-visible:bg-secondary
                "
                >
                  <LogOut className="h-5 w-5" aria-hidden="true" />
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
