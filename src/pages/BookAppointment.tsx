import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  AccessibleInput,
  AccessibleSelect,
  AccessibleTextarea,
} from "@/components/ui/accessible-form";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  checkPatientEmail,
  createAppointment,
  type CreateAppointmentRequest,
} from "@/services/api/appointments";
import { useNavigate } from "react-router-dom";

const serviceOptions = [
  { value: "checkup", label: "General Check-up & Cleaning" },
  { value: "cosmetic", label: "Cosmetic Consultation" },
  { value: "emergency", label: "Emergency / Pain Relief" },
  { value: "restorative", label: "Restorative (Fillings, Crowns)" },
  { value: "pediatric", label: "Pediatric Dentistry" },
  { value: "other", label: "Other / Not Sure" },
];

const timeOptions = [
  { value: "morning", label: "Morning (8:00 AM - 12:00 PM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM - 4:00 PM)" },
  { value: "evening", label: "Evening (4:00 PM - 6:00 PM)" },
];

const contactMethodOptions = [
  { value: "Email", label: "Email" },
  { value: "Phone", label: "Phone Call" },
  { value: "SMS", label: "Text Message (SMS)" },
];

const contactTimeOptions = [
  { value: "Morning", label: "Morning" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
  { value: "Anytime", label: "Anytime" },
];

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
}

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [existingPatientNotice, setExistingPatientNotice] = useState(false);
  const [continueAsGuest, setContinueAsGuest] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
    isNewPatient: false,
    needsAccessibility: false,
    accessibilityDetails: "",
    preferredContactMethod: "",
    preferredContactTime: "",
    communicationNeeds: "",
  });

  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a preferred time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const announceStepChange = (message: string) => {
    const announcement = document.getElementById("step-announcement");
    if (announcement) {
      announcement.textContent = message;
    }
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      announceStepChange("Step 2 of 3: Appointment Details");
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      announceStepChange("Step 3 of 3: Review and Submit");
    }
  };

  const handleBack = (previousStep: number, announcement: string) => {
    setStep(previousStep);
    announceStepChange(announcement);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      // 👇 STEP 1: check if email exists
      const emailCheck = await checkPatientEmail(formData.email);

      if (emailCheck.exists && !continueAsGuest) {
        setExistingPatientNotice(true);
        setIsSubmitting(false);
        return; // 🚨 STOP submission here
      }
      const combinedCommunicationNeeds =
        [
          formData.communicationNeeds.trim(),
          formData.needsAccessibility
            ? `Accessibility needs: ${formData.accessibilityDetails.trim() || "Yes"}`
            : "",
        ]
          .filter(Boolean)
          .join("\n") || null;

      const requestData: CreateAppointmentRequest = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        isNewPatient: formData.isNewPatient,
        requestedDate: `${formData.date}T00:00:00`,
        requestedTime: formData.time,
        treatmentType: formData.service || null,
        notes: formData.notes.trim() || null,
        preferredContactMethod: formData.preferredContactMethod || null,
        preferredContactTime: formData.preferredContactTime || null,
        communicationNeeds: combinedCommunicationNeeds,
      };

      const result = await createAppointment(requestData);
      if (!result.success) {
        setSubmitError(result.message || "Booking failed");
        return;
      }
      setSuccessMessage(
        "Appointment request received! We will contact you soon.",
      );
      setTimeout(() => {
        navigate("/");
      }, 8000);
    } catch (error: any) {
      console.error("Failed to create appointment:", error);

      setSubmitError(
        error?.response?.data?.message ||
          "Something went wrong while submitting your appointment request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const combinedReviewCommunicationNeeds = [
    formData.communicationNeeds,
    formData.needsAccessibility
      ? formData.accessibilityDetails || "Accessibility support requested"
      : "",
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-fluid-3xl font-bold text-foreground mb-4">
              Book an Appointment
            </h1>
            <p className="text-fluid-base text-muted-foreground">
              Complete the form below to request an appointment. We&apos;ll
              contact you to confirm the date and time.
            </p>
          </div>

          <div
            className="mb-8"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-label={`Step ${step} of 3`}
          >
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full font-bold
                    ${
                      num === step
                        ? "bg-primary text-primary-foreground"
                        : num < step
                          ? "bg-success text-success-foreground"
                          : "bg-secondary text-muted-foreground"
                    }
                  `}
                  aria-current={num === step ? "step" : undefined}
                >
                  {num < step ? (
                    <CheckCircle className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    num
                  )}
                </div>
              ))}
            </div>

            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-sm mt-2 text-muted-foreground">
              <span>Personal Info</span>
              <span>Appointment</span>
              <span>Confirm</span>
            </div>
          </div>

          <div id="step-announcement" className="sr-only" aria-live="polite" />

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


          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <fieldset className="space-y-6">
                <legend className="text-xl font-bold text-foreground mb-4">
                  Step 1: Personal Information
                </legend>

                <div className="grid sm:grid-cols-2 gap-4">
                  <AccessibleInput
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    error={errors.firstName}
                    required
                    autoComplete="given-name"
                  />

                  <AccessibleInput
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    error={errors.lastName}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <AccessibleInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange("email", e.target.value);
                    setExistingPatientNotice(false);
                    setContinueAsGuest(false);
                  }}
                  error={errors.email}
                  hint="We'll use this to send appointment confirmations"
                  required
                  autoComplete="email"
                />

                <AccessibleInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  error={errors.phone}
                  hint="For appointment reminders and urgent contact"
                  required
                  autoComplete="tel"
                />

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewPatient}
                      onChange={(e) =>
                        handleInputChange("isNewPatient", e.target.checked)
                      }
                      className="w-6 h-6 rounded border-2 border-input text-primary focus:ring-2 focus:ring-focus-ring"
                    />
                    <span className="text-foreground">I am a new patient</span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleNext}
                    size="lg"
                    className="min-h-touch"
                  >
                    Next: Appointment Details
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="space-y-6">
                <legend className="text-xl font-bold text-foreground mb-4">
                  Step 2: Appointment Details
                </legend>

                <AccessibleSelect
                  label="Service Needed"
                  value={formData.service}
                  onChange={(e) => handleInputChange("service", e.target.value)}
                  options={serviceOptions}
                  error={errors.service}
                  required
                />

                <AccessibleInput
                  label="Preferred Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  error={errors.date}
                  hint="We're available Monday through Saturday"
                  required
                  min={new Date().toLocaleDateString("sv-SE")}
                />

                <AccessibleSelect
                  label="Preferred Time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  options={timeOptions}
                  error={errors.time}
                  required
                />

                <AccessibleSelect
                  label="Preferred Contact Method"
                  value={formData.preferredContactMethod}
                  onChange={(e) =>
                    handleInputChange("preferredContactMethod", e.target.value)
                  }
                  options={contactMethodOptions}
                  hint="How would you like us to contact you about this appointment?"
                />

                <AccessibleSelect
                  label="Preferred Contact Time"
                  value={formData.preferredContactTime}
                  onChange={(e) =>
                    handleInputChange("preferredContactTime", e.target.value)
                  }
                  options={contactTimeOptions}
                  hint="What time is best for us to reach you?"
                />

                <AccessibleTextarea
                  label="Communication Needs"
                  value={formData.communicationNeeds}
                  onChange={(e) =>
                    handleInputChange("communicationNeeds", e.target.value)
                  }
                  placeholder="For example: email only, no phone calls, hearing impaired, need interpreter..."
                  hint="Optional: tell us how we can communicate with you best"
                />

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsAccessibility}
                      onChange={(e) =>
                        handleInputChange(
                          "needsAccessibility",
                          e.target.checked,
                        )
                      }
                      className="w-6 h-6 mt-0.5 rounded border-2 border-input text-primary focus:ring-2 focus:ring-focus-ring"
                    />
                    <span className="text-foreground">
                      I need accessibility accommodations (wheelchair access,
                      sign language interpreter, extended appointment time,
                      etc.)
                    </span>
                  </label>

                  {formData.needsAccessibility && (
                    <AccessibleTextarea
                      label="Accessibility Requirements"
                      value={formData.accessibilityDetails}
                      onChange={(e) =>
                        handleInputChange(
                          "accessibilityDetails",
                          e.target.value,
                        )
                      }
                      placeholder="Please describe your accessibility needs..."
                      hint="Let us know how we can best accommodate you"
                    />
                  )}
                </div>

                <AccessibleTextarea
                  label="Additional Notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any other information you'd like us to know..."
                  hint="Optional: dental concerns, medical conditions, etc."
                />

                <div className="flex justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleBack(1, "Step 1 of 3: Personal Information")
                    }
                    size="lg"
                    className="min-h-touch"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                    Back
                  </Button>

                  <Button
                    type="button"
                    onClick={handleNext}
                    size="lg"
                    className="min-h-touch"
                  >
                    Next: Review
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="space-y-6">
                <legend className="text-xl font-bold text-foreground mb-4">
                  Step 3: Review Your Information
                </legend>

                <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg text-foreground">
                    Personal Information
                  </h3>

                  <dl className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">Name</dt>
                      <dd className="font-medium">
                        {formData.firstName} {formData.lastName}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-muted-foreground">Email</dt>
                      <dd className="font-medium">{formData.email}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-muted-foreground">Phone</dt>
                      <dd className="font-medium">{formData.phone}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Patient Status
                      </dt>
                      <dd className="font-medium">
                        {formData.isNewPatient
                          ? "New Patient"
                          : "Returning Patient"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg text-foreground">
                    Appointment Details
                  </h3>

                  <dl className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">Service</dt>
                      <dd className="font-medium">
                        {
                          serviceOptions.find(
                            (s) => s.value === formData.service,
                          )?.label
                        }
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Preferred Date
                      </dt>
                      <dd className="font-medium">
                        {new Date(formData.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Preferred Time
                      </dt>
                      <dd className="font-medium">
                        {
                          timeOptions.find((t) => t.value === formData.time)
                            ?.label
                        }
                      </dd>
                    </div>

                    {formData.preferredContactMethod && (
                      <div>
                        <dt className="text-sm text-muted-foreground">
                          Preferred Contact Method
                        </dt>
                        <dd className="font-medium">
                          {formData.preferredContactMethod}
                        </dd>
                      </div>
                    )}

                    {formData.preferredContactTime && (
                      <div>
                        <dt className="text-sm text-muted-foreground">
                          Preferred Contact Time
                        </dt>
                        <dd className="font-medium">
                          {formData.preferredContactTime}
                        </dd>
                      </div>
                    )}

                    {combinedReviewCommunicationNeeds && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm text-muted-foreground">
                          Communication / Accessibility Needs
                        </dt>
                        <dd className="font-medium">
                          {combinedReviewCommunicationNeeds}
                        </dd>
                      </div>
                    )}

                    {formData.notes && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm text-muted-foreground">
                          Additional Notes
                        </dt>
                        <dd className="font-medium">{formData.notes}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                {existingPatientNotice && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
                  >
                    <p className="font-semibold">
                      Existing patient record found
                    </p>
                    <p className="mt-1">
                      This email appears to already be connected to a patient
                      record. Please log in to book with your account, or
                      continue as a guest.
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <Button
                        asChild
                        size="lg"
                        className="min-h-touch hover:bg-accent hover:text-accent-foreground no-underline"
                      >
                        <Link to="/patient/login">Log in</Link>
                      </Button>

                      <Button
                        size="lg"
                        className="min-h-touch hover:bg-accent hover:text-accent-foreground no-underline"
                        onClick={() => {
                          setContinueAsGuest(true);
                          setExistingPatientNotice(false);
                        }}
                      >
                        Continue as guest
                      </Button>
                    </div>
                  </div>
                )}
                {submitError && (
                  <div
                    className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                    role="alert"
                    aria-live="polite"
                  >
                    {submitError}
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleBack(2, "Step 2 of 3: Appointment Details")
                    }
                    size="lg"
                    className="min-h-touch"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                    Back
                  </Button>

                  <Button
                    type="submit"
                    size="lg"
                    className="min-h-touch"
                    disabled={isSubmitting}
                  >
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Appointment Request"}
                  </Button>
                </div>
              </fieldset>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
