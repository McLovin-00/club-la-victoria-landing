import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";

const dniSchema = z.object({
  dni: z
    .string()
    .trim()
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(8, "El DNI debe tener máximo 8 dígitos")
    .regex(/^\d+$/, "El DNI solo debe contener números"),
});

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTitle: string;
}

const ReservationModal = ({
  isOpen,
  onClose,
  activityTitle,
}: ReservationModalProps) => {
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dniSchema.parse({ dni });
      setError("");
      toast.success(`Reserva iniciada para ${activityTitle}. DNI: ${dni}`);
      setDni("");
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permitir números
    if (value === "" || /^\d+$/.test(value)) {
      setDni(value);
      if (error) setError("");
    }
  };

  const handleClose = () => {
    setDni("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-2xl">
            Reservar {activityTitle}
          </DialogTitle>
          <DialogDescription className="font-inter">
            Ingresá tu DNI para continuar con la reserva
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dni"
              className="font-inter font-medium text-sm mb-2 block"
            >
              DNI *
            </label>
            <Input
              id="dni"
              type="text"
              value={dni}
              onChange={handleChange}
              placeholder="Ej: 12345678"
              className={error ? "border-destructive" : ""}
              maxLength={8}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 font-montserrat font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 font-montserrat font-semibold"
            >
              Continuar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
