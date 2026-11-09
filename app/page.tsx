import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { homeFaqs, faqPageSchema } from "@/data/faqs";

export default function Home() {
  return (
    <main className="min-h-screen bg-marfil text-texto selection:bg-arena/50 selection:text-noche">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(homeFaqs)) }}
      />
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <Services />
      <Process />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
