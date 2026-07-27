import { useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import heroPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.26_PM_(1)_1784372618172.webp";
import wingsImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.23_PM_(1)_1784372623994.webp";
import burgerImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.26_PM_(2)_1784372637543.webp";
import loadedFriesImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.24_PM_1784372710689.webp";
import restaurantInterior1Img from "@assets/WhatsApp_Image_2026-07-18_at_4.48.23_PM_1784372660439.webp";
import restaurantInterior2Img from "@assets/WhatsApp_Image_2026-07-18_at_4.48.23_PM_1784372723393.webp";
import exteriorSignImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.24_PM_(1)_1784372716409.webp";

const images = [
  { src: heroPizzaImg, alt: "Detroit Pizza", className: "col-span-1 row-span-2 aspect-[3/4]" },
  { src: burgerImg, alt: "Double Crunch Burger", className: "col-span-1 row-span-1 aspect-square" },
  { src: restaurantInterior1Img, alt: "Restaurant Interior", className: "col-span-1 row-span-1 aspect-[4/3]" },
  { src: wingsImg, alt: "Wings Bucket", className: "col-span-1 md:col-span-2 row-span-1 aspect-[2/1] object-contain bg-white" },
  { src: loadedFriesImg, alt: "Loaded Fries", className: "col-span-1 row-span-1 aspect-square" },
  { src: exteriorSignImg, alt: "Exterior Sign", className: "col-span-1 row-span-2 aspect-[3/4]" },
  { src: restaurantInterior2Img, alt: "Dining Area", className: "col-span-1 md:col-span-2 row-span-1 aspect-[16/9]" },
];

export function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-[#0A2612] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
          >
            THE <span className="text-secondary">VIBE</span>
          </motion.h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Step inside Gujranwala's favorite hangout spot. Good food, great aesthetics, and unforgettable energy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${img.className}`}
              onClick={() => setSelectedImg(img.src)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog.Root open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] p-4 outline-none">
            <Dialog.Close className="absolute top-4 right-4 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10">
              <X size={24} />
            </Dialog.Close>
            {selectedImg && (
              <img 
                src={selectedImg} 
                alt="Enlarged view" 
                className="w-full max-h-[85vh] object-contain" 
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
