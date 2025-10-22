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
    <section id="instalaciones" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" ref={ref}>
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-montserrat font-bold text-4xl md:text-6xl text-foreground mb-6">
            Instalaciones y Galería
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full" />
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Instalaciones de primer nivel para tu desarrollo deportivo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">
          <div className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-card transition-all duration-1000 delay-300 group ${isInView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <img
              src={facilities[activeImage].image}
              alt={facilities[activeImage].title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-montserrat font-bold text-sm">{activeImage + 1} / {facilities.length}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
              <h3 className="font-montserrat font-bold text-3xl mb-2 drop-shadow-lg">
                {facilities[activeImage].title}
              </h3>
              <p className="font-inter text-lg drop-shadow-md">
                {facilities[activeImage].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {facilities.map((facility, index) => (
              <div
                key={facility.title}
                className={`group relative h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                  activeImage === index
                    ? "ring-4 ring-primary scale-105 shadow-2xl"
                    : "hover:scale-105 shadow-xl hover:shadow-2xl"
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {activeImage === index && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-2 animate-scale-in">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-1">
                  <h4 className="font-montserrat font-bold text-lg drop-shadow-lg">
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
