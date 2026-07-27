import { motion } from "framer-motion";
import { Phone, Share2, FileText, Globe, Truck, ChevronRight } from "lucide-react";
import { useAdminNav } from "../context/AdminNavContext";

interface HubSection {
  key: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  fields: string[];
}

const SECTIONS: HubSection[] = [
  {
    key: "contact",
    icon: <Phone size={20}/>,
    title: "Contact Information",
    desc: "Phone, WhatsApp, email, and business address.",
    color: "bg-emerald-100 text-emerald-700",
    fields: ["Phone Number","WhatsApp","Email","Address"],
  },
  {
    key: "social",
    icon: <Share2 size={20}/>,
    title: "Social Media",
    desc: "Facebook, Instagram, TikTok, and Google Maps links.",
    color: "bg-sky-100 text-sky-700",
    fields: ["Facebook","Instagram","TikTok","Google Maps"],
  },
  {
    key: "seo",
    icon: <Globe size={20}/>,
    title: "SEO Settings",
    desc: "Page title, meta description, keywords, and OG image.",
    color: "bg-violet-100 text-violet-700",
    fields: ["Page Title","Meta Description","Keywords","Open Graph Image"],
  },
  {
    key: "footer",
    icon: <FileText size={20}/>,
    title: "Footer Settings",
    desc: "Brand description, copyright text, and designer credit.",
    color: "bg-amber-100 text-amber-700",
    fields: ["Brand Description","Copyright","Designer Credit"],
  },
  {
    key: "delivery",
    icon: <Truck size={20}/>,
    title: "Delivery Settings",
    desc: "Delivery availability, charges, and coverage areas.",
    color: "bg-rose-100 text-rose-700",
    fields: ["On/Off Toggle","Minimum Order","Delivery Charge","Delivery Areas"],
  },
];

export function WebsiteSettings() {
  const { navigate: onNavigate } = useAdminNav();
  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Website Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">All site-wide configuration — contact, social, SEO, footer, and delivery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((s, i) => (
          <motion.button
            key={s.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => onNavigate?.(s.key)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left hover:shadow-md hover:border-[#0A2612]/20 transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-heading font-bold text-[#0A2612] text-sm">{s.title}</p>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0A2612] group-hover:translate-x-0.5 transition-all shrink-0"/>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.fields.map(f => (
                    <span key={f} className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick links note */}
      <div className="mt-6 bg-[#0A2612]/4 rounded-2xl p-4">
        <p className="text-xs text-gray-500">
          💡 Each section also has a dedicated entry in the sidebar for quick access. Changes in any section are saved independently and update the live website automatically.
        </p>
      </div>
    </div>
  );
}
