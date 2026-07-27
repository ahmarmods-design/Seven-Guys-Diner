import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  MapPin,
  Clock,
  Images,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "./context/AdminAuthContext";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  key: string;
  implemented: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard",        key: "dashboard",     implemented: true  },
  { icon: <UtensilsCrossed size={18} />, label: "Menu Manager",     key: "menu",          implemented: false },
  { icon: <Tag size={18} />,             label: "Deals & Offers",   key: "deals",         implemented: false },
  { icon: <MapPin size={18} />,          label: "Branch Settings",  key: "branches",      implemented: false },
  { icon: <Clock size={18} />,           label: "Business Hours",   key: "hours",         implemented: false },
  { icon: <Images size={18} />,          label: "Gallery",          key: "gallery",       implemented: false },
  { icon: <Star size={18} />,            label: "Reviews",          key: "reviews",       implemented: false },
  { icon: <Settings size={18} />,        label: "Website Settings", key: "settings",      implemented: false },
];

interface AdminSidebarProps {
  activeKey: string;
  onNavigate: (key: string) => void;
}

function SidebarContent({
  activeKey,
  onNavigate,
  onClose,
}: AdminSidebarProps & { onClose?: () => void }) {
  const { logout } = useAdminAuth();

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-heading font-extrabold text-white text-lg tracking-tight">
              Seven Guys
            </span>
          </div>
          <p className="text-white/35 text-xs mt-0.5 ml-4">Admin Panel</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                if (item.implemented) {
                  onNavigate(item.key);
                  onClose?.();
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-150 group
                ${active
                  ? "bg-secondary text-[#0A2612] font-bold shadow-md shadow-secondary/20"
                  : item.implemented
                    ? "text-white/70 hover:text-white hover:bg-white/8"
                    : "text-white/25 cursor-default"
                }`}
            >
              <span className={`shrink-0 ${active ? "text-[#0A2612]" : ""}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {!item.implemented && (
                <span className="text-[10px] font-semibold bg-white/10 text-white/30 px-1.5 py-0.5 rounded-md shrink-0">
                  Soon
                </span>
              )}
              {active && <ChevronRight size={14} className="shrink-0 text-[#0A2612]/60" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 pt-2 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-all duration-150 text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
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
          <span className="font-heading font-extrabold text-white text-base tracking-tight">
            Seven Guys
          </span>
          <span className="text-white/30 text-xs ml-1">Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0A2612] border-r border-white/10 min-h-screen sticky top-0">
        <SidebarContent activeKey={activeKey} onNavigate={onNavigate} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0A2612] border-r border-white/10 lg:hidden"
            >
              <SidebarContent
                activeKey={activeKey}
                onNavigate={onNavigate}
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
