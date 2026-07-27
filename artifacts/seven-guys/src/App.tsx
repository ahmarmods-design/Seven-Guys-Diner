import { lazy, Suspense, useEffect } from "react";

// ── Critical path — loaded eagerly (needed on first paint) ─────────────────
import { Navbar }             from "@/components/Navbar";
import { Hero }               from "@/components/Hero";
import { Deals }              from "@/components/Deals";
import { FloatingWhatsApp, MobileStickyOrder } from "@/components/FloatingWhatsApp";
import { BranchPickerModal }  from "@/components/BranchPickerModal";
import { BranchProvider }     from "@/context/BranchContext";
import { CartProvider }       from "@/context/CartContext";
import { CartDrawer }         from "@/components/CartDrawer";

// ── Below-the-fold — code-split and lazy-loaded ────────────────────────────
const PizzaSection    = lazy(() => import("@/components/PizzaSection").then(m    => ({ default: m.PizzaSection    })));
const BurgerSection   = lazy(() => import("@/components/BurgerSection").then(m   => ({ default: m.BurgerSection   })));
const FriesAndWings   = lazy(() => import("@/components/FriesAndWings").then(m   => ({ default: m.FriesAndWings   })));
const MenuSection     = lazy(() => import("@/components/MenuSection").then(m     => ({ default: m.MenuSection     })));
const Gallery         = lazy(() => import("@/components/Gallery").then(m         => ({ default: m.Gallery         })));
const Branches        = lazy(() => import("@/components/Branches").then(m        => ({ default: m.Branches        })));
const Reviews         = lazy(() => import("@/components/Reviews").then(m         => ({ default: m.Reviews         })));
const FAQ             = lazy(() => import("@/components/FAQ").then(m             => ({ default: m.FAQ             })));
const ContactAndFooter = lazy(() => import("@/components/ContactAndFooter").then(m => ({ default: m.ContactAndFooter })));

// Transparent fallback — no layout shift, sections animate in via whileInView
const SectionFallback = () => <div aria-hidden />;

function Head() {
  useEffect(() => {
    document.title = "Seven Guys Pizza & Burger | Detroit Pizza & Gourmet Burgers in Gujranwala";
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    setMeta("description", "Order Detroit-style square pizza and gourmet burgers in Gujranwala. 3 branches — Jugna Bazar, Civil Lines, Kings Mall. Delivery available 2PM–2AM. Call 0319-4800036.");
    setMeta("keywords", "Detroit pizza Gujranwala, pizza burger Gujranwala, Seven Guys, best pizza Pakistan");
  }, []);
  return null;
}

export default function App() {
  return (
    <CartProvider>
    <BranchProvider>
      <div className="min-h-screen bg-background font-sans selection:bg-secondary selection:text-primary pb-20 md:pb-0">
        <Head />
        <Navbar />

        <main>
          {/* Eager — visible on first paint */}
          <Hero />
          <Deals />

          {/* Lazy — below the fold */}
          <Suspense fallback={<SectionFallback />}>
            <PizzaSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <BurgerSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FriesAndWings />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <MenuSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Branches />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Reviews />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback />}>
          <ContactAndFooter />
        </Suspense>

        {/* Always-visible overlays — eager */}
        <FloatingWhatsApp />
        <MobileStickyOrder />
        <BranchPickerModal />
        <CartDrawer />
      </div>
    </BranchProvider>
    </CartProvider>
  );
}
