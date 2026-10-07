import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

// Lazy load components below the fold
const Activities = lazy(() => import("@/components/Activities"));
const Facilities = lazy(() => import("@/components/Facilities"));
const Merchandising = lazy(() => import("@/components/Merchandising"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Lightweight loading fallback
const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const DeferredSection = ({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, []);

  if (!shouldLoad) {
    return (
      <div id={id} ref={placeholderRef} aria-busy="true" className={id === "actividades" ? "scroll-mt-24" : undefined}>
        <LoadingFallback />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div id={id} aria-busy="true" className={id === "actividades" ? "scroll-mt-24" : undefined}>
          <LoadingFallback />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>

      {/* Floating decorative shapes */}
      <div className="floating-shape floating-shape-1" />
      <div className="floating-shape floating-shape-2" />
      <div className="floating-shape floating-shape-3" />

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />

        <DeferredSection id="actividades">
          <Activities />
        </DeferredSection>
        <DeferredSection id="instalaciones">
          <Facilities />
        </DeferredSection>
        <DeferredSection id="merchandising">
          <Merchandising />
        </DeferredSection>
        <DeferredSection id="contacto">
          <Contact />
        </DeferredSection>
      </main>

      <DeferredSection>
        <Footer />
      </DeferredSection>
    </div>
  );
};

Index.displayName = "Index";

export default Index;
