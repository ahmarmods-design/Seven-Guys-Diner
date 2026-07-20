import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

import branch1Img from "@assets/WhatsApp_Image_2026-07-20_at_6.32.38_PM_1784550819503.jpeg"; // Jugna Bazar branch exterior
import branch2Img from "@assets/WhatsApp_Image_2026-07-20_at_5.57.16_PM_1784550853058.jpeg";   // Civil Lines branch exterior
import branch3Img from "@assets/WhatsApp_Image_2026-07-20_at_6.02.44_PM_1784550921230.jpeg";   // Kings Mall branch exterior

const branches = [
  {
    name: "Jugna Bazar Branch",
    address: "Jugna Bazar, Sialkot Road, Gujranwala",
    mapCode: "56R6+C9",
    mapLink: "https://plus.codes/56R6+C9",
    image: branch1Img,
  },
  {
    name: "Civil Lines Branch",
    address: "Mumtaz Market, Civil Lines, Gujranwala",
    mapCode: "55JM+6H",
    mapLink: "https://plus.codes/55JM+6H",
    image: branch2Img,
  },
  {
    name: "Kings Mall Branch",
    address: "Kings Mall, Judicial Housing Colony, Gujranwala",
    mapCode: "453Q+2R",
    mapLink: "https://plus.codes/453Q+2R",
    image: branch3Img,
  }
];

export function Branches() {
  return (
    <section id="branches" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4"
          >
            FIND <span className="text-secondary">US</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three premium locations across Gujranwala. Always serving fresh. Always open late.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={branch.image} 
                  alt={branch.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> Open Now
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">{branch.name}</h3>
                
                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="text-secondary shrink-0 mt-1" size={18} />
                    <span className="text-sm leading-relaxed">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="text-secondary shrink-0" size={18} />
                    <span className="text-sm">2:00 PM – 2:00 AM</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="text-secondary shrink-0" size={18} />
                    <span className="text-sm font-medium text-primary">0319-4800036</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={branch.mapLink} target="_blank" rel="noreferrer">
                      <Navigation size={16} className="mr-2" /> Maps
                    </a>
                  </Button>
                  <Button className="flex-1" asChild>
                    <a href="tel:03194800036">Call</a>
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
