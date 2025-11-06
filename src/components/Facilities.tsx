import { useState, useCallback, memo, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import tennis1 from "@/assets/instalaciones/cancha-tenis/foto-1.webp";
import tennis2 from "@/assets/instalaciones/cancha-tenis/foto-2.webp";
import tennis3 from "@/assets/instalaciones/cancha-tenis/foto-3.webp";
import padel1 from "@/assets/instalaciones/cancha-padel/foto-1.webp";
import padel2 from "@/assets/instalaciones/cancha-padel/foto-2.webp";
import padel3 from "@/assets/instalaciones/cancha-padel/foto-3.webp";
import pileta1 from "@/assets/instalaciones/pileta/foto-1.webp";
import pileta2 from "@/assets/instalaciones/pileta/foto-2.webp";
import pileta3 from "@/assets/instalaciones/pileta/foto-3.webp";
import pileta4 from "@/assets/instalaciones/pileta/foto-4.webp";
// gym image removed: replaced by cancha de futbol images
import futbol1 from "@/assets/instalaciones/futbol-5/foto-1.webp";
import futbol2 from "@/assets/instalaciones/futbol-5/foto-2.webp";
import futbol3 from "@/assets/instalaciones/futbol-5/foto-3.webp";
import futbol4 from "@/assets/instalaciones/futbol-5/foto-4.webp";
import futbol5 from "@/assets/instalaciones/futbol-5/foto-5.webp";
import { useInView } from "@/hooks/use-in-view";

const FACILITIES = [
  {
    title: "Canchas de Tenis",
    image: tennis1,
    description: "Canchas profesionales de polvo de ladrillo",
  },
  {
    title: "Canchas de Pádel",
    image: padel1,
    description: "Instalaciones modernas con iluminación LED",
  },
  {
    title: "Pileta",
    image: pileta1,
    description: "Pileta olímpica",
  },
  {
    title: "Cancha Fútbol 5",
    image: futbol1,
    description: "Cancha de fútbol 5 con césped sintético y luminarias",
  },
] as const;

// const GALLERY_IMAGES = [
//   { src: heroBg, alt: "Instalaciones del Club La Victoria", title: "Nuestras Instalaciones" },
//   { src: tennisImg, alt: "Cancha de Tenis", title: "Cancha de Tenis" },
// ] as const;

const EXTRA_FUTBOL_IMAGES = [
  { src: futbol1, alt: "Cancha Fútbol 5 - 1", title: "Cancha Fútbol 5" },
  { src: futbol2, alt: "Cancha Fútbol 5 - 2", title: "Cancha Fútbol 5" },
  { src: futbol3, alt: "Cancha Fútbol 5 - 3", title: "Cancha Fútbol 5" },
  { src: futbol4, alt: "Cancha Fútbol 5 - 4", title: "Cancha Fútbol 5" },
  { src: futbol5, alt: "Cancha Fútbol 5 - 5", title: "Cancha Fútbol 5" },
] as const;

const EXTRA_PILETA_IMAGES = [
  { src: pileta2, alt: "Piscina - 2", title: "Piscina" },
  { src: pileta3, alt: "Piscina - 3", title: "Piscina" },
  { src: pileta4, alt: "Piscina - 4", title: "Piscina" },
] as const;

const EXTRA_PADEL_IMAGES = [
  { src: padel2, alt: "Cancha de Pádel - 2", title: "Cancha de Pádel" },
  { src: padel3, alt: "Cancha de Pádel - 3", title: "Cancha de Pádel" },
] as const;

const EXTRA_TENNIS_IMAGES = [
  { src: tennis2, alt: "Cancha de Tenis - 2", title: "Cancha de Tenis" },
  { src: tennis3, alt: "Cancha de Tenis - 3", title: "Cancha de Tenis" },
] as const;

const UPDATED_GALLERY_IMAGES = [
  ...EXTRA_FUTBOL_IMAGES,
  ...EXTRA_PILETA_IMAGES,
  ...EXTRA_PADEL_IMAGES,
  ...EXTRA_TENNIS_IMAGES,
] as const;

// Memoized Facility Thumbnail Component
const FacilityThumbnail = memo(({ facility, index, isActive, isInView, onClick }: {
  facility: typeof FACILITIES[number];
  index: number;
  isActive: boolean;
  isInView: boolean;
  onClick: () => void;
}) => (
  <div
    className={`group relative h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
      isActive
        ? "ring-4 ring-primary scale-105 shadow-2xl"
        : "hover:scale-105 shadow-xl hover:shadow-2xl"
    }`}
    style={{
      transitionDelay: `${300 + index * 100}ms`,
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.9)'
    }}
    onClick={onClick}
  >
    <img
      src={facility.image}
      alt={facility.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
      width="400"
      height="300"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    {isActive && (
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
));

FacilityThumbnail.displayName = "FacilityThumbnail";

const Facilities = memo(() => {
  const [activeImage, setActiveImage] = useState(0);
  const { ref, isInView } = useInView();

  const activeFacility = useMemo(() => FACILITIES[activeImage], [activeImage]);

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveImage(index);
  }, []);

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
              src={activeFacility.image}
              alt={activeFacility.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
              width="800"
              height="500"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-montserrat font-bold text-sm">{activeImage + 1} / {FACILITIES.length}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
              <h3 className="font-montserrat font-bold text-3xl mb-2 drop-shadow-lg">
                {activeFacility.title}
              </h3>
              <p className="font-inter text-lg drop-shadow-md">
                {activeFacility.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {FACILITIES.map((facility, index) => (
              <FacilityThumbnail
                key={facility.title}
                facility={facility}
                index={index}
                isActive={activeImage === index}
                isInView={isInView}
                onClick={() => handleThumbnailClick(index)}
              />
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
              {UPDATED_GALLERY_IMAGES.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                  <div className="p-2">
                    <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-video">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          width="800"
                          height="420"
                          decoding="async"
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
            <CarouselPrevious className="left-0 -translate-x-1/2 focus:ring-4 focus:ring-primary/50" aria-label="Ver imagen anterior de la galería" />
            <CarouselNext className="right-0 translate-x-1/2 focus:ring-4 focus:ring-primary/50" aria-label="Ver siguiente imagen de la galería" />
          </Carousel>
        </div>
      </div>
    </section>
  );
});

Facilities.displayName = "Facilities";

export default Facilities;
