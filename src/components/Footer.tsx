import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Club La Victoria" className="h-12 w-12" />
              <span className="font-montserrat font-bold text-xl">
                CLUB LA VICTORIA
              </span>
            </div>
            <p className="font-inter text-background/80 mb-6">
              Entidad deportiva y social dedicada al desarrollo integral de
              nuestros socios desde 1944.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="font-montserrat font-bold text-lg mb-6">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3 font-inter">
              <li>
                <a
                  href="#inicio"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#club"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  El Club
                </a>
              </li>
              <li>
                <a
                  href="#actividades"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Actividades
                </a>
              </li>
              <li>
                <a
                  href="#instalaciones"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Instalaciones
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="font-montserrat font-bold text-lg mb-6">
              Contacto
            </h3>
            <ul className="space-y-4 font-inter">
              <li className="flex gap-3 text-background/80">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span>Dirección del Club, Ciudad, Provincia</span>
              </li>
              <li className="flex gap-3 text-background/80">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span>+54 (XXX) XXX-XXXX</span>
              </li>
              <li className="flex gap-3 text-background/80">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span>info@clublavictoria.com.ar</span>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="font-montserrat font-bold text-lg mb-6">Horarios</h3>
            <ul className="space-y-4 font-inter">
              <li className="flex gap-3 text-background/80">
                <Clock size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-background">Lunes a Viernes</p>
                  <p>8:00 - 22:00</p>
                </div>
              </li>
              <li className="flex gap-3 text-background/80">
                <Clock size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-background">Sábados y Domingos</p>
                  <p>9:00 - 21:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="font-inter text-background/60">
            © {currentYear} Club de Cazadores La Victoria. Todos los derechos
            reservados.
          </p>
          <p className="font-montserrat font-semibold text-background/80 mt-2 italic">
            "DEL ESFUERZO ES LA VICTORIA"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
