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
