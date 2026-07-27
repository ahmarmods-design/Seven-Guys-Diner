import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_HOURS, type CMSBusinessHours } from "@/context/CMSContext";
import { Clock, AlertTriangle, Calendar } from "lucide-react";

const inp = "border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

function ToggleSwitch({ value, onChange, label, desc, icon, danger }: {
  value: boolean; onChange: (v:boolean)=>void;
  label: string; desc?: string; icon?: React.ReactNode; danger?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${value && danger ? "bg-red-50 border-red-200" : value ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-100"}`}>
      <div className="flex items-center gap-3">
        <span className={value && danger ? "text-red-500" : value ? "text-emerald-600" : "text-gray-400"}>{icon}</span>
        <div>
          <p className="font-semibold text-sm text-[#0A2612]">{label}</p>
          {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full relative transition-all duration-200 ${value ? (danger ? "bg-red-500" : "bg-emerald-500") : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${value ? "left-5.5" : "left-0.5"}`}
          style={{ left: value ? "calc(100% - 22px)" : "2px" }}
        />
      </button>
    </div>
  );
}

export function BusinessHours() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSBusinessHours>("business_hours", DEFAULT_HOURS);
  const u = (patch: Partial<CMSBusinessHours>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  const isClosed = data.holidayClosed || data.temporaryClosed;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Business Hours</h1>
        <p className="text-muted-foreground text-sm mt-1">Set opening and closing times. Mark closed for holidays or maintenance.</p>
      </div>

      {isClosed && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center gap-3 mb-5">
          <AlertTriangle size={18} className="text-red-500 shrink-0"/>
          <p className="text-sm font-semibold text-red-700">Restaurant is currently marked as CLOSED on the website.</p>
        </div>
      )}

      {/* Hours */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <Clock size={16} className="text-[#0A2612]"/>
          <h2 className="font-heading font-bold text-[#0A2612]">Opening Hours</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Opening Time</label>
            <input type="time" className={`${inp} w-full`} value={data.openTime} onChange={e=>u({openTime:e.target.value})}/>
            <p className="text-xs text-gray-400 mt-1">Applies to all branches</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Closing Time</label>
            <input type="time" className={`${inp} w-full`} value={data.closeTime} onChange={e=>u({closeTime:e.target.value})}/>
            <p className="text-xs text-gray-400 mt-1">Use 02:00 for 2 AM next day</p>
          </div>
        </div>
        <div className="mt-5 p-3 bg-[#0A2612]/4 rounded-xl">
          <p className="text-sm font-semibold text-[#0A2612]">
            Current hours: {data.openTime.replace(/:/, ':')} – {data.closeTime.replace(/:/, ':')} daily
          </p>
        </div>
      </div>

      {/* Status toggles */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4 space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-[#0A2612]"/>
          <h2 className="font-heading font-bold text-[#0A2612]">Closure Status</h2>
        </div>
        <ToggleSwitch value={data.holidayClosed}    onChange={v=>u({holidayClosed:v})}    label="Holiday Closed"     desc="Mark as closed for public holiday"       icon={<Calendar size={18}/>}      danger/>
        <ToggleSwitch value={data.temporaryClosed}  onChange={v=>u({temporaryClosed:v})}  label="Temporarily Closed" desc="Mark as temporarily closed (maintenance)" icon={<AlertTriangle size={18}/>} danger/>
      </div>

      {/* Note */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Closure Note (optional)</label>
        <textarea
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20 resize-none h-20"
          value={data.note} onChange={e=>u({note:e.target.value})}
          placeholder="e.g. Closed for Eid — reopening Monday"
        />
        <p className="text-xs text-gray-400 mt-1">Shown as an info message on the website when closure is active.</p>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
