import { useState } from "react";
import tennisImg from "@/assets/tennis.jpg";
import padelImg from "@/assets/padel.jpg";
import poolImg from "@/assets/pool.jpg";
import gymImg from "@/assets/gym.jpg";
import { useInView } from "@/hooks/use-in-view";

const Facilities = () => {
  const [activeImage, setActiveImage] = useState(0);
  const { ref, isInView } = useInView();

  const facilities = [
    {
      title: "Canchas de Tenis",
      image: tennisImg,
      description: "Canchas profesionales de polvo de ladrillo",
    },
    {
      title: "Canchas de Pádel",
      image: padelImg,
      description: "Instalaciones modernas con iluminación LED",
    },
    {
      title: "Natatorio",
      image: poolImg,
      description: "Pileta olímpica climatizada",
    },
    {
      title: "Gimnasio",
      image: gymImg,
      description: "Equipamiento de última generación",
    },
  ];

  return (
    <section id="instalaciones" className="py-20 md:py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nuestras Instalaciones
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Instalaciones de primer nivel para tu desarrollo deportivo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className={`relative h-[500px] rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <img
              src={facilities[activeImage].image}
              alt={facilities[activeImage].title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="font-montserrat font-bold text-3xl mb-2">
                {facilities[activeImage].title}
              </h3>
              <p className="font-inter text-lg">
                {facilities[activeImage].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {facilities.map((facility, index) => (
              <div
                key={facility.title}
                className={`relative h-48 rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${
                  activeImage === index
                    ? "ring-4 ring-primary scale-105 shadow-[var(--shadow-hover)]"
                    : "hover:scale-105 shadow-[var(--shadow-elegant)]"
                }`}
                style={{ 
                  transitionDelay: `${300 + index * 100}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.9)'
                }}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-montserrat font-bold text-lg">
                    {facility.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
