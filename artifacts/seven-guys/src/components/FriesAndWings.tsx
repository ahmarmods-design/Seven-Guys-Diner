import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import loadedFriesImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.24_PM_1784372710689.webp";
import footLongFriesImg from "@assets/foot_long_fries_1785179282835.webp";
import plainFriesImg from "@assets/plain_fries_1785179299440.webp";
import wingsImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.23_PM_(1)_1784372623994.webp";
import nuggetsImg from "@assets/chicken_nuggets_1785176425168.webp";
import { useCart } from "@/context/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

const FRIES_OPTIONS = [
  { label: "Loaded Fries",    price: 600 },
  { label: "Foot Long Fries", price: 680 },
  { label: "Plain Fries",     price: 250 },
  { label: "Regular Fries",   price: 150 },
] as const;

type FriesOption = (typeof FRIES_OPTIONS)[number];

const WINGS_SIZES = [
  { label: "Standard", desc: "6 pcs", price: 420 },
  { label: "Bucket",   desc: "10 pcs", price: 680 },
] as const;

type WingsSize = (typeof WINGS_SIZES)[number];

const WINGS_FLAVORS = [
  { label: "Thai Sweet Chillies", color: "gray"   },
  { label: "Peri Peri Hot",       color: "red"    },
  { label: "Plain Hot",           color: "orange" },
] as const;

type WingsFlavor = (typeof WINGS_FLAVORS)[number];

