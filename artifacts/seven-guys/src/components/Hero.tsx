import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, MessageCircle } from "lucide-react";
import heroPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_9.41.06_PM_1784390466550.jpeg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden bg-[#0A2612]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[20%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 text-white"
          >
            <div className="flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-medium">Gujranwala's Top Rated</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-[1.1] text-white">
              GUJRANWALA'S <br />
              <span className="text-secondary">HOME OF</span> <br />
              DETROIT PIZZA
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
              Bold flavors, premium craft, and the kind of melted cheese you've been dreaming about. Young, energetic, and undeniably delicious.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm font-medium bg-white/5 px-4 py-2 rounded-lg">
                <Clock className="text-secondary" size={18} />
                <span>Open 2PM–2AM Daily</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium bg-white/5 px-4 py-2 rounded-lg">
                <MapPin className="text-secondary" size={18} />
                <span>Delivery All Over Gujranwala</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="text-lg bg-[#25D366] hover:bg-[#20bd5a] text-white border-none" asChild>
                <a href="https://wa.me/923194800036" target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2" /> Order on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="white" asChild>
                <a href="#menu">View Full Menu</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative flex justify-center lg:justify-end lg:-mr-12"
          >
            <div className="relative w-[90%] md:w-[80%] aspect-square rounded-full soft-glow">
              <img
                src={heroPizzaImg}
                alt="Detroit Square Pizza Loaded with Cheese"
                className="w-full h-full object-contain floating-pizza drop-shadow-2xl scale-110 relative z-10"
                style={{ filter: "brightness(1.1) contrast(1.1)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
