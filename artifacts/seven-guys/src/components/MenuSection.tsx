import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import menuPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.25_PM_(1)_1784372614314.jpeg";
import menuBurgersImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.26_PM_1784372608349.jpeg";

const categories = ["Pizza", "Burgers", "Sides", "Wings", "Drinks"];

type MenuItem = {
  name: string;
  price: string;
  desc?: string;
};

const menuData: Record<string, MenuItem[]> = {
  Pizza: [
    { name: "Double Beast", price: "L: 1399 | M: 650", desc: "Loaded with all meats and extra cheese" },
    { name: "Detroit Fajita", price: "L: 1399 | M: 650", desc: "Chicken Fajita, jalapeño sauce" },
    { name: "Malai Boti", price: "L: 1399 | M: 650", desc: "Creamy sauce, BBQ Malai Boti" },
    { name: "Tandoori BBQ", price: "L: 1399 | M: 650", desc: "Kebab bites, Chicken Tikka" },
    { name: "Hot Peri Peri", price: "L: 1399 | M: 650", desc: "Hot peri peri sauce, spicy chicken" },
    { name: "Detroit Tikka", price: "L: 1399 | M: 650", desc: "Classic tikka flavors with Detroit crust" },
  ],
  Burgers: [
    { name: "Super Zinger Burger", price: "460" },
    { name: "Double Crunch Burger", price: "399" },
    { name: "Chicken Chapli Burger", price: "360" },
    { name: "Fillet Crunch Burger", price: "300" },
  ],
  Sides: [
    { name: "Loaded Fries", price: "600" },
    { name: "Foot Long Fries", price: "680" },
    { name: "Chicken Nuggets (6pcs)", price: "399" },
    { name: "Plain Fries", price: "250" },
    { name: "Regular Fries", price: "150" },
  ],
  Wings: [
    { name: "Wings Bucket (10pcs)", price: "680", desc: "Thai Sweet, Peri Peri, or Plain Hot" },
    { name: "Oven Baked Wings (6pcs)", price: "420" },
    { name: "Garlic Mayo Wings (6pcs)", price: "420" },
    { name: "Spicy Mayo Wings (6pcs)", price: "420" },
  ],
  Drinks: [
    { name: "Drink 1.5 ltr", price: "220" },
    { name: "NR 345ml", price: "80" },
    { name: "Water small", price: "70" },
    { name: "Extra Dips", price: "70", desc: "Peri Peri, Detroit Special, Malai, Chipotle" },
  ]
};

export function MenuSection() {
  const [activeTab, setActiveTab] = useState("Pizza");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
            EXPLORE THE <span className="text-secondary">MENU</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Everything is prepared fresh to order. No compromises.
          </p>
          
          <Button onClick={() => setModalOpen(true)} className="gap-2 mb-12" variant="outline" size="lg">
            <ZoomIn size={20} /> View Original Menu Scans
          </Button>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 gap-3 justify-start md:justify-center no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === cat 
                    ? "bg-primary text-white shadow-md scale-105" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
          {menuData[activeTab as keyof typeof menuData].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <h4 className="font-heading font-bold text-lg text-primary">{item.name}</h4>
                {item.desc && <p className="text-sm text-muted-foreground">{item.desc}</p>}
              </div>
              <div className="font-bold text-primary whitespace-nowrap pl-4">
                Rs. {item.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Image Modal */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-6xl translate-x-[-50%] translate-y-[-50%] bg-black p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 bg-primary text-white">
              <Dialog.Title className="font-heading font-bold text-xl">Full Menu</Dialog.Title>
              <Dialog.Close className="rounded-full p-2 hover:bg-white/20 transition-colors">
                <X size={24} />
              </Dialog.Close>
            </div>
            
            <div className="overflow-y-auto p-4 flex-1 bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={menuPizzaImg} alt="Pizza Menu" className="w-full h-auto rounded-lg shadow-lg" />
                <img src={menuBurgersImg} alt="Burgers & Sides Menu" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
