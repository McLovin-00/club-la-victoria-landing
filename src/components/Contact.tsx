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
    <section id="contacto" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Contactanos
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full" />
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envianos tu consulta y te responderemos a
            la brevedad.
          </p>
        </div>

        {/* Info and Form Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto">
          {/* Left Column - Contact Info Cards */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <MapPin className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl mb-2">
                      Dirección
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      Libertad 1212, Villa Eloísa, Santa Fe
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Phone className="text-primary" size={28} />
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

            <Card className="group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Mail className="text-primary" size={28} />
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
          </div>

          {/* Right Column - Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="border-2 shadow-2xl bg-card/80 backdrop-blur-sm h-full">
              <CardContent className="p-8">
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-center mb-8">
                  Envianos tu Consulta
                </h3>
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
                      className={`transition-all ${errors.name ? "border-destructive" : "focus:border-primary"}`}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1 animate-fade-in">{errors.name}</p>
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
                      className={`transition-all ${errors.email ? "border-destructive" : "focus:border-primary"}`}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1 animate-fade-in">{errors.email}</p>
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
                      className={`transition-all ${errors.message ? "border-destructive" : "focus:border-primary"}`}
                      maxLength={1000}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1 animate-fade-in">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary font-montserrat font-semibold text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map - Full width at bottom */}
        <div className={`transition-all duration-1000 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-card h-96 md:h-[500px] relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.659539045054!2d-61.54432000033622!3d-32.95999709238338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9c516b1555555%3A0xdfbc2836c5cdceb4!2sClub%20La%20Victoria!5e0!3m2!1ses-419!2sar!4v1704432166726!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Club La Victoria"
              className="relative z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
