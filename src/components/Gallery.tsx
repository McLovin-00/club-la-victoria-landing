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

const Gallery = () => {
  const images = [
    { src: heroBg, alt: "Instalaciones del Club La Victoria", title: "Nuestras Instalaciones" },
    { src: tennisImg, alt: "Cancha de Tenis", title: "Cancha de Tenis" },
    { src: padelImg, alt: "Cancha de Pádel", title: "Cancha de Pádel" },
    { src: poolImg, alt: "Piscina", title: "Piscina" },
    { src: gymImg, alt: "Gimnasio", title: "Gimnasio" },
  ];

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Galería de Fotos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conocé nuestras instalaciones deportivas y recreativas
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {images.map((image, index) => (
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
    </section>
  );
};

export default Gallery;
