import { motion } from "framer-motion";
import {
  UtensilsCrossed, Tag, MapPin, Globe, Star,
  ShoppingBag, Images, Clock, FolderOpen, Truck,
} from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { useAdminNav } from "../context/AdminNavContext";

const colorMap = {
  green:  { icon: "bg-emerald-100 text-emerald-700",  border: "border-emerald-100" },
  gold:   { icon: "bg-amber-100   text-amber-700",    border: "border-amber-100"   },
  blue:   { icon: "bg-sky-100     text-sky-700",      border: "border-sky-100"     },
  purple: { icon: "bg-violet-100  text-violet-700",   border: "border-violet-100"  },
  rose:   { icon: "bg-rose-100    text-rose-700",      border: "border-rose-100"   },
};

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as const } },
};

const ALL_MODULES = [
  { key:"menu",       label:"Menu Manager",       desc:"Add, edit, and reorder menu items per category.", icon:"🍕" },
  { key:"categories", label:"Category Manager",   desc:"Add, rename, and reorder menu tabs.",             icon:"📂" },
  { key:"deals",      label:"Deals & Offers",      desc:"Create and schedule promotional deals.",          icon:"🏷️" },
  { key:"branches",   label:"Branch Manager",      desc:"Manage branch details, maps, and photos.",        icon:"📍" },
  { key:"hours",      label:"Business Hours",      desc:"Set open/close times and closure notices.",       icon:"🕐" },
  { key:"gallery",    label:"Gallery Manager",     desc:"Upload and curate website photos.",               icon:"🖼️" },
  { key:"reviews",    label:"Reviews Manager",     desc:"Moderate and feature customer reviews.",          icon:"⭐" },
  { key:"orders",     label:"Orders",              desc:"Track WhatsApp orders (integration coming).",     icon:"📦" },
  { key:"contact",    label:"Contact Information", desc:"Phone, WhatsApp, email, and address.",            icon:"📞" },
  { key:"social",     label:"Social Media",        desc:"Facebook, Instagram, TikTok, Google Maps.",      icon:"🔗" },
  { key:"seo",        label:"SEO Settings",        desc:"Title, meta description, keywords, OG image.",   icon:"🌐" },
  { key:"delivery",   label:"Delivery Settings",   desc:"Availability, charges, and delivery areas.",     icon:"🚗" },
  { key:"homepage",   label:"Homepage Content",    desc:"Hero text, CTA buttons, and banner images.",     icon:"🏠" },
  { key:"footer",     label:"Footer Settings",     desc:"Brand description, copyright, designer credit.", icon:"📄" },
  { key:"backup",     label:"Backup & Restore",    desc:"Export or import all CMS data as JSON.",         icon:"💾" },
  { key:"profile",    label:"Admin Profile",       desc:"Account info and password management.",          icon:"👤" },
];

export function DashboardHome() {
  const { navigate: onNavigate } = useAdminNav();
  const { menu, categories, deals, branches, reviews, gallery, hours } = useCMS();

  const totalItems   = Object.values(menu).reduce((s, items) => s + items.length, 0);
  const activeDeals  = deals.filter(d => d.enabled).length;
  const visibleRevs  = reviews.filter(r => r.visible).length;
  const isClosed     = hours.holidayClosed || hours.temporaryClosed;

  const STATS = [
    { icon:<UtensilsCrossed size={20}/>, label:"Total Menu Items",   value:String(totalItems),           sub:"Across all categories",   color:"green" as const, trend:categories.length+" categories" },
    { icon:<FolderOpen size={20}/>,      label:"Categories",         value:String(categories.length),    sub:"Active menu tabs",        color:"blue"  as const },
    { icon:<Tag size={20}/>,             label:"Active Deals",        value:String(activeDeals),          sub:`${deals.length} total deals`, color:"gold" as const },
    { icon:<MapPin size={20}/>,          label:"Branches",            value:String(branches.length),      sub:"Active locations",        color:"blue"  as const },
    { icon:<Star size={20}/>,            label:"Visible Reviews",     value:String(visibleRevs),          sub:`${reviews.length} total collected`, color:"gold" as const, trend:"4.9 avg" },
    { icon:<Images size={20}/>,          label:"Gallery Photos",      value:gallery.length > 0 ? String(gallery.length) : "Default", sub:"Published on website", color:"purple" as const },
    { icon:<ShoppingBag size={20}/>,     label:"WhatsApp Orders",     value:"—",                          sub:"Integration coming soon", color:"purple" as const },
    { icon:<Clock size={20}/>,           label:"Business Status",     value:isClosed ? "Closed" : "Open", sub:`${hours.openTime} – ${hours.closeTime}`, color:isClosed ? "rose" as const : "green" as const, trend:isClosed ? "⚠ Closed" : "✓ Online" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back — here's a live snapshot of Seven Guys CMS.</p>
      </div>

      {/* Status banner */}
      <div className="bg-[#0A2612] rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Website</p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${isClosed ? "bg-red-400" : "bg-emerald-400"}`} />
            <span className="font-heading font-bold text-white text-lg">
              {isClosed ? "Currently Closed" : "All Systems Operational"}
            </span>
          </div>
          {isClosed && hours.note && <p className="text-white/50 text-xs mt-1 ml-4">{hours.note}</p>}
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-white/40 text-xs">Menu Items</p>
            <p className="text-secondary font-bold font-heading text-sm">{totalItems} Items</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-white/40 text-xs">Branches</p>
            <p className="text-secondary font-bold font-heading text-sm">{branches.length} Active</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-white/40 text-xs">Deals Live</p>
            <p className="text-secondary font-bold font-heading text-sm">{activeDeals} Deals</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(card => {
          const palette = colorMap[card.color];
          return (
            <motion.div key={card.label} variants={cardVariants}
              className={`bg-white rounded-2xl border ${palette.border} p-5 shadow-sm hover:shadow-md transition-shadow duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${palette.icon} flex items-center justify-center shrink-0`}>{card.icon}</div>
                {card.trend && <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{card.trend}</span>}
              </div>
              <p className="font-heading font-extrabold text-2xl text-[#0A2612] leading-none mb-1">{card.value}</p>
              <p className="text-xs font-semibold text-[#0A2612]/70 mb-0.5">{card.label}</p>
              <p className="text-xs text-muted-foreground leading-snug">{card.sub}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* All modules */}
      <div>
        <h2 className="font-heading font-bold text-base text-[#0A2612] mb-3">Management Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ALL_MODULES.map(mod => (
            <button key={mod.key} onClick={() => onNavigate?.(mod.key)}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 text-left hover:shadow-md hover:border-[#0A2612]/20 transition-all duration-200 group">
              <span className="text-xl shrink-0 mt-0.5">{mod.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0A2612] group-hover:text-[#0d3318]">{mod.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{mod.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