export function FriesAndWings() {
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  // Fries option — default to Loaded Fries (Rs. 600)
  const [friesOption, setFriesOption] = useState<FriesOption>(FRIES_OPTIONS[0]);

  // Derive the correct fries image from the selected option
  const friesImg =
    friesOption.label === "Foot Long Fries" ? footLongFriesImg :
    friesOption.label === "Plain Fries" || friesOption.label === "Regular Fries" ? plainFriesImg :
    loadedFriesImg;

  // Wings size selection — default to Bucket (10pcs)
  const [wingsSize, setWingsSize] = useState<WingsSize>(WINGS_SIZES[1]);

  // Wings flavor selection — default to Thai Sweet Chillies
  const [wingsFlav, setWingsFlav] = useState<WingsFlavor>(WINGS_FLAVORS[0]);

  return (
    <section className="py-12 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* ── Loaded Fries ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
              LOADED <span className="text-secondary">FRIES</span>
            </h2>

            {/* Dynamic price */}
            <div className="font-heading font-black text-3xl text-primary mb-2 md:mb-4">
              Rs. {friesOption.price}
              <span className="text-base font-normal text-muted-foreground ml-2">
                {friesOption.label}
              </span>
            </div>

            {!isMobile && (
              <p className="text-muted-foreground text-lg mb-6 max-w-lg">
                Crispy, golden fries completely smothered in our signature creamy
                cheese sauce, topped with grilled chicken chunks, olives,
                jalapeños, and bell peppers. Served hot in a premium aluminum
                tray. It's a meal on its own.
              </p>
            )}

            {/* Fries option selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Choose your option:
              </p>
              <div
                className="grid grid-cols-2 gap-2"
                role="group"
                aria-label="Select fries option"
              >
                {FRIES_OPTIONS.map((opt) => {
                  const active = friesOption.label === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setFriesOption(opt)}
                      aria-pressed={active}
                      className={`py-2.5 px-3 rounded-xl text-sm font-bold text-left transition-all duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2612] focus-visible:ring-offset-1
                        ${active
                          ? "bg-[#0A2612] text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      <span className="block leading-tight">{opt.label}</span>
                      <span className={`text-xs ${active ? "text-white/70" : "text-muted-foreground"}`}>
                        Rs. {opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              size="lg"
              onClick={() =>
                addItem({
                  id: `fries|${friesOption.label}`,
                  name: friesOption.label,
                  variant: "Fries",
                  price: friesOption.price,
                })
              }
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={friesImg}
                alt={friesOption.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-primary font-heading font-bold text-2xl p-6 rounded-2xl shadow-xl rotate-[-5deg]">
              Cheese Pull Guaranteed
            </div>
          </motion.div>
        </div>

        {/* ── Chicken Nuggets ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-32">

          {/* Visual — left on desktop, top on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white">
              <img
                src={nuggetsImg}
                alt="Chicken Nuggets 6 pcs"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating badge — mirrors Fries badge, opposite corner */}
            <div className="absolute -bottom-6 -right-6 bg-secondary text-primary font-heading font-bold text-xl p-5 rounded-2xl shadow-xl rotate-[5deg] leading-tight">
              Hot &amp;<br />Crispy
            </div>
          </motion.div>

          {/* Text + CTA — right on desktop, bottom on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Category pill */}
            <div className="inline-block bg-secondary/25 text-primary font-bold px-4 py-2 rounded-full mb-4 text-sm">
              Sides / Chicken
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
              CHICKEN <span className="text-secondary">NUGGETS</span>
            </h2>

            {/* Price */}
            <div className="font-heading font-black text-3xl text-primary mb-2 md:mb-4">
              Rs. 399
              <span className="text-base font-normal text-muted-foreground ml-2">6 pcs</span>
            </div>

            {!isMobile && (
              <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                6 crispy golden chicken nuggets, perfectly seasoned and served hot
                with signature dips. Golden on the outside, juicy on the inside —
                the perfect shareable snack.
              </p>
            )}

            <Button
              size="lg"
              onClick={() =>
                addItem({
                  id: "wings|Nuggets|6pcs",
                  name: "Chicken Nuggets (6 pcs)",
                  variant: "6 pcs",
                  price: 399,
                })
              }
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* ── Wings ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-4 md:p-8">
              <img
                src={wingsImg}
                alt="Seven Guys Wings"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full mb-4">
              Oven Baked
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
              SIGNATURE <span className="text-secondary">WINGS</span>
            </h2>
            {!isMobile && (
              <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                Tender on the inside, perfectly baked on the outside. Choose your
                size and flavor profile — then get ready to get messy.
              </p>
            )}

            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-4 md:mb-8">
              <h3 className="font-heading font-bold text-2xl text-primary mb-4">
                Wings
              </h3>

              {/* Size toggle pills */}
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Choose your size:
              </p>
              <div
                className="flex gap-3 mb-5"
                role="group"
                aria-label="Select wings size"
              >
                {WINGS_SIZES.map((size) => {
                  const active = wingsSize.label === size.label;
                  return (
                    <button
                      key={size.label}
                      onClick={() => setWingsSize(size)}
                      aria-pressed={active}
                      className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2612] focus-visible:ring-offset-1
                        ${active
                          ? "bg-[#0A2612] text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {size.label} ({size.desc})
                    </button>
                  );
                })}
              </div>

              {/* Dynamic price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-heading font-black text-3xl text-primary">
                  Rs. {wingsSize.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {wingsSize.desc}
                </span>
              </div>

              {/* Flavor selector */}
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Choose your flavor:
              </p>
              <div
                className="flex flex-wrap gap-2 mb-6"
                role="group"
                aria-label="Select wings flavor"
              >
                {WINGS_FLAVORS.map((flav) => {
                  const active = wingsFlav.label === flav.label;
                  const inactiveColor =
                    flav.color === "red"
                      ? "bg-red-100 text-red-800 hover:bg-red-200 border border-red-100"
                      : flav.color === "orange"
                      ? "bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-100"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-100";
                  return (
                    <button
                      key={flav.label}
                      type="button"
                      onClick={() => setWingsFlav(flav)}
                      aria-pressed={active}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-150 select-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2612] focus-visible:ring-offset-1
                        ${active
                          ? "bg-[#0A2612] text-white shadow-md border border-[#0A2612]"
                          : inactiveColor
                        }`}
                    >
                      {flav.label}
                    </button>
                  );
                })}
              </div>

              <Button
                className="w-full"
                onClick={() =>
                  addItem({
                    id: `wings|${wingsSize.label}|${wingsFlav.label}`,
                    name: "Wings",
                    variant: `${wingsSize.label} (${wingsSize.desc}) · ${wingsFlav.label}`,
                    price: wingsSize.price,
                  })
                }
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
