import { useState, useEffect } from "react";
import { Menu, X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import QRModal from "./QRModal";
import { useActiveSection } from "@/hooks/use-active-section";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const sectionIds = ["#inicio", "#club", "#actividades", "#instalaciones", "#merchandising", "#contacto"];
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "El Club", href: "#club" },
    { name: "Actividades", href: "#actividades" },
    { name: "Instalaciones", href: "#instalaciones" },
    { name: "Merchandising", href: "#merchandising" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      } ${isMobileMenuOpen ? "bg-white/95 backdrop-blur-md shadow-lg" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a
            href="#inicio"
            className="flex items-center gap-2 animate-fade-in t"
            onClick={(e) => handleSmoothScroll(e, "#inicio")}
          >
            <img src={logo} alt="Club La Victoria" className="block h-12 w-auto md:h-14 object-contain" />
            <span
              className={`hidden lg:block font-montserrat font-bold text-lg lg:text-xl ${
                isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
              }`}
            >
              CLUB LA VICTORIA
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-inter font-medium transition-colors relative group ${
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : isScrolled || isMobileMenuOpen
                    ? "text-black hover:text-primary"
                    : "text-white hover:text-primary"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                  activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}
            <Button
              className="bg-secondary hover:bg-secondary/90 text-white font-montserrat font-semibold shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#actividades");
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Reservar
            </Button>
            <Button
              variant="outline"
              className="font-montserrat font-semibold border-2"
              onClick={(e) => {
                e.preventDefault();
                setIsQRModalOpen(true);
              }}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Generar QR
            </Button>
          </div>

          <button
            className={`md:hidden ${isScrolled || isMobileMenuOpen ? "text-black" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block py-3 font-inter font-medium transition-colors ${
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : isScrolled || isMobileMenuOpen
                    ? "text-black hover:text-primary"
                    : "text-white hover:text-primary"
                }`}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-white font-montserrat font-semibold shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#actividades");
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                setIsMobileMenuOpen(false);
              }}
            >
              Reservar
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2 font-montserrat font-semibold border-2"
              onClick={(e) => {
                e.preventDefault();
                setIsQRModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Generar QR
            </Button>
          </div>
        )}
      </div>
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
