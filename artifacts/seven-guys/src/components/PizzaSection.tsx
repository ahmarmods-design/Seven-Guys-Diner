import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_9.41.06_PM_1784390466550.webp";
import menuPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.25_PM_(1)_1784372614314.webp";
import { useCart } from "@/context/CartContext";

const PIZZA_SIZES = [
  { label: "Medium", short: "M", price: 650 },
  { label: "Large",  short: "L", price: 1399 },
] as const;

type PizzaSize = (typeof PIZZA_SIZES)[number];

const pizzas = [
  {
    name: "Double Beast",
    desc: "Onion, Tomato, Black Olive, Chicken Tikka, Capsicum, Chicken Kabab, Chicken Fajita & Extra Cheese",
    image: heroPizzaImg,
    tag: "Flagship",
  },
  {
    name: "Detroit Fajita",
    desc: "Chicken Fajita, Onions, Capsicums, Green Jalapeño Sauce",
    image: menuPizzaImg,
  },
  {
    name: "Malai Boti",
    desc: "BBQ Malai Boti Chicken, Creamy Sauce, Onion, Black Olive & Extra Cheese",
    image: menuPizzaImg,
  },
  {
    name: "Tandoori BBQ",
    desc: "Kebab Bites, Chicken Tikka, Onion, Black Olive, Tomatoes, Capsicum, Extra Cheese & Pizza Sauce",
    image: menuPizzaImg,
  },
  {
    name: "Hot Peri Peri",
    desc: "Onion, Tomatoes, Red Jalapeño, Extra Cheese, Hot Peri Peri Sauce On Top And Peri Peri Chicken",
    image: menuPizzaImg,
    tag: "Spicy",
  },
  {
    name: "Detroit Tikka",
    desc: "Chicken Tikka, Onion, Tomatoes, Olives, Extra Cheese, Detroit Sauce",
    image: menuPizzaImg,
  },
];

// ── Extracted card so each has its own size state ───────────────────────────
function PizzaCard({
  pizza,
  index,
}: {
  pizza: (typeof pizzas)[number];
  index: number;
}) {
  const { addItem } = useCart();
  // Default to Large — the "hero" price shown in marketing
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(PIZZA_SIZES[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="h-64 overflow-hidden relative bg-[#0A2612]/5 flex items-center justify-center p-6">
        {pizza.tag && (
          <div className="absolute top-4 right-4 bg-secondary text-primary font-bold px-3 py-1 rounded-full text-xs z-10 shadow-md">
            {pizza.tag}
          </div>
        )}
        <img
          src={pizza.image}
          alt={pizza.name}
          className={`w-full h-full ${index === 0 ? "object-contain" : "object-cover rounded-xl"} group-hover:scale-105 transition-transform duration-500`}
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <h3 className="text-2xl font-heading font-bold text-primary mb-2">
          {pizza.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-5 h-16 line-clamp-3">
          {pizza.desc}
        </p>

        {/* Size toggle pills */}
        <div className="flex gap-2 mb-5" role="group" aria-label="Select size">
          {PIZZA_SIZES.map((size) => {
            const active = selectedSize.label === size.label;
            return (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                aria-pressed={active}
                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2612] focus-visible:ring-offset-1
                  ${active
                    ? "bg-[#0A2612] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {size.short} — Rs. {size.price.toLocaleString()}
              </button>
            );
          })}
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-heading font-black text-2xl text-primary">
              Rs. {selectedSize.price.toLocaleString()}
            </span>
            <span className="ml-2 text-xs text-muted-foreground font-medium">
              {selectedSize.label}
            </span>
          </div>
          <Button
            size="sm"
            onClick={() =>
              addItem({
                id: `pizza|${pizza.name}|${selectedSize.label}`,
                name: `${pizza.name} Pizza`,
                variant: selectedSize.label,
                price: selectedSize.price,
              })
            }
          >
            <ShoppingCart size={14} className="mr-1.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export function PizzaSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4"
            >
              SIGNATURE <span className="text-secondary">DETROIT PIZZA</span>
            </motion.h2>
            <p className="text-muted-foreground text-lg">
              Thick, airy, square crust with crispy cheese edges. Baked in
              authentic blue steel pans. The crust is light, the toppings are
              heavy. Choose your size below — Medium (Rs. 650) or Large
              (Rs. 1399).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={pizza.name} pizza={pizza} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
