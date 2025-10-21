import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import tennisImg from "@/assets/tennis.jpg";
import padelImg from "@/assets/padel.jpg";
import poolImg from "@/assets/pool.jpg";
import gymImg from "@/assets/gym.jpg";
import heroBg from "@/assets/hero-bg.jpg";
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

  const galleryImages = [
    { src: heroBg, alt: "Instalaciones del Club La Victoria", title: "Nuestras Instalaciones" },
    { src: tennisImg, alt: "Cancha de Tenis", title: "Cancha de Tenis" },
    { src: padelImg, alt: "Cancha de Pádel", title: "Cancha de Pádel" },
    { src: poolImg, alt: "Piscina", title: "Piscina" },
    { src: gymImg, alt: "Gimnasio", title: "Gimnasio" },
  ];

  return (
    <section id="instalaciones" className="py-20 md:py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Instalaciones y Galería
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Instalaciones de primer nivel para tu desarrollo deportivo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">
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

        {/* Gallery Carousel */}
        <div className={`transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-montserrat font-bold text-3xl text-foreground text-center mb-8">
            Galería de Fotos
          </h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="relative overflow-hidden rounded-lg shadow-lg group">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <h3 className="text-white font-semibold text-xl p-4">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
