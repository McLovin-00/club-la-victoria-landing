import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <img src={logo} alt="Club La Victoria" className="h-12 w-auto md:h-14 object-contain" />
            <span
              className={`font-montserrat font-bold text-lg md:text-xl ${
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
                className={`font-inter font-medium hover:text-primary transition-colors relative group ${
                  isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <Button
              className="bg-primary hover:bg-primary/90 font-montserrat font-semibold"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#actividades");
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Reservar
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
                className={`block py-3 font-inter font-medium hover:text-primary transition-colors ${
                  isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
                }`}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="w-full mt-4 bg-primary hover:bg-primary/90 font-montserrat font-semibold"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#actividades");
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                setIsMobileMenuOpen(false);
              }}
            >
              Reservar
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
