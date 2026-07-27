import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useCMS, DEFAULT_DEALS } from "@/context/CMSContext";

export function Deals() {
  const { addItem } = useCart();
  const { deals, ready } = useCMS();
  // If the DB is loaded but returned an empty list, fall back to the built-in
  // defaults so the section is always visible.
  const source = ready && deals.length === 0 ? DEFAULT_DEALS : deals;
  const active = source.filter(d => d.enabled);

  return (
    <section id="deals" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4"
          >
            DEALS THAT <span className="text-secondary">HIT DIFFERENT</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium combos crafted for maximum value and uncompromising taste. Perfect for solo missions or squad meetups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {active.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }}
              className={`${deal.color} ${deal.textColor} rounded-2xl p-8 shadow-xl flex flex-col relative overflow-hidden group`}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Deal</div>
              <h3 className="text-2xl font-heading font-bold mb-6">{deal.name}</h3>
              <ul className="flex-1 space-y-3 mb-8">
                {deal.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-medium">
                    <span className="mt-1 opacity-70">•</span>{item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <div className="text-4xl font-heading font-black mb-6">
                  <span className="text-lg align-top mr-1">Rs.</span>{deal.price}
                </div>
                <Button
                  variant={deal.color === "bg-secondary" ? "default" : "white"}
                  className="w-full text-lg shadow-lg"
                  onClick={() => addItem({ id: `deal|${deal.id}`, name: deal.name, variant: deal.items.join(", "), price: deal.price })}
                >
                  <ShoppingCart size={16} className="mr-2" /> Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
