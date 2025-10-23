import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Facilities from "@/components/Facilities";
import Merchandising from "@/components/Merchandising";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
      <Activities />
      <Facilities />
      <Merchandising />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
