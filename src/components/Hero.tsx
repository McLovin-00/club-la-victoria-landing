import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(22, 163, 74, 0.7), rgba(22, 163, 74, 0.4)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="animate-fade-in-up">
          <img
            src={logo}
            alt="Escudo Club La Victoria"
            className="mx-auto h-40 w-auto md:h-48 mb-8 animate-float drop-shadow-2xl"
          />
        </div>
        
        <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl lg:text-8xl text-white mb-6 animate-fade-in-up tracking-tight drop-shadow-2xl">
          CLUB DE CAZADORES
          <br />
          <span className="text-secondary">LA VICTORIA</span>
        </h1>
        
        <p className="font-inter text-lg md:text-2xl text-white/95 mb-4 max-w-3xl mx-auto animate-fade-in drop-shadow-lg">
          Entidad deportiva y social desde 1944
        </p>
        
        <p className="font-montserrat font-bold text-xl md:text-3xl text-white mb-12 animate-fade-in drop-shadow-lg italic">
          "DEL ESFUERZO ES LA VICTORIA"
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white font-montserrat font-bold text-lg px-8 py-6 shadow-2xl"
            onClick={() => {
              const target = document.querySelector("#actividades");
              if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Reservar Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-montserrat font-bold text-lg px-8 py-6 shadow-2xl backdrop-blur-sm bg-white/10"
            onClick={() => {
              const target = document.querySelector("#club");
              if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
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
          const target = document.querySelector("#club");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <ChevronDown size={40} />
      </a>
    </section>
  );
};

export default Hero;
