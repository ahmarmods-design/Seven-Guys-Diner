import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Deals } from "@/components/Deals";
import { PizzaSection } from "@/components/PizzaSection";
import { BurgerSection } from "@/components/BurgerSection";
import { FriesAndWings } from "@/components/FriesAndWings";
import { MenuSection } from "@/components/MenuSection";
import { Gallery } from "@/components/Gallery";
import { Branches } from "@/components/Branches";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { ContactAndFooter } from "@/components/ContactAndFooter";
import { FloatingWhatsApp, MobileStickyOrder } from "@/components/FloatingWhatsApp";

function Head() {
  useEffect(() => {
    document.title = "Seven Guys Pizza & Burger | Detroit Pizza & Gourmet Burgers in Gujranwala";
    
    // Update meta tags dynamically if not set in index.html
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta("description", "Order Detroit-style square pizza and gourmet burgers in Gujranwala. 3 branches — Jugna Bazar, Civil Lines, Kings Mall. Delivery available 2PM–2AM. Call 0319-4800036.");
    setMeta("keywords", "Detroit pizza Gujranwala, pizza burger Gujranwala, Seven Guys, best pizza Pakistan");
  }, []);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <Head />
      <Navbar />
      
      <main>
        <Hero />
        <Deals />
        <PizzaSection />
        <BurgerSection />
        <FriesAndWings />
        <MenuSection />
        <Gallery />
        <Branches />
        <Reviews />
        <FAQ />
      </main>

      <ContactAndFooter />
      <FloatingWhatsApp />
      <MobileStickyOrder />
    </div>
  );
}
