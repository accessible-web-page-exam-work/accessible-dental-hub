import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  appointmentId: number;
  patientName?: string | null;
  description?: string;
  isCancelling: boolean;
  onConfirm: () => void;
  label?: string;
  className?: string;
}

export default function CancelAppointmentDialog({
  appointmentId,
  patientName,
  description,
  isCancelling,
  onConfirm,
  label = "Cancel",
  className,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={isCancelling}
          className={className}
        >
          {isCancelling ? "Cancelling..." : label}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel appointment?</AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              `Are you sure you want to cancel appointment #${appointmentId} for ${
                patientName ?? "this patient"
              }? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCancelling}>
            Keep appointment
          </AlertDialogCancel>

          <AlertDialogAction disabled={isCancelling} onClick={onConfirm}>
            {isCancelling ? "Cancelling..." : "Yes, cancel appointment"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
