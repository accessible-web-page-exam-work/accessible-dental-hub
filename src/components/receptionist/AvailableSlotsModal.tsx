import React from 'react';
import { Button } from '@/components/ui/button';

export interface ReceptionistAppointment {
  id: number;
  requestedDate: string;
  requestedTime: string;
}

export interface AppointmentSlot {
  id: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  dentistName?: string | null;
  room?: string | null;
}

interface AvailableSlotsModalProps {
  isOpen: boolean;
  appointment: ReceptionistAppointment | null;
  availableSlots: AppointmentSlot[];
  isLoading: boolean;
  isConfirmingSlot: number | null;
  onClose: () => void;
  onConfirmSlot: (appointmentId: number, slotId: number) => void;
  formatDate: (dateString: string) => string;
  formatTimeLabel: (time?: string | null) => string;
}

const AvailableSlotsModal = ({
  isOpen,
  appointment,
  availableSlots,
  isLoading,
  isConfirmingSlot,
  onClose,
  onConfirmSlot,
  formatDate,
  formatTimeLabel,
}: AvailableSlotsModalProps) => {
  if (!isOpen || !appointment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="available-slots-heading"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="available-slots-heading"
              className="text-xl font-semibold text-foreground"
            >
              Available Slots for Appointment #{appointment.id}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Requested date: {formatDate(appointment.requestedDate)} · Requested time:{' '}
              {formatTimeLabel(appointment.requestedTime)}
            </p>
          </div>

          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="rounded-xl border bg-card p-4 text-muted-foreground">
              Loading available slots...
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="rounded-xl border bg-card p-4 text-muted-foreground">
              No available slots match this request.
            </div>
          ) : (
            <div className="space-y-3">
              {availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">
                      {new Date(slot.startTime).toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' - '}
                      {new Date(slot.endTime).toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {slot.dentistName || 'No dentist assigned'} ·{' '}
                      {slot.room || 'No room assigned'}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => onConfirmSlot(appointment.id, slot.id)}
                    disabled={isConfirmingSlot === slot.id}
                  >
                    {isConfirmingSlot === slot.id ? 'Confirming...' : 'Confirm This Slot'}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableSlotsModal;