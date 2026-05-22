import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import BookAppointment from "./pages/BookAppointment";
import ServicesPage from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import Portal from "./pages/Portal";
import PatientDashboard from "./pages/PatientDashboard";
import PatientBook from "./pages/PatientBook";
import PatientAppointments from "./pages/PatientAppointments";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portal />} />
            <Route path="/home" element={<Index />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/receptionist"
              element={
                <ProtectedRoute>
                  <ReceptionistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/book"
              element={
                <ProtectedRoute>
                  <PatientBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments"
              element={
                <ProtectedRoute>
                  <PatientAppointments />
                </ProtectedRoute>
              }
            />
            <Route path="/receptionist/login" element={<Login />} />
            <Route path="/patient/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
