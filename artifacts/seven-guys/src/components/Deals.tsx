import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBranch } from "@/context/BranchContext";

const deals = [
  {
    id: 1,
    name: "Single Guy",
    items: ["1 Fillet Crunch Burger", "1 Drink", "Regular Fries"],
    price: "470",
    color: "bg-primary",
    textColor: "text-white"
  },
  {
    id: 2,
    name: "2 Guys",
    items: ["2 Fillet Crunch Burgers", "2 Drinks", "1 Regular Fries"],
    price: "850",
    color: "bg-secondary",
    textColor: "text-primary"
  },
  {
    id: 3,
    name: "Single Guy Plus",
    items: ["1 Zinger Burger", "1 Drink", "1 Regular Fries"],
    price: "580",
    color: "bg-primary",
    textColor: "text-white"
  },
  {
    id: 4,
    name: "2 Guys Plus",
    items: ["2 Zinger Burgers", "2 Drinks", "1 Regular Fries"],
    price: "1050",
    color: "bg-[#0A2612]",
    textColor: "text-secondary"
  }
];

export function Deals() {
  const { openOrderModal } = useBranch();
  return (
    <section id="deals" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4"
          >
            DEALS THAT <span className="text-secondary">HIT DIFFERENT</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium combos crafted for maximum value and uncompromising taste. Perfect for solo missions or squad meetups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`${deal.color} ${deal.textColor} rounded-2xl p-8 shadow-xl flex flex-col relative overflow-hidden group`}
            >
              {/* Decorative shape */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Deal {deal.id}</div>
              <h3 className="text-2xl font-heading font-bold mb-6">{deal.name}</h3>
              
              <ul className="flex-1 space-y-3 mb-8">
                {deal.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-medium">
                    <span className="mt-1 opacity-70">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <div className="text-4xl font-heading font-black mb-6">
                  <span className="text-lg align-top mr-1">Rs.</span>
                  {deal.price}
                </div>
                <Button
                  variant={deal.color === 'bg-secondary' ? 'default' : 'white'}
                  className="w-full text-lg shadow-lg"
                  onClick={() =>
                    openOrderModal(
                      `Hi! I'd like to order Deal ${deal.id} — ${deal.name} (Rs. ${deal.price})`
                    )
                  }
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
