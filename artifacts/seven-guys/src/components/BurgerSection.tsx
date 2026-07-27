import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import burgerImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.26_PM_(2)_1784372637543.webp";
import superZingerImg from "@assets/fillet_crunch_burger_1785180153667.webp";
import doubleCrunchImg from "@assets/double_fillet_crunch_burger_1785180168942.webp";
import chapliImg from "@assets/broast_burger_1785180182461.webp";
import filletImg from "@assets/chicken_burger_1785180199976.webp";
import { useCart } from "@/context/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

const burgers = [
  { name: "Super Zinger Burger", price: "460" },
  { name: "Double Crunch Burger", price: "399", highlight: true },
  { name: "Chicken Chapli Burger", price: "360" },
  { name: "Fillet Crunch Burger", price: "300" },
];

const burgerImageMap: Record<string, string> = {
  "Super Zinger Burger":  superZingerImg,
  "Double Crunch Burger": doubleCrunchImg,
  "Chicken Chapli Burger": chapliImg,
  "Fillet Crunch Burger": filletImg,
};

export function BurgerSection() {
  const { addItem } = useCart();
  const isMobile = useIsMobile();
  const [selectedBurger, setSelectedBurger] = useState<string | null>(null);
  const currentBurgerImg = selectedBurger ? burgerImageMap[selectedBurger] : burgerImg;
  return (
    <section className="py-12 md:py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-secondary/30 relative">
              <img 
                src={currentBurgerImg}
                alt={selectedBurger ?? "Double Crunch Burger"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!selectedBurger && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div>
                    <div className="bg-secondary text-primary font-bold px-3 py-1 rounded-md inline-block mb-2 text-sm">Best Seller</div>
                    <h3 className="text-3xl font-heading font-bold">Double Crunch Burger</h3>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-3 md:mb-6">
              GOURMET <span className="text-secondary">BURGERS</span>
            </h2>
            {!isMobile && (
              <p className="text-white/80 text-lg mb-10 max-w-lg">
                Stacked high, bursting with flavor, and wrapped in premium toasted buns. The kind of burgers that demand both hands and your full attention.
              </p>
            )}

            <div className="space-y-2 md:space-y-4">
              {burgers.map((burger, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedBurger(burger.name)}
                  className={`flex items-center justify-between p-3 md:p-5 rounded-xl transition-colors cursor-pointer ${
                    (selectedBurger ? selectedBurger === burger.name : burger.highlight)
                      ? 'bg-secondary text-primary'
                      : 'bg-white/10 hover:bg-white/15'
                  }`}
                >
                  <span className="font-heading font-bold text-xl">{burger.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xl">Rs. {burger.price}</span>
                    <Button
                      size="sm"
                      variant={(selectedBurger ? selectedBurger === burger.name : burger.highlight) ? "default" : "secondary"}
                      className="rounded-full px-5"
                      onClick={() =>
                        addItem({
                          id: `burger|${burger.name}`,
                          name: burger.name,
                          variant: "",
                          price: parseInt(burger.price),
                        })
                      }
                    >
                      <ShoppingCart size={14} className="mr-1.5" />
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
