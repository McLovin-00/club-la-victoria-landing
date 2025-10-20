import { Trophy, Users, Target } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Trophy, value: "80+", label: "Años de Historia" },
    { icon: Users, value: "500+", label: "Socios Activos" },
    { icon: Target, value: "7", label: "Disciplinas Deportivas" },
  ];

  return (
    <section id="club" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nuestra Historia
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 hover:scale-110 transition-transform">
                <stat.icon className="text-primary" size={36} />
              </div>
              <h3 className="font-montserrat font-bold text-4xl text-primary mb-2">
                {stat.value}
              </h3>
              <p className="font-inter text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <p className="font-inter text-lg text-foreground/90 leading-relaxed">
            El Club de Cazadores "La Victoria" fue establecido el{" "}
            <span className="font-semibold text-primary">
              4 de septiembre de 1944
            </span>{" "}
            con el objetivo principal de construir una entidad deportiva y
            social dedicada a la práctica del tiro a paloma, más tarde
            reemplazado por el tiro al vuelo (platillo y hélice). A lo largo del
            tiempo hemos ampliado nuestras actividades incorporando nuevas
            disciplinas como Tenis, Pádel, Hockey, Gimnasia Artística y Voley.
          </p>

          <p className="font-inter text-lg text-foreground/90 leading-relaxed">
            En el transcurso de los años, hemos desarrollado infraestructuras
            significativas que incluyen un natatorio recreativo, un gimnasio,
            canchas de pádel, fútbol, hockey y tenis, así como un salón comedor
            y un quincho para mayor comodidad de nuestros miembros.
          </p>

          <p className="font-inter text-lg text-foreground/90 leading-relaxed">
            Como pionera entre las instituciones locales, ha desempeñado un
            papel fundamental como punto de encuentro para niños, jóvenes y
            adultos. Esta institución ha sido testigo de sacrificios, alegrías y
            triunfos, así como de desafíos y superación constante. Ha sido un
            espacio donde la convivencia y la colaboración en equipo han sido
            valores fundamentales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
