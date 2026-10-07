import { useState, useCallback, memo, lazy, Suspense } from "react";
import SmallSpinner from "./SmallSpinner";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
const ReservationModal = lazy(() => import("./ReservationModal"));

import iconCanchaFutbol from "@/assets/actividades/icono-cancha-futbol-5-green.webp";
import iconCanchaPaddle from "@/assets/actividades/icono-cancha-paddle-green.webp";
import iconCanchaTenis from "@/assets/actividades/icono-cancha-tenis-green.webp";
import iconSalon from "@/assets/actividades/icono-salon-green.webp";

const RENTAL_SPACES = [
  {
    icon: iconCanchaFutbol,
    title: "Fútbol 5",
    description: "Césped sintético e iluminación.",
  },
  {
    icon: iconCanchaPaddle,
    title: "Pádel",
    options: ["Alfombra", "Cemento", "Cerrado (techado)"],
  },
  {
    icon: iconCanchaTenis,
    title: "Tenis",
    description: "Polvo de ladrillo.",
  },
  {
    icon: iconSalon,
    title: "Eventos",
    options: ["Salón", "Quincho con parrilla"],
  },
] as const;

const USAGE_RULES = [
  "Uso exclusivo para socios con la cuota societaria al día.",
  "Dejá cada espacio en las condiciones en que lo encontraste.",
  "Reponé los elementos que se rompan.",
  "No se permite alquilar a terceros ni usar las instalaciones con fines de lucro.",
] as const;

const Activities = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserve = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <section id="actividades" className="scroll-mt-24 bg-background py-14 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <header className="mb-8 max-w-3xl sm:mb-10">
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Un espacio para cada plan.
            </h2>
            <p className="mt-3 max-w-2xl font-inter text-base leading-relaxed text-muted-foreground sm:text-lg">
              Conocé las opciones del club. La reserva se completa en el turnero, donde vas a elegir el espacio, el día y el horario.
            </p>
          </header>

          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:gap-12">
            <div className="divide-y divide-border">
              {RENTAL_SPACES.map((space) => (
                <article
                  key={space.title}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5"
                >
                  <img
                    src={space.icon}
                    alt=""
                    className="mt-0.5 h-12 w-12 object-contain sm:h-14 sm:w-14"
                    loading="lazy"
                    width="56"
                    height="56"
                    decoding="async"
                  />
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-lg font-bold text-foreground sm:text-xl">
                      {space.title}
                    </h3>
                    {"options" in space ? (
                      <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-inter text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {space.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 font-inter text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {space.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-2xl bg-[#14532d] p-6 text-white shadow-lg shadow-green-950/10 sm:p-8">
              <h3 className="font-montserrat text-2xl font-bold leading-tight sm:text-3xl">
                Reservá tu espacio
              </h3>
              <ol className="mt-5 space-y-3 font-inter text-sm leading-relaxed text-white/90 sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white" aria-hidden="true">1</span>
                  <span>Ingresá tu DNI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white" aria-hidden="true">2</span>
                  <span>Elegí espacio, día y horario en el turnero.</span>
                </li>
              </ol>

              <Button
                onClick={handleReserve}
                className="mt-6 min-h-12 w-full bg-white font-montserrat font-bold text-[#14532d] hover:bg-green-50 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#14532d]"
              >
                Iniciar reserva
              </Button>

              <p className="mt-4 font-inter text-sm leading-relaxed text-white">
                Para reservar, necesitás ser socio y estar al día con la cuota societaria.
              </p>
              <p className="mt-3 border-t border-white/20 pt-3 font-inter text-xs leading-relaxed text-white/80 sm:text-sm">
                Después de abonar, adjuntá el comprobante en “Mis reservas” dentro de los 30 minutos.
              </p>
            </aside>
          </div>

          <section aria-labelledby="usage-rules-title" className="mt-12 border-t border-border pt-8 sm:mt-14 sm:pt-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <h3 id="usage-rules-title" className="font-montserrat text-xl font-bold text-foreground sm:text-2xl">
                Cuidado y normas de uso
              </h3>
            </div>

            <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {USAGE_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 font-inter text-sm leading-relaxed text-foreground/90 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-2.5 text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="font-inter text-sm font-semibold leading-relaxed sm:text-base">
                Si no se cumple con estas normas, se cobrará una multa.
              </p>
            </div>
            <p className="mt-4 font-inter text-sm leading-relaxed text-muted-foreground sm:text-base">
              Para casamientos o cumpleaños de quince en el Salón o el Quincho, consultá con la Secretaría.
            </p>
          </section>
        </div>
      </section>

      {isModalOpen && (
        <Suspense fallback={<SmallSpinner />}>
          <ReservationModal isOpen={isModalOpen} onClose={closeModal} />
        </Suspense>
      )}
    </>
  );
});

Activities.displayName = "Activities";

export default Activities;
