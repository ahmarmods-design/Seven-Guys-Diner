import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "./AdminSidebar";
import { DashboardHome }    from "./pages/DashboardHome";
import { MenuManager }      from "./pages/MenuManager";
import { DealsManager }     from "./pages/DealsManager";
import { CategoryManager }  from "./pages/CategoryManager";
import { BranchSettings }   from "./pages/BranchSettings";
import { BusinessHours }    from "./pages/BusinessHours";
import { GalleryManager }   from "./pages/GalleryManager";
import { ReviewsManager }   from "./pages/ReviewsManager";
import { HomepageContent }  from "./pages/HomepageContent";
import { WebsiteSettings }  from "./pages/WebsiteSettings";

type PageKey =
  | "dashboard" | "menu" | "categories" | "deals"
  | "branches"  | "hours" | "gallery" | "reviews"
  | "homepage"  | "settings";

const PAGE_REGISTRY: Record<PageKey, React.ComponentType> = {
  dashboard:  DashboardHome,
  menu:       MenuManager,
  categories: CategoryManager,
  deals:      DealsManager,
  branches:   BranchSettings,
  hours:      BusinessHours,
  gallery:    GalleryManager,
  reviews:    ReviewsManager,
  homepage:   HomepageContent,
  settings:   WebsiteSettings,
};

export function AdminLayout() {
  const [activeKey, setActiveKey] = useState<string>("dashboard");
  const PageComponent = PAGE_REGISTRY[activeKey as PageKey] ?? DashboardHome;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeKey={activeKey} onNavigate={setActiveKey} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 mt-[52px] lg:mt-0">
          <div className="hidden lg:block">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Seven Guys · Admin
            </p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
            <div className="w-8 h-8 rounded-full bg-[#0A2612] flex items-center justify-center text-secondary font-heading font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          key={activeKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] as const }}
          className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto"
        >
          <PageComponent />
        </motion.main>
      </div>
    </div>
  );
}
