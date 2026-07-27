import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, UtensilsCrossed, Tag, MapPin, Clock,
  Images, Star, Settings, LogOut, Menu, X, ChevronRight,
  FolderOpen, ShoppingBag, Phone, Share2, Globe, Truck,
  FileText, Database, User,
} from "lucide-react";
import { useAdminAuth } from "./context/AdminAuthContext";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  key: string;
  dividerBefore?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard size={17}/>, label: "Dashboard",           key: "dashboard"  },

  { icon: <UtensilsCrossed size={17}/>, label: "Menu Manager",       key: "menu",       dividerBefore: true },
  { icon: <FolderOpen size={17}/>,      label: "Categories",         key: "categories" },
  { icon: <Tag size={17}/>,             label: "Deals & Offers",     key: "deals"      },

  { icon: <MapPin size={17}/>,          label: "Branch Manager",     key: "branches",   dividerBefore: true },
  { icon: <Clock size={17}/>,           label: "Business Hours",     key: "hours"      },
  { icon: <Truck size={17}/>,           label: "Delivery Settings",  key: "delivery"   },

  { icon: <Images size={17}/>,          label: "Gallery Manager",    key: "gallery",    dividerBefore: true },
  { icon: <Star size={17}/>,            label: "Reviews Manager",    key: "reviews"    },
  { icon: <ShoppingBag size={17}/>,     label: "Orders",             key: "orders"     },

  { icon: <Settings size={17}/>,        label: "Website Settings",   key: "settings",   dividerBefore: true },
  { icon: <Phone size={17}/>,           label: "Contact Information",key: "contact"    },
  { icon: <Share2 size={17}/>,          label: "Social Media",       key: "social"     },
  { icon: <Globe size={17}/>,           label: "SEO Settings",       key: "seo"        },
  { icon: <FileText size={17}/>,        label: "Footer Settings",    key: "footer"     },
  { icon: <LayoutDashboard size={17}/>, label: "Homepage Content",   key: "homepage"   },

  { icon: <Database size={17}/>,        label: "Backup & Restore",   key: "backup",     dividerBefore: true },
  { icon: <User size={17}/>,            label: "Admin Profile",      key: "profile"    },
];

interface AdminSidebarProps {
  activeKey: string;
  onNavigate: (key: string) => void;
}

function SidebarContent({ activeKey, onNavigate, onClose }: AdminSidebarProps & { onClose?: () => void }) {
  const { logout } = useAdminAuth();

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-heading font-extrabold text-white text-base tracking-tight">Seven Guys</span>
          </div>
          <p className="text-white/30 text-[11px] mt-0.5 ml-4">Admin CMS</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0">
        {NAV_ITEMS.map((item) => {
          const active = activeKey === item.key;
          return (
            <div key={item.key}>
              {item.dividerBefore && <div className="my-2 border-t border-white/8" />}
              <button
                onClick={() => { onNavigate(item.key); onClose?.(); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-150
                  ${active
                    ? "bg-secondary text-[#0A2612] font-bold shadow-md shadow-secondary/20"
                    : "text-white/65 hover:text-white hover:bg-white/8"
                  }`}
              >
                <span className={`shrink-0 ${active ? "text-[#0A2612]" : ""}`}>{item.icon}</span>
                <span className="text-[13px] font-medium flex-1 leading-none">{item.label}</span>
                {active && <ChevronRight size={13} className="shrink-0 text-[#0A2612]/60" />}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-2 border-t border-white/8">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/45 hover:text-red-400 hover:bg-red-400/10 transition-all duration-150 text-[13px] font-medium"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar({ activeKey, onNavigate }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A2612] border-b border-white/10 flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-heading font-extrabold text-white text-sm tracking-tight">Seven Guys</span>
          <span className="text-white/30 text-[11px] ml-1">Admin</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="text-white/60 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0A2612] border-r border-white/8 min-h-screen sticky top-0">
        <SidebarContent activeKey={activeKey} onNavigate={onNavigate} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside key="drawer" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-68 bg-[#0A2612] border-r border-white/8 lg:hidden overflow-y-auto">
              <SidebarContent activeKey={activeKey} onNavigate={onNavigate} onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
