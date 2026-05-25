import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock3,
  FileText,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createMyAppointment } from "@/services/api/appointments";

const PatientBook = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requestedDate: "",
    requestedTime: "",
    treatmentType: "",
    notes: "",
    preferredContactMethod: "",
    preferredContactTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await createMyAppointment({
        requestedDate: formData.requestedDate,
        requestedTime: formData.requestedTime,
        treatmentType: formData.treatmentType,
        notes: formData.notes,
        preferredContactMethod: formData.preferredContactMethod,
        preferredContactTime: formData.preferredContactTime,
        communicationNeeds: "",
      });

      if (!result.success) {
        console.error("Booking failed:", result);
        setErrorMessage("Booking failed. Please try again.");
        return;
      }

      console.log("Booking created:", result);
      setSuccessMessage(
        "Your appointment request has been received. We’ll contact you shortly to confirm the details.",
      );
      setTimeout(() => {
        navigate(`/patient/dashboard`);
      }, 10000);
    } catch (error) {
      console.error("Booking request failed:", error);
      setErrorMessage("Booking request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout minimalHeader>
      <section
        className="py-16 md:py-24"
        aria-labelledby="patient-book-heading"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4">
              <Link
                to={`/patient/dashboard`}
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
                  id="patient-book-heading"
                  className="text-fluid-4xl font-bold text-foreground"
                >
                  Request a New Appointment
                </h1>
                <p className="max-w-2xl text-fluid-base text-muted-foreground">
                  Choose your preferred date, time, and treatment type. Your
                  contact details are already connected to your patient profile.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={
                  successMessage
                    ? "mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    : "sr-only"
                }
              >
                {successMessage}
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="requestedDate"
                      className="text-sm font-medium text-foreground"
                    >
                      Preferred date
                    </label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="requestedDate"
                        name="requestedDate"
                        type="date"
                        value={formData.requestedDate}
                        onChange={handleChange}
                        required
                        className="min-h-touch w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-foreground outline-none transition focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="requestedTime"
                      className="text-sm font-medium text-foreground"
                    >
                      Preferred time
                    </label>
                    <div className="relative">
                      <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <select
                        id="requestedTime"
                        name="requestedTime"
                        value={formData.requestedTime}
                        onChange={handleChange}
                        required
                        className="min-h-touch w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-foreground outline-none transition focus:border-primary"
                      >
                        <option value="">Select a time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="treatmentType"
                    className="text-sm font-medium text-foreground"
                  >
                    Treatment type
                  </label>
                  <div className="relative">
                    <FileText className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <select
                      id="treatmentType"
                      name="treatmentType"
                      value={formData.treatmentType}
                      onChange={handleChange}
                      required
                      className="min-h-touch w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-foreground outline-none transition focus:border-primary"
                    >
                      <option value="">Select treatment</option>
                      <option value="Check-up">Check-up</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Restorative">Restorative</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Consultation">Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="preferredContactMethod"
                      className="text-sm font-medium text-foreground"
                    >
                      Preferred contact method
                    </label>
                    <select
                      id="preferredContactMethod"
                      name="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onChange={handleChange}
                      className="min-h-touch w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    >
                      <option value="">Select contact method</option>
                      <option value="Phone">Phone</option>
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="preferredContactTime"
                      className="text-sm font-medium text-foreground"
                    >
                      Preferred contact time
                    </label>
                    <select
                      id="preferredContactTime"
                      name="preferredContactTime"
                      value={formData.preferredContactTime}
                      onChange={handleChange}
                      className="min-h-touch w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    >
                      <option value="">Select contact time</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Anytime">Anytime</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-foreground"
                  >
                    Notes
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add anything you'd like the clinic to know before your appointment request is reviewed."
                      className="w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-foreground outline-none transition focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    asChild
                    type="button"
                    size="lg"
                    className="min-h-touch hover:bg-accent hover:text-accent-foreground no-underline"
                  >
                    <Link to={`/patient/dashboard`}>Cancel</Link>
                  </Button>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="min-h-touch hover:bg-accent hover:text-accent-foreground no-underline"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PatientBook;
