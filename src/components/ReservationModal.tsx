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
import { Loader2 } from "lucide-react";
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
}

const ReservationModal = memo(({
  isOpen,
  onClose,
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
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain p-5 sm:p-6">
        <DialogHeader className="pr-6">
          <DialogTitle className="font-montserrat text-2xl">
            Ingresá tu DNI
          </DialogTitle>
          <DialogDescription className="font-inter leading-relaxed">
            Validá tu membresía para continuar al turnero, donde vas a elegir el espacio, el día y el horario.
          </DialogDescription>
        </DialogHeader>

        <p className="rounded-lg bg-muted px-3.5 py-3 font-inter text-sm leading-relaxed text-foreground">
          La reserva está disponible para socios con la cuota societaria al día.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="dni"
              className="mb-2 block font-inter text-sm font-medium"
            >
              Número de DNI
            </label>
            <Input
              id="dni"
              type="text"
              inputMode="numeric"
              value={dni}
              onChange={handleChange}
              placeholder="Ej.: 12345678"
              className={error ? "border-destructive" : ""}
              aria-invalid={!!error}
              aria-describedby={error ? "dni-help dni-error" : "dni-help"}
              maxLength={8}
              autoFocus
            />
            <p id="dni-help" className="mt-1.5 font-inter text-xs leading-relaxed text-muted-foreground">
              Ingresá los 7 u 8 números de tu documento.
            </p>
            {error && (
              <p id="dni-error" role="alert" className="mt-1.5 font-inter text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              type="submit"
              className="min-h-12 flex-1 bg-[#14532d] font-montserrat font-semibold text-white hover:bg-[#166534]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Validando...
                </>
              ) : (
                "Continuar al turnero"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="min-h-12 flex-1 font-montserrat font-semibold"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

ReservationModal.displayName = "ReservationModal";

export default ReservationModal;
