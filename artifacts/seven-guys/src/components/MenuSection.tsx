import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ZoomIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import menuPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.25_PM_(1)_1784372614314.webp";
import menuBurgersImg from "@assets/WhatsApp_Image_2026-07-18_at_4.48.26_PM_1784372608349.webp";
import { useCart } from "@/context/CartContext";
import { useCMS, type CMSPizzaItem, type CMSSimpleItem } from "@/context/CMSContext";

// ── Category meta (icons/labels stay static — just labels, not prices) ───────

const CATEGORY_META: Record<string, { icon: string; label: string }> = {
  Pizza:   { icon: "🍕", label: "Pizza" },
  Burgers: { icon: "🍔", label: "Burgers" },
  Sides:   { icon: "🍟", label: "Sides" },
  Wings:   { icon: "🍗", label: "Wings" },
  Drinks:  { icon: "🥤", label: "Drinks" },
};

// Legacy types retained so card components compile without changes
type PizzaItem  = { kind: "pizza";  name: string; desc?: string; priceMed: number; priceLg: number };
type SimpleItem = { kind: "simple"; name: string; desc?: string; price: number; image?: string; emoji?: string };

// ── Pizza card — has its own size-toggle state ────────────────────────────────

function PizzaCard({ item, index }: { item: PizzaItem; index: number }) {
  const { addItem } = useCart();
  const isMobile = useIsMobile();
  const [size, setSize] = useState<"Medium" | "Large">("Large");
  const price = size === "Medium" ? item.priceMed : item.priceLg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="bg-gray-50 rounded-2xl p-3 md:p-5 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-bold text-base md:text-lg text-primary leading-tight">{item.name}</h4>
          {item.desc && !isMobile && (
            <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.desc}</p>
          )}
        </div>
      </div>

      {/* Size toggle */}
      <div className="flex items-center gap-2 mb-2 md:mb-3" role="group" aria-label="Select pizza size">
        {(["Medium", "Large"] as const).map((s) => {
          const active = size === s;
          const p = s === "Medium" ? item.priceMed : item.priceLg;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={active}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                ${active
                  ? "bg-[#0A2612] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
            >
              {s === "Medium" ? "M" : "L"} · Rs. {p.toLocaleString()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-heading font-black text-lg md:text-xl text-primary">
          Rs. {price.toLocaleString()}
        </span>
        <Button
          size="sm"
          className="shrink-0"
          onClick={() =>
            addItem({
              id: `menu-pizza|${item.name}|${size}`,
              name: `${item.name} Pizza`,
              variant: size,
              price,
            })
          }
        >
          <ShoppingCart size={14} className="mr-1.5" />
          Add
        </Button>
      </div>
    </motion.div>
  );
}

// ── Simple card (burger / side / wing / drink) ────────────────────────────────

function SimpleCard({ item, category, index }: { item: SimpleItem; category: string; index: number }) {
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  const hasVisual = !!(item.image || item.emoji);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="bg-gray-50 rounded-2xl p-3 md:p-5 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200 flex items-center gap-4"
    >
      {/* Optional product visual: photo or emoji thumbnail */}
      {hasVisual && (
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl shrink-0 overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-white">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-2xl select-none" aria-hidden="true">{item.emoji}</span>
          )}
        </div>
      )}

      {/* Text block */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-lg text-primary leading-tight">{item.name}</h4>
        {item.desc && (
          <p className="hidden md:block text-xs text-muted-foreground mt-1 leading-snug">{item.desc}</p>
        )}
        <p className="font-heading font-black text-lg md:text-xl text-primary mt-1 md:mt-2">
          Rs. {item.price.toLocaleString()}
        </p>
      </div>

      <Button
        size="sm"
        className="shrink-0"
        onClick={() =>
          addItem({
            id: `menu-${category.toLowerCase()}|${item.name}`,
            name: item.name,
            variant: "",
            price: item.price,
          })
        }
      >
        <ShoppingCart size={14} className="mr-1.5" />
        Add
      </Button>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function MenuSection() {
  const { menu, categories } = useCMS();
  const [activeTab, setActiveTab] = useState("Pizza");
  const [modalOpen, setModalOpen] = useState(false);

  // Normalise CMS items into the legacy card types so cards need no changes
  const normalizePizza = (i: CMSPizzaItem): PizzaItem => ({ kind: "pizza", name: i.name, desc: i.desc, priceMed: i.priceMed, priceLg: i.priceLg });
  const normalizeSimple = (i: CMSSimpleItem): SimpleItem => ({ kind: "simple", name: i.name, desc: i.desc, price: i.price, image: i.imageUrl, emoji: i.emoji });

  const activeItems = (menu[activeTab] ?? [])
    .filter(i => i.available !== false)
    .map(i => i.kind === "pizza" ? normalizePizza(i as CMSPizzaItem) : normalizeSimple(i as CMSSimpleItem));

  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4"
          >
            EXPLORE THE <span className="text-secondary">MENU</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Everything is prepared fresh to order. No compromises.
          </p>

          <Button
            onClick={() => setModalOpen(true)}
            className="gap-2 mb-10"
            variant="outline"
            size="lg"
          >
            <ZoomIn size={20} /> View Original Menu Scans
          </Button>

          {/* Category tabs */}
          <div
            className="flex overflow-x-auto pb-2 gap-2 justify-start md:justify-center no-scrollbar"
            role="tablist"
            aria-label="Menu categories"
          >
            {categories.map((cat) => {
              const active = activeTab === cat;
              const meta   = CATEGORY_META[cat] ?? { icon: "🍽️", label: cat };
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(cat)}
                  className={`
                    relative whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm
                    transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    touch-manipulation select-none
                    ${active
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95"
                    }
                  `}
                >
                  <span aria-hidden="true">{meta.icon}</span>
                  {meta.label}
                  {active && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-full bg-primary -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated items grid — remounts on tab change via key */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto"
            role="tabpanel"
            aria-label={`${activeTab} menu`}
          >
            {activeItems.map((item, index) =>
              item.kind === "pizza" ? (
                <PizzaCard key={item.name} item={item} index={index} />
              ) : (
                <SimpleCard key={item.name} item={item} category={activeTab} index={index} />
              )
            )}
          </motion.div>
        </AnimatePresence>
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
                <img src={menuPizzaImg}   alt="Pizza Menu"          className="w-full h-auto rounded-lg shadow-lg" />
                <img src={menuBurgersImg} alt="Burgers & Sides Menu" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
