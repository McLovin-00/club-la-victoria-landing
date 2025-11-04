import { useState, useCallback, memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReservationModal from "./ReservationModal";
import { useInView } from "@/hooks/use-in-view";
import mascota from "@/assets/mascota.webp";

// Import images so Vite/Bun processes them
import iconCanchaFutbol from "@/assets/actividades/icono-cancha-futbol-5-green.png";
import iconCanchaPaddle1 from "@/assets/actividades/icono-cancha-paddle-green.png";
import iconCanchaPaddle2 from "@/assets/actividades/icono-cancha-paddle-green.png";
import iconCanchaTenis from "@/assets/actividades/icono-cancha-tenis-green.png";
import iconSalon from "@/assets/actividades/icono-salon-green.png";
import iconQuincho from "@/assets/actividades/icono-salon-green.png";

const ACTIVITIES = [
  {
    icon: iconCanchaFutbol,
    title: "Cancha fútbol 5",
    description: "Canchas de fútbol 5 con césped sintético de última generación y excelente iluminación.",
    color: "text-primary",
  },
  {
    icon: iconCanchaPaddle1,
    title: "Pádel sobre alfombra",
    description: "Canchas de pádel con superficie de alfombra sintética, ideales para un juego profesional.",
    color: "text-primary",
  },
  {
    icon: iconCanchaPaddle2,
    title: "Pádel sobre cemento",
    description: "Canchas de pádel con superficie de cemento, perfectas para entrenamientos intensivos.",
    color: "text-primary",
  },
  {
    icon: iconCanchaTenis,
    title: "Tenis sobre polvo de ladrillo",
    description: "Canchas de tenis profesionales con polvo de ladrillo mantenidas según estándares internacionales.",
    color: "text-primary",
  },
  {
    icon: iconSalon,
    title: "Salón",
    description: "Salón equipado para eventos. Para casamientos o cumpleaños de quince, comunicarse con la Secretaría.",
    color: "text-primary",
  },
  {
    icon: iconQuincho,
    title: "Quincho",
    description: "Quincho con parrilla para eventos familiares. Para casamientos o cumpleaños de quince, comunicarse con la Secretaría.",
    color: "text-primary",
  },
] as const;

// Memoized Activity Card component
const ActivityCard = memo(({ activity, index, isInView, onReserve }: {
  activity: typeof ACTIVITIES[number];
  index: number;
  isInView: boolean;
  onReserve: (title: string) => void;
}) => {
  const handleClick = useCallback(() => {
    onReserve(activity.title);
  }, [activity.title, onReserve]);

  return (
    <Card
      className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-3 border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm overflow-hidden relative"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)'
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-8 relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:from-primary/30 group-hover:to-secondary/20 transition-all duration-500 shadow-lg">
          <img 
            src={activity.icon} 
            alt="" 
            className={`${activity.color} group-hover:scale-110 transition-transform w-14`} 
            loading="lazy" 
            width="56"
            height="56"
            decoding="async"
          />
        </div>
        <h3 className="font-montserrat font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
          {activity.title}
        </h3>
        <p className="font-inter text-muted-foreground leading-relaxed mb-6 min-h-[80px]">
          {activity.description}
        </p>
        <Button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-secondary font-montserrat font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Reservar Ahora
        </Button>
      </CardContent>
    </Card>
  );
});

ActivityCard.displayName = "ActivityCard";

const Activities = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const { ref, isInView } = useInView();

  const handleReserve = useCallback((activityTitle: string) => {
    setSelectedActivity(activityTitle);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <section id="actividades" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden" ref={ref}>
        {/* Animated background gradients */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header with asymmetric layout - Title on left, mascot on right */}
          <div className={`mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-center">
              {/* Left column - Text */}
              <div className="text-left">
                <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                  Reservá tu Cancha
                </h2>
                <div className="w-28 h-1.5 bg-gradient-to-r from-primary to-secondary mb-5 rounded-full" />
                <p className="font-inter text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Seleccioná actividad, día y hora. Una vez abonada, deberás adjuntar
                  el comprobante del pago en el apartado "Mis reservas". Tendrás 30
                  minutos para hacerlo.
                </p>
              </div>

              {/* Right column - Mascot */}
              <div className="hidden lg:flex justify-center items-center">
                <img
                  src={mascota}
                  alt="Mascota del Club La Victoria"
                  className="h-64 xl:h-80 w-auto drop-shadow-2xl animate-float"
                  style={{ animationDuration: '4s' }}
                  loading="lazy"
                  width="320"
                  height="320"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACTIVITIES.map((activity, index) => (
              <ActivityCard
                key={activity.title}
                activity={activity}
                index={index}
                isInView={isInView}
                onReserve={handleReserve}
              />
            ))}
          </div>
        </div>
      </section>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        activityTitle={selectedActivity}
      />
    </>
  );
});

Activities.displayName = "Activities";

export default Activities;
