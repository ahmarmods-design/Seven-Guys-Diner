import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Clock, TrendingUp, Info } from "lucide-react";

const MOCK_COLUMNS = ["Order ID", "Customer", "Items", "Total", "Branch", "Status", "Time"];

export function OrdersPage() {
  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage customer orders received via WhatsApp.</p>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3 mb-8">
        <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800">WhatsApp Orders Integration — Coming Soon</p>
          <p className="text-sm text-amber-700 mt-1 leading-relaxed">
            This panel will display all inbound orders received through the WhatsApp order flow. Once the integration is live, each order will appear here in real-time with customer details, items, and status tracking.
          </p>
        </div>
      </div>

      {/* Stats preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <ShoppingBag size={20}/>, label: "Total Orders",    value: "—",  sub: "Awaiting integration", color: "bg-violet-100 text-violet-700" },
          { icon: <Clock size={20}/>,       label: "Pending",         value: "—",  sub: "Orders awaiting prep",  color: "bg-amber-100 text-amber-700"   },
          { icon: <TrendingUp size={20}/>,  label: "Revenue Today",   value: "—",  sub: "Analytics coming soon", color: "bg-emerald-100 text-emerald-700"},
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>{s.icon}</div>
            <p className="font-heading font-extrabold text-2xl text-[#0A2612] mb-0.5">{s.value}</p>
            <p className="text-xs font-semibold text-[#0A2612]/70">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Orders table skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="font-heading font-bold text-[#0A2612]">Recent Orders</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full font-semibold">Awaiting Integration</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {MOCK_COLUMNS.map(col => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  {MOCK_COLUMNS.map(col => (
                    <td key={col} className="px-4 py-3.5">
                      <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" style={{ width: col === "Items" ? "120px" : "80px" }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-8 text-center">
          <MessageCircle size={36} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-400">No orders yet</p>
          <p className="text-xs text-gray-300 mt-1">Orders received via WhatsApp will appear here automatically.</p>
        </div>
      </div>
    </div>
  );
}
