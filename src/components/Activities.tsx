import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Waves, Trophy, Volleyball, Activity, Zap } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      icon: Trophy,
      title: "Fútbol",
      description: "Canchas de fútbol 5 y 7 con césped sintético de última generación.",
      color: "text-primary",
    },
    {
      icon: Activity,
      title: "Pádel",
      description: "Canchas profesionales sobre alfombra y cemento con iluminación LED.",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Tenis",
      description: "Canchas de polvo de ladrillo mantenidas según estándares profesionales.",
      color: "text-primary",
    },
    {
      icon: Waves,
      title: "Natación",
      description: "Pileta olímpica climatizada con clases para todas las edades.",
      color: "text-primary",
    },
    {
      icon: Dumbbell,
      title: "Gimnasio",
      description: "Equipamiento de última tecnología y profesores especializados.",
      color: "text-primary",
    },
    {
      icon: Volleyball,
      title: "Hockey",
      description: "Canchas reglamentarias y escuelita de hockey para niños y niñas.",
      color: "text-primary",
    },
  ];

  return (
    <section id="actividades" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nuestras Actividades
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia variedad de disciplinas deportivas para toda la
            familia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Card
              key={activity.title}
              className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up cursor-pointer border-2 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <activity.icon className={activity.color} size={32} />
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
