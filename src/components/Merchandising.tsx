import { useInView } from "@/hooks/use-in-view";
import { ShoppingBag, Shirt, CircleDot } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Merchandising = () => {
  const { ref, isInView } = useInView();

  const products = [
    {
      name: "Remera Oficial",
      description: "Remera de algodón con el escudo del club",
      icon: Shirt,
      gradient: "from-primary/20 via-primary/10 to-transparent",
    },
    {
      name: "Gorra Deportiva",
      description: "Gorra ajustable con bordado del club",
      icon: CircleDot,
      gradient: "from-secondary/20 via-secondary/10 to-transparent",
    },
    {
      name: "Conjunto Deportivo",
      description: "Conjunto completo para entrenar",
      icon: ShoppingBag,
      gradient: "from-accent/20 via-accent/10 to-transparent",
    },
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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-700 delay-${index * 100} ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="mb-6 relative">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="font-montserrat text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="font-inter text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
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