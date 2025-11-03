import { useInView } from "@/hooks/use-in-view";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import conjuntoBlanco from "@/assets/merchandising/conjunto-blanco.png";
import remeraNegra from "@/assets/merchandising/remera-negra.png";
import gorra1 from "@/assets/merchandising/gorra-1.png";
import gorra2 from "@/assets/merchandising/gorra-2.png";
import fotoGorras1 from "@/assets/merchandising/foto-gorras-1.jpg";
import fotoGorras2 from "@/assets/merchandising/foto-gorras-2.jpg";

const Merchandising = () => {
  const { ref, isInView } = useInView();

  const products = [
    {
      name: "Conjunto Deportivo",
      description: "Conjunto completo para entrenar con el escudo del club",
      image: conjuntoBlanco,
      gradient: "from-primary/20 via-primary/10 to-transparent",
    },
    {
      name: "Remera Deportiva",
      description: "Remera de entrenamiento con diseño exclusivo",
      image: remeraNegra,
      gradient: "from-secondary/20 via-secondary/10 to-transparent",
    },
    {
      name: "Gorra Escudo",
      description: "Gorra ajustable con bordado del club",
      image: gorra2,
      gradient: "from-accent/20 via-accent/10 to-transparent",
    },
    {
      name: "Gorra Logo",
      description: "Gorra con diseño del logo exclusivo",
      image: gorra1,
      gradient: "from-primary/20 via-primary/10 to-transparent",
    },
  ];

  const galleryImages = [
    { image: fotoGorras1, alt: "Merchandising del club junto a la pileta" },
    { image: fotoGorras2, alt: "Productos oficiales del club" },
  ];

  const handleContactClick = () => {
    const phoneNumber = "549XXXXXXXXXX";
    const message = encodeURIComponent("Hola! Me gustaría consultar sobre el merchandising del club.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="merchandising" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-2 bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-inter text-sm font-semibold text-primary uppercase tracking-wider">
                Merchandising
              </span>
            </div>
          </div>
          
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Productos Oficiales
          </h2>
          
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Llevá los colores del club con nuestros productos oficiales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={index}
              className={`transition-all duration-700 delay-${index * 100} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="mb-4 relative overflow-hidden rounded-xl bg-card aspect-square flex items-center justify-center p-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <h3 className="font-montserrat text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Gallery Carousel */}
        <div className="mb-12">
          <h3 className="font-montserrat text-3xl font-bold text-center mb-8 text-foreground">
            Galería de Productos
          </h3>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {galleryImages.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-2 overflow-hidden">
                      <CardContent className="p-0">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="w-full h-[400px] md:h-[500px] object-contain bg-muted"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-card to-card/50 rounded-3xl border-2 border-primary/20 shadow-xl">
            <p className="font-inter text-lg text-muted-foreground mb-6 max-w-md">
              Para consultar precios, talles y disponibilidad, contactate con nosotros
            </p>
            <Button
              onClick={handleContactClick}
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-montserrat font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Consultar Productos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Merchandising;