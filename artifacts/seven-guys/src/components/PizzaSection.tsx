import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_9.41.06_PM_1784390466550.jpeg";
import menuPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.25_PM_(1)_1784372614314.jpeg";

const pizzas = [
  {
    name: "Double Beast",
    desc: "Onion, Tomato, Black Olive, Chicken Tikka, Capsicum, Chicken Kabab, Chicken Fajita & Extra Cheese",
    image: heroPizzaImg,
    tag: "Flagship"
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
    tag: "Spicy"
  },
  {
    name: "Detroit Tikka",
    desc: "Chicken Tikka, Onion, Tomatoes, Olives, Extra Cheese, Detroit Sauce",
    image: menuPizzaImg,
  }
];

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
              Thick, airy, square crust with crispy cheese edges. Baked in authentic blue steel pans. 
              The crust is light, the toppings are heavy. Every pizza is available in Large (Rs. 1399) or Medium (Rs. 650).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative bg-[#0A2612]/5 flex items-center justify-center p-6">
                {pizza.tag && (
                  <div className="absolute top-4 right-4 bg-secondary text-primary font-bold px-3 py-1 rounded-full text-xs z-10 shadow-md">
                    {pizza.tag}
                  </div>
                )}
                <img 
                  src={pizza.image} 
                  alt={pizza.name} 
                  className={`w-full h-full ${index === 0 ? 'object-contain' : 'object-cover rounded-xl'} group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">{pizza.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-16 line-clamp-3">{pizza.desc}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg leading-none">Rs. 1399 <span className="text-xs text-muted-foreground font-normal">L</span></span>
                    <span className="font-medium text-sm text-muted-foreground">Rs. 650 <span className="text-xs">M</span></span>
                  </div>
                  <Button size="sm" asChild>
                    <a href={`https://wa.me/923194800036?text=I'd like to order a ${pizza.name} Detroit Pizza`} target="_blank" rel="noreferrer">
                      Order
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
