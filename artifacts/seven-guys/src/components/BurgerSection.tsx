import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import burgerImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.26_PM_(2)_1784372637543.jpeg";
import { useBranch } from "@/context/BranchContext";

const burgers = [
  { name: "Super Zinger Burger", price: "460" },
  { name: "Double Crunch Burger", price: "399", highlight: true },
  { name: "Chicken Chapli Burger", price: "360" },
  { name: "Fillet Crunch Burger", price: "300" },
];

export function BurgerSection() {
  const { openOrderModal } = useBranch();
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-secondary/30 relative">
              <img 
                src={burgerImg} 
                alt="Double Crunch Burger" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <div className="bg-secondary text-primary font-bold px-3 py-1 rounded-md inline-block mb-2 text-sm">Best Seller</div>
                  <h3 className="text-3xl font-heading font-bold">Double Crunch Burger</h3>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
              GOURMET <span className="text-secondary">BURGERS</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg">
              Stacked high, bursting with flavor, and wrapped in premium toasted buns. The kind of burgers that demand both hands and your full attention.
            </p>

            <div className="space-y-4">
              {burgers.map((burger, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-5 rounded-xl transition-colors ${burger.highlight ? 'bg-secondary text-primary' : 'bg-white/10 hover:bg-white/15'}`}
                >
                  <span className="font-heading font-bold text-xl">{burger.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xl">Rs. {burger.price}</span>
                    <Button
                      size="sm"
                      variant={burger.highlight ? "default" : "secondary"}
                      className="rounded-full px-6"
                      onClick={() =>
                        openOrderModal(
                          `Hi! I'd like to order a ${burger.name} (Rs. ${burger.price}).`
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
