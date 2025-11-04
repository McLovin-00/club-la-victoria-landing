import { memo, useMemo } from "react";
import { Trophy, Users, Target } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import wolfLogo from "@/assets/logo-lobo.webp";

const STATS = [
  { icon: Trophy, value: "80+", label: "Años de Historia" },
  { icon: Users, value: "500+", label: "Socios Activos" },
  { icon: Target, value: "7", label: "Disciplinas Deportivas" },
] as const;

const About = memo(() => {
  const { ref, isInView } = useInView();

  return (
    <section id="club" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden" ref={ref}>
      {/* Logo-lobo watermark decorative centered behind content */}
      <img
        src={wolfLogo}
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 w-[28rem] lg:w-[36rem] xl:w-[44rem] z-0 select-none drop-shadow-2xl animate-fade-in-up"
        style={{ filter: 'blur(1px)' }}
        loading="lazy"
        width="704"
        height="704"
        decoding="async"
        aria-hidden="true"
      />
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nuestra Historia
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`group text-center transition-all duration-700 hover:-translate-y-2`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)'
                }}
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Icon className="text-primary group-hover:scale-110 transition-transform" size={44} />
                </div>
                <h3 className="font-montserrat font-bold text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </h3>
                <p className="font-inter text-muted-foreground font-semibold text-lg">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`max-w-4xl mx-auto space-y-6 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-8 shadow-lg">
            <p className="font-inter text-lg text-foreground/90 leading-relaxed">
              El Club de Cazadores "La Victoria" fue establecido el{" "}
              <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                4 de septiembre de 1944
              </span>{" "}
              con el objetivo principal de construir una entidad deportiva y
              social dedicada a la práctica del tiro a paloma, más tarde
              reemplazado por el tiro al vuelo (platillo y hélice). A lo largo del
              tiempo hemos ampliado nuestras actividades incorporando nuevas
              disciplinas como Tenis, Pádel, Hockey, Gimnasia Artística y Voley.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-8 shadow-lg">
            <p className="font-inter text-lg text-foreground/90 leading-relaxed">
              En el transcurso de los años, hemos desarrollado infraestructuras
              significativas que incluyen un natatorio recreativo, un gimnasio,
              canchas de pádel, fútbol, hockey y tenis, así como un salón comedor
              y un quincho para mayor comodidad de nuestros miembros.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-8 shadow-lg">
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
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
