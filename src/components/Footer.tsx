import { memo, useMemo } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/logo.png";
import wolfLogo from "@/assets/logo-lobo.webp";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/90 text-background relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
                <img src={logo} alt="Club La Victoria" className="h-10 w-10 object-contain" loading="lazy" width="40" height="40" decoding="async" />
              </div>
              {/* Secondary logo: wolf */}
              <img src={wolfLogo} alt="" className="h-10 w-10 hidden sm:block object-contain drop-shadow-md" loading="lazy" width="40" height="40" decoding="async" aria-hidden="true" />
              <span className="font-montserrat font-bold text-xl">
                CLUB LA VICTORIA
              </span>
            </div>
            <p className="font-inter text-background/80 mb-6 leading-relaxed">
              Entidad deportiva y social dedicada al desarrollo integral de
              nuestros socios desde 1944.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100071167026592"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Visitar Facebook"
              >
                <FaFacebook size={22} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/clublavictoria_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Visitar Instagram"
              >
                <FaInstagram size={22} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="font-montserrat font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Contacto
            </h3>
            <ul className="space-y-4 font-inter">
              <li className="flex gap-3 text-background/80 group">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-background transition-colors">Libertad 1212, Villa Eloísa, Santa Fe</span>
              </li>
              <li className="flex gap-3 text-background/80 group">
                <Phone size={20} className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-background transition-colors">3471 491199</span>
              </li>
              <li className="flex gap-3 text-background/80 group">
                <Mail size={20} className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-background transition-colors">info@clublavictoria.com.ar</span>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="font-montserrat font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Horarios
            </h3>
            <ul className="space-y-4 font-inter">
              <li className="flex gap-3 text-background/80 group">
                <Clock size={20} className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-background group-hover:text-primary transition-colors">Lunes a Viernes</p>
                  <p>8:00 - 22:00</p>
                </div>
              </li>
              <li className="flex gap-3 text-background/80 group">
                <Clock size={20} className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-background group-hover:text-primary transition-colors">Sábados y Domingos</p>
                  <p>9:00 - 21:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <div>
            <p className="font-inter text-background/60">
              © {currentYear} Club de Cazadores La Victoria. Todos los derechos
              reservados.
            </p>
            <p className="font-montserrat font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent my-3 italic">
              "DEL ESFUERZO ES LA VICTORIA"
            </p>
            <p className="font-inter text-background/60">
              Diseñado por Agustín Albónico
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
