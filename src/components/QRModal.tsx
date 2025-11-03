import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download } from "lucide-react";

const dniSchema = z.object({
  dni: z
    .string()
    .min(7, { message: "El DNI debe tener al menos 7 dígitos" })
    .max(8, { message: "El DNI debe tener como máximo 8 dígitos" })
    .regex(/^\d+$/, { message: "El DNI solo debe contener números" }),
});

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRModal = ({ isOpen, onClose }: QRModalProps) => {
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [isLoadingQR, setIsLoadingQR] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validate DNI with Zod
      const validatedData = dniSchema.parse({ dni });

      // Call API to verify DNI
      const response = await fetch(
        `https://www.api.clublavictoria.com.ar/api/v1/socios/reserva/${validatedData.dni}`
      );
      const data = await response.json();

      if (data) {
        // Generate QR code with logo
        const qrData = `dni:${validatedData.dni}`;
        const logoUrl = encodeURIComponent("https://i.ibb.co/9yqvMc4/logo-fondo-limpio.png");
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrData)}&logo=${logoUrl}&logo_size=80x80`;
        
        setQrUrl(qrApiUrl);
        setIsLoadingQR(true);
        setQrGenerated(true);
      } else {
        setError("DNI no encontrado. Por favor verifica el número ingresado.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "El DNI ingresado no está registrado como socio",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("Ocurrió un error al verificar el DNI");
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo conectar con el servidor",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setDni(value);
    setError("");
  };

  const handleClose = () => {
    setDni("");
    setError("");
    setQrGenerated(false);
    setQrUrl("");
    setIsLoadingQR(false);
    onClose();
  };

<<<<<<< HEAD
  const handleQRImageLoad = () => {
    setIsLoadingQR(false);
    toast({
      title: "QR generado con éxito",
      description: "Tu código QR está listo para usar",
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qr-acceso-${dni}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR descargado",
      description: "El código QR se ha descargado correctamente",
    });
=======
  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-acceso-${dni}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "QR descargado",
        description: "El código QR se ha descargado correctamente",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo descargar el código QR",
      });
    }
>>>>>>> d41baef (Ultimos cambios)
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-2xl">
            Generar QR de Acceso
          </DialogTitle>
          <DialogDescription className="font-inter">
            Ingresa tu DNI para generar el código QR de acceso a la pileta
          </DialogDescription>
        </DialogHeader>

        {!qrGenerated ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dni" className="font-inter font-medium">
                DNI del socio(sin puntos)
              </Label>
              <Input
                id="dni"
                type="text"
                placeholder="Ingresa tu DNI"
                value={dni}
                onChange={handleChange}
                maxLength={8}
                className={`font-inter ${error ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {error && (
                <p className="text-sm text-destructive font-inter">{error}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white font-montserrat font-semibold transition-colors"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !dni}
                className="flex-1 bg-primary hover:bg-primary/90 font-montserrat font-semibold flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Generar QR"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {isLoadingQR ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground font-inter">
                  Generando tu código QR...
                </p>
              </div>
<<<<<<< HEAD
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-lg">
                    <img 
                      src={qrUrl} 
                      alt="Código QR de acceso" 
                      className="w-64 h-64"
                      onLoad={handleQRImageLoad}
                    />
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground font-inter">
                  Presenta este código QR en la entrada de la pileta
                </p>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 font-montserrat"
                  >
                    Cerrar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDownload}
                    className="flex-1 font-montserrat"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar QR
                  </Button>
                </div>
              </>
            )}
=======
            </div>
            
            <p className="text-center text-sm text-muted-foreground font-inter">
              Presenta este código QR en la entrada del club
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white font-montserrat font-semibold transition-colors"
              >
                Cerrar
              </Button>
              <Button
                type="button"
                onClick={handleDownload}
                className="flex-1 bg-primary hover:bg-primary/90 font-montserrat font-semibold flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar QR
              </Button>
            </div>
>>>>>>> d41baef (Ultimos cambios)
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QRModal;
