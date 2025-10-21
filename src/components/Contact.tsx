import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useInView } from "@/hooks/use-in-view";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100, "El nombre debe tener menos de 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "El email debe tener menos de 255 caracteres"),
  message: z.string().trim().min(1, "El mensaje es requerido").max(1000, "El mensaje debe tener menos de 1000 caracteres"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref, isInView } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      setErrors({});
      toast.success("Mensaje enviado correctamente. Nos contactaremos pronto!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Contactanos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envianos tu consulta y te responderemos a
            la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl mb-2">
                      Dirección
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      Dirección del Club
                      <br />
                      Ciudad, Provincia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl mb-2">
                      Teléfono
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      +54 (XXX) XXX-XXXX
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl mb-2">
                      Email
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      info@clublavictoria.com.ar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878925974!2d-58.38375908477031!3d-34.60373098045866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzEzLjQiUyA1OMKwMjInNTYuMCJX!5e0!3m2!1ses-419!2sar!4v1234567890123!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Club La Victoria"
              />
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="border-2">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-inter font-medium text-sm mb-2 block"
                    >
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className={errors.name ? "border-destructive" : ""}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-inter font-medium text-sm mb-2 block"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className={errors.email ? "border-destructive" : ""}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-inter font-medium text-sm mb-2 block"
                    >
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribí tu consulta aquí..."
                      rows={6}
                      className={errors.message ? "border-destructive" : ""}
                      maxLength={1000}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 font-montserrat font-semibold text-lg py-6"
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
