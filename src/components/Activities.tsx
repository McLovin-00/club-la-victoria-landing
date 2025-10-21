import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Home, Wine } from "lucide-react";
import ReservationModal from "./ReservationModal";
import { useInView } from "@/hooks/use-in-view";

const Activities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const { ref, isInView } = useInView();

  const activities = [
    {
      icon: Trophy,
      title: "Cancha fútbol 5",
      description: "Canchas de fútbol 5 con césped sintético de última generación y excelente iluminación.",
      color: "text-primary",
    },
    {
      icon: Trophy,
      title: "Pádel sobre alfombra",
      description: "Canchas de pádel con superficie de alfombra sintética, ideales para un juego profesional.",
      color: "text-primary",
    },
    {
      icon: Trophy,
      title: "Pádel sobre cemento",
      description: "Canchas de pádel con superficie de cemento, perfectas para entrenamientos intensivos.",
      color: "text-primary",
    },
    {
      icon: Trophy,
      title: "Tenis sobre polvo de ladrillo",
      description: "Canchas de tenis profesionales con polvo de ladrillo mantenidas según estándares internacionales.",
      color: "text-primary",
    },
    {
      icon: Home,
      title: "Salón",
      description: "Salón equipado para eventos. Para casamientos o cumpleaños de quince, comunicarse con la Secretaría.",
      color: "text-primary",
    },
    {
      icon: Wine,
      title: "Quincho",
      description: "Quincho con parrilla para eventos familiares. Para casamientos o cumpleaños de quince, comunicarse con la Secretaría.",
      color: "text-primary",
    },
  ];

  const handleReserve = (activityTitle: string) => {
    setSelectedActivity(activityTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="actividades" className="py-20 md:py-32 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
              Nuestras Actividades
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Seleccioná actividad, día y hora. Una vez abonada, deberás adjuntar
              el comprobante del pago en el apartado "Mis reservas". Tendrás 30
              minutos para hacerlo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <Card
                key={activity.title}
                className="group hover:shadow-[var(--shadow-hover)] transition-all duration-700 hover:-translate-y-2 border-2 hover:border-primary/30"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)'
                }}
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <activity.icon className={activity.color} size={32} />
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                    {activity.description}
                  </p>
                  <Button
                    onClick={() => handleReserve(activity.title)}
                    className="w-full bg-primary hover:bg-primary/90 font-montserrat font-semibold"
                  >
                    Reservar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activityTitle={selectedActivity}
      />
    </>
  );
};

export default Activities;
