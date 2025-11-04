import { useState, useEffect, useCallback, memo } from "react";
import { Menu, X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import QRModal from "./QRModal";
import { useActiveSection } from "@/hooks/use-active-section";

// Throttle helper
function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

const NAV_ITEMS = [
  { name: "Inicio", href: "#inicio" },
  { name: "El Club", href: "#club" },
  { name: "Actividades", href: "#actividades" },
  { name: "Instalaciones", href: "#instalaciones" },
  { name: "Merchandising", href: "#merchandising" },
  { name: "Contacto", href: "#contacto" },
] as const;

const SECTION_IDS = ["#inicio", "#club", "#actividades", "#instalaciones", "#merchandising", "#contacto"];

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = throttle(() => setIsScrolled(window.scrollY > 20), 100);

    // Initial check
    setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const handleReserveClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#actividades");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  }, []);

  const handleQRClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsQRModalOpen(true);
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeQRModal = useCallback(() => {
    setIsQRModalOpen(false);
  }, []);

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
            <img src={logo} alt="Club La Victoria" className="block h-12 w-auto md:h-14 object-contain" loading="eager" />

            <span
              className={`hidden lg:block font-montserrat font-bold text-lg lg:text-xl ${
                isScrolled || isMobileMenuOpen ? "text-black" : "text-white"
              }`}
            >
              CLUB LA VICTORIA
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-inter font-medium transition duration-200 ease-out transform-gpu relative group ${
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : isScrolled || isMobileMenuOpen
                    ? "text-black hover:text-primary"
                    : "text-white hover:text-primary"
                } hover:-translate-y-1 hover:scale-105 will-change-transform`}
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
              className="bg-secondary hover:bg-secondary/90 text-white font-montserrat font-semibold shadow-lg transform-gpu transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary/30 will-change-transform"
              onClick={handleReserveClick}
            >
              Reservar
            </Button>
            <Button
              variant="outline"
              className="font-montserrat font-semibold border-2 transform-gpu transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/25 will-change-transform"
              onClick={handleQRClick}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Generar QR
            </Button>
          </div>

          <button
            className={`md:hidden ${isScrolled || isMobileMenuOpen ? "text-black" : "text-white"}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in ">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block py-3 font-inter font-medium transition duration-200 ease-out transform-gpu ${
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : isScrolled || isMobileMenuOpen
                    ? "text-black hover:text-primary"
                    : "text-white hover:text-primary"
                } hover:-translate-y-1 hover:scale-105 will-change-transform`}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-white font-montserrat font-semibold shadow-lg transform-gpu transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary/30 will-change-transform"
              onClick={handleReserveClick}
            >
              Reservar
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2 font-montserrat font-semibold border-2 transform-gpu transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/25 will-change-transform"
              onClick={handleQRClick}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Generar QR
            </Button>
          </div>
        )}
      </div>
      <QRModal
        isOpen={isQRModalOpen}
        onClose={closeQRModal}
      />
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
