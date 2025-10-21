import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CTA = () => {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-32 bg-primary relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-white mb-6">
            Reservá tu Cancha
          </h2>
          <p className="font-inter text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Hacé tu reserva online y asegurá tu lugar. Aceptamos todas las
            formas de pago.
          </p>
          <Button
            size="lg"
            className={`bg-secondary hover:bg-secondary/90 text-white font-montserrat font-bold text-lg px-12 py-6 shadow-2xl transition-all duration-700 delay-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <Calendar className="mr-2" size={24} />
            Reservar Ahora
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div 
            className="text-center text-white transition-all duration-700"
            style={{
              transitionDelay: '500ms',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Calendar size={28} />
            </div>
            <h3 className="font-montserrat font-bold text-lg mb-2">
              Fácil y Rápido
            </h3>
            <p className="font-inter text-white/80 text-sm">
              Reservá en minutos desde tu celular
            </p>
          </div>

          <div 
            className="text-center text-white transition-all duration-700"
            style={{
              transitionDelay: '650ms',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <MapPin size={28} />
            </div>
            <h3 className="font-montserrat font-bold text-lg mb-2">
              Ubicación Central
            </h3>
            <p className="font-inter text-white/80 text-sm">
              Fácil acceso y amplio estacionamiento
            </p>
          </div>

          <div 
            className="text-center text-white transition-all duration-700"
            style={{
              transitionDelay: '800ms',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Phone size={28} />
            </div>
            <h3 className="font-montserrat font-bold text-lg mb-2">
              Atención Personalizada
            </h3>
            <p className="font-inter text-white/80 text-sm">
              Nuestro equipo siempre disponible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
