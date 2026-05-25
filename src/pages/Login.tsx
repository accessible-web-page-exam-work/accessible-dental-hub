import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  const expectedRole = location.pathname.startsWith("/receptionist")
    ? "Receptionist"
    : "Patient";

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await login(formData);

      if (
        expectedRole === "Receptionist" &&
        result.roles.includes("Receptionist")
      ) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("roles", JSON.stringify(result.roles));

        navigate("/receptionist");
        return;
      }

      if (
        expectedRole === "Patient" &&
        result.roles.includes("Patient") &&
        result.patientId
      ) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("roles", JSON.stringify(result.roles));
        localStorage.setItem("patientId", result.patientId.toString());

        navigate("/patient/dashboard");
        return;
      }

      setErrorMessage(
        `This account does not have ${expectedRole.toLowerCase()} access.`,
      );
    } catch {
      setErrorMessage("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout minimalHeader>
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <h1 className="mb-6 text-2xl font-bold text-foreground">
              {expectedRole} Login
            </h1>

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="min-h-touch w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="min-h-touch w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
