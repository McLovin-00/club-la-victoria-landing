import { useState, useCallback, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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

const ReservationModal = memo(({
  isOpen,
  onClose,
  activityTitle,
}: ReservationModalProps) => {
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Local validation with Zod
    try {
      dniSchema.parse({ dni });
      setError("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const url = `https://www.api.clublavictoria.com.ar/api/v1/socios/reserva/${dni}`;
      const res = await fetch(url, { method: "GET", headers: { Accept: "application/json" } });

      // Try to read JSON response even if status is not 200
      let data = undefined;
      try {
        data = await res.json();
      } catch (e) {
        data = undefined;
      }

      // Normalize various forms of 'true' that the API might return
      const isTrue =
        data === true ||
        data === "true" ||
        (typeof data === "object" && (
          data.data === true ||
          data.data === "true" ||
          data.success === true ||
          data.success === "true" ||
          data.valid === true ||
          data.valid === "true"
        ));

      if (isTrue) {
        // Redirect to external URL
        window.location.href = "https://turnosconqr.com/club_la_victoria-prueba1";
        return;
      }

      // If the response does not indicate member -> close modal and show toast
      setDni("");
      onClose();
      toast({
        variant: "destructive",
        title: "Error",
        description: "El DNI ingresado no está asociado al club.",
      });
      return;
    } catch (err) {
      setError("No se pudo conectar con el servidor. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }, [dni, onClose, toast]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setDni(value);
      if (error) setError("");
    }
  }, [error]);

  const handleClose = useCallback(() => {
    setDni("");
    setError("");
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[97.5%] sm:max-w-md">
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
              aria-invalid={!!error}
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
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white font-montserrat font-semibold transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 font-montserrat font-semibold flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Cargando...
                </>
              ) : (
                "Continuar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

ReservationModal.displayName = "ReservationModal";

export default ReservationModal;
