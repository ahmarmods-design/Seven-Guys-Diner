import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Tag,
  MapPin,
  Globe,
  TrendingUp,
  Star,
  ShoppingBag,
  Clock,
} from "lucide-react";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: "green" | "gold" | "blue" | "purple";
  trend?: string;
}

const STATS: StatCard[] = [
  {
    icon: <UtensilsCrossed size={20} />,
    label: "Total Menu Items",
    value: "32",
    sub: "Across all categories",
    color: "green",
    trend: "+4 this month",
  },
  {
    icon: <Tag size={20} />,
    label: "Active Deals",
    value: "5",
    sub: "Currently live",
    color: "gold",
  },
  {
    icon: <MapPin size={20} />,
    label: "Total Branches",
    value: "3",
    sub: "Jugna · Civil Lines · Kings Mall",
    color: "blue",
  },
  {
    icon: <Globe size={20} />,
    label: "Website Status",
    value: "Live",
    sub: "All systems operational",
    color: "green",
    trend: "✓ Online",
  },
  {
    icon: <Star size={20} />,
    label: "Customer Reviews",
    value: "48",
    sub: "Total reviews collected",
    color: "gold",
    trend: "4.8 avg rating",
  },
  {
    icon: <ShoppingBag size={20} />,
    label: "WhatsApp Orders",
    value: "—",
    sub: "Analytics coming soon",
    color: "purple",
  },
  {
    icon: <TrendingUp size={20} />,
    label: "Gallery Photos",
    value: "12",
    sub: "Published on website",
    color: "blue",
  },
  {
    icon: <Clock size={20} />,
    label: "Business Hours",
    value: "Open",
    sub: "2:00 PM – 2:00 AM daily",
    color: "green",
    trend: "All branches",
  },
];

const colorMap = {
  green:  { icon: "bg-emerald-100 text-emerald-700",  border: "border-emerald-100" },
  gold:   { icon: "bg-amber-100   text-amber-700",    border: "border-amber-100"   },
  blue:   { icon: "bg-sky-100     text-sky-700",      border: "border-sky-100"     },
  purple: { icon: "bg-violet-100  text-violet-700",   border: "border-violet-100"  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as const } },
};

export function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back — here's a snapshot of Seven Guys.
        </p>
      </div>

      {/* Status banner */}
      <div className="bg-[#0A2612] rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">
            Website
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-heading font-bold text-white text-lg">
              All Systems Operational
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-white/40 text-xs">Serving since</p>
            <p className="text-secondary font-bold font-heading text-sm">2024</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-white/40 text-xs">Branches</p>
            <p className="text-secondary font-bold font-heading text-sm">3 Active</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {STATS.map((card) => {
          const palette = colorMap[card.color];
          return (
            <motion.div
              key={card.label}
              variants={cardVariants}
              className={`bg-white rounded-2xl border ${palette.border} p-5 shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${palette.icon} flex items-center justify-center shrink-0`}>
                  {card.icon}
                </div>
                {card.trend && (
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {card.trend}
                  </span>
                )}
              </div>
              <p className="font-heading font-extrabold text-2xl text-[#0A2612] leading-none mb-1">
                {card.value}
              </p>
              <p className="text-xs font-semibold text-[#0A2612]/70 mb-1">{card.label}</p>
              <p className="text-xs text-muted-foreground leading-snug">{card.sub}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Coming soon modules */}
      <div>
        <h2 className="font-heading font-bold text-base text-[#0A2612] mb-3">
          Management Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Menu Manager",    desc: "Add, edit, and reorder menu items per category." },
            { label: "Deals & Offers",  desc: "Create and schedule promotional deals." },
            { label: "Branch Settings", desc: "Manage branch details and contact info."  },
            { label: "Business Hours",  desc: "Set open/close times per branch." },
            { label: "Gallery",         desc: "Upload and curate website photos." },
            { label: "Reviews",         desc: "Moderate and feature customer reviews." },
          ].map((mod) => (
            <div
              key={mod.label}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-start gap-3"
            >
              <span className="mt-0.5 w-2 h-2 rounded-full bg-secondary/60 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#0A2612]">{mod.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{mod.desc}</p>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
