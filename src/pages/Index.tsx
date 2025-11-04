import { lazy, Suspense } from "react";
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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Floating decorative shapes */}
      <div className="floating-shape floating-shape-1" />
      <div className="floating-shape floating-shape-2" />
      <div className="floating-shape floating-shape-3" />

      <Navbar />
      <Hero />
      <About />
      
      <Suspense fallback={<LoadingFallback />}>
        <Activities />
        <Facilities />
        <Merchandising />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

Index.displayName = "Index";

export default Index;
