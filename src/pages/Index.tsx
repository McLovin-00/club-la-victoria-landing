import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <Facilities />
      <Gallery />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
