import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import loadedFriesImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.24_PM_1784372710689.jpeg";
import wingsImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.23_PM_(1)_1784372623994.jpeg";

export function FriesAndWings() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Loaded Fries Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
              LOADED <span className="text-secondary">FRIES</span>
            </h2>
            <div className="text-2xl font-bold text-primary mb-6">Rs. 600</div>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Crispy, golden fries completely smothered in our signature creamy cheese sauce, topped with grilled chicken chunks, olives, jalapeños, and bell peppers. Served hot in a premium aluminum tray. It's a meal on its own.
            </p>
            <Button size="lg" asChild>
              <a href="https://wa.me/923194800036?text=I'd like to order the Loaded Fries" target="_blank" rel="noreferrer">
                Order Loaded Fries
              </a>
            </Button>
            
            <div className="mt-8 space-y-3 pt-8 border-t border-gray-200">
              <h4 className="font-heading font-bold text-lg text-primary">Other Options</h4>
              <div className="flex justify-between text-muted-foreground"><span className="font-medium">Foot Long Fries</span> <span>Rs. 680</span></div>
              <div className="flex justify-between text-muted-foreground"><span className="font-medium">Plain Fries</span> <span>Rs. 250</span></div>
              <div className="flex justify-between text-muted-foreground"><span className="font-medium">Regular Fries</span> <span>Rs. 150</span></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={loadedFriesImg} 
                alt="Loaded Cheese Fries" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-primary font-heading font-bold text-2xl p-6 rounded-2xl shadow-xl rotate-[-5deg]">
              Cheese Pull Guaranteed
            </div>
          </motion.div>
        </div>

        {/* Wings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8">
              <img 
                src={wingsImg} 
                alt="Seven Guys Wings Bucket" 
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
            <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full mb-4">Oven Baked</div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
              SIGNATURE <span className="text-secondary">WINGS</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Tender on the inside, perfectly baked on the outside. Choose your flavor profile and get ready to get messy.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-bold text-2xl text-primary">Wings Bucket <span className="text-sm font-normal text-muted-foreground ml-2">(10pcs)</span></h3>
                <span className="font-bold text-xl text-primary">Rs. 680</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Choose your flavor:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 px-3 py-1 rounded-md text-sm font-medium">Thai Sweet Chillies</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium">Peri Peri Hot</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-md text-sm font-medium">Plain Hot</span>
              </div>
              <Button className="w-full" asChild>
                <a href="https://wa.me/923194800036?text=I'd like to order a Wings Bucket" target="_blank" rel="noreferrer">
                  Order Bucket
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-bold text-lg text-primary">Standard Portions (6pcs - Rs. 420)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center font-medium">Oven Baked</div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center font-medium">Garlic Mayo</div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center font-medium col-span-2">Spicy Mayo</div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
