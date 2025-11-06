import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg4.webp";
import logo from "@/assets/logo.png";

const Hero = memo(() => {
  const scrollToActivities = useCallback(() => {
    const target = document.querySelector("#actividades");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToAbout = useCallback(() => {
    const target = document.querySelector("#club");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with CSS for better performance */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(22, 163, 74, 0.55), rgba(22, 163, 74, 0.28)), url(${heroBg})`,
          // Use a soft blur on the background and slightly scale it to avoid visible transparent edges
          filter: 'blur(6px)',
          transform: 'scale(1.03)',
          willChange: 'transform, filter',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 backdrop-blur-sm" />

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="animate-fade-in-up">
          <img
            src={logo}
            alt="Escudo Club La Victoria"
            className="mx-auto h-32 w-auto lg:h-40 mb-4 lg:mb-8 animate-float drop-shadow-2xl"
            loading="eager"
            width="160"
            height="160"
          />
        </div>

        <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl lg:text-8xl text-white mb-6 animate-fade-in-up tracking-tight drop-shadow-2xl">
          CLUB DE CAZADORES
          <br />
          <span className="text-secondary">LA VICTORIA</span>
        </h1>

        <p className="hidden sm:block font-inter text-lg md:text-2xl text-white/95 mb-4 max-w-3xl mx-auto animate-fade-in drop-shadow-lg">
          Entidad deportiva y social desde 1944
        </p>

        <p className="font-montserrat font-bold text-xl md:text-3xl text-white mb-12 animate-fade-in drop-shadow-lg italic">
          "DEL ESFUERZO ES LA VICTORIA"
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white font-montserrat font-bold text-lg px-8 py-6 shadow-2xl transform-gpu transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary/30 motion-safe:animate-fade-in-up will-change-transform"
            onClick={scrollToActivities}
          >
            Reservar Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-montserrat font-bold text-lg px-8 py-6 shadow-2xl backdrop-blur-sm bg-white/10 transform-gpu transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/25 motion-safe:animate-fade-in-up will-change-transform"
            onClick={scrollToAbout}
          >
            Conocer Más
          </Button>
        </div>
      </div>

      <a
        href="#club"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          scrollToAbout();
        }}
        aria-label="Ir a la sección del club"
      >
        <ChevronDown size={40} />
      </a>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
