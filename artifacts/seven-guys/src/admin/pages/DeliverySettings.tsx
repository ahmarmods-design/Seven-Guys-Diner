import { useState } from "react";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_DELIVERY, type CMSDeliverySettings, type CMSDeliveryArea } from "@/context/CMSContext";

function newId() { return `area-${Date.now()}`; }
const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";
function Field({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>{children}{note && <p className="text-xs text-gray-400 mt-1">{note}</p>}</div>;
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className={`flex items-center gap-3 p-4 rounded-xl border w-full text-left transition-all ${value ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-100"}`}>
      <div className={`w-10 h-6 rounded-full relative transition-all duration-200 ${value ? "bg-emerald-500" : "bg-gray-200"}`}>
        <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200" style={{ left: value ? "calc(100% - 22px)" : "2px" }} />
      </div>
      <span className={`font-semibold text-sm ${value ? "text-emerald-700" : "text-gray-500"}`}>{label}</span>
    </button>
  );
}

export function DeliverySettings() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSDeliverySettings>("delivery", DEFAULT_DELIVERY);
  const u = (patch: Partial<CMSDeliverySettings>) => setData({ ...data, ...patch });
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaCharge, setNewAreaCharge] = useState("0");

  const addArea = () => {
    if (!newAreaName.trim()) return;
    u({ areas: [...data.areas, { id: newId(), name: newAreaName.trim(), charge: +newAreaCharge, available: true }] });
    setNewAreaName(""); setNewAreaCharge("0");
  };
  const updateArea = (id: string, patch: Partial<CMSDeliveryArea>) =>
    u({ areas: data.areas.map(a => a.id === id ? { ...a, ...patch } : a) });
  const removeArea = (id: string) => u({ areas: data.areas.filter(a => a.id !== id) });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Delivery Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure delivery availability, charges, and coverage areas.</p>
      </div>

      {/* Main toggle */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
        <Toggle label={data.available ? "Delivery is Available" : "Delivery is Unavailable"} value={data.available} onChange={v => u({ available: v })}/>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4 space-y-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-50 pb-3">Pricing & Timing</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Minimum Order (Rs.)" note="Orders below this amount won't be accepted.">
            <input type="number" className={inp} value={data.minimumOrder} onChange={e => u({ minimumOrder: +e.target.value })}/>
          </Field>
          <Field label="Delivery Charge (Rs.)" note="Standard delivery fee per order.">
            <input type="number" className={inp} value={data.deliveryCharge} onChange={e => u({ deliveryCharge: +e.target.value })}/>
          </Field>
          <Field label="Free Delivery Above (Rs.)" note="Set to 0 to disable free delivery.">
            <input type="number" className={inp} value={data.freeDeliveryAbove} onChange={e => u({ freeDeliveryAbove: +e.target.value })}/>
          </Field>
          <Field label="Estimated Time" note='e.g. "30–45 minutes"'>
            <input className={inp} value={data.estimatedTime} onChange={e => u({ estimatedTime: e.target.value })} placeholder="30–45 minutes"/>
          </Field>
        </div>
        <Field label="Special Note" note="Shown to customers on the website (optional).">
          <input className={inp} value={data.note} onChange={e => u({ note: e.target.value })} placeholder="Free delivery on orders above Rs. 800"/>
        </Field>
      </div>

      {/* Delivery areas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-50 pb-3 mb-4">Delivery Areas</p>
        <div className="space-y-2 mb-4">
          {data.areas.map(area => (
            <div key={area.id} className={`flex items-center gap-3 py-3 px-4 rounded-xl border transition-opacity ${!area.available ? "opacity-50 bg-gray-50 border-gray-100" : "bg-white border-gray-100"}`}>
              <input value={area.name} onChange={e => updateArea(area.id, { name: e.target.value })}
                className="flex-1 text-sm font-semibold text-[#0A2612] bg-transparent focus:outline-none border-b border-dashed border-gray-200 focus:border-[#0A2612]"/>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs text-gray-400">Rs.</span>
                <input type="number" value={area.charge} onChange={e => updateArea(area.id, { charge: +e.target.value })}
                  className="w-16 text-sm text-right font-bold text-[#0A2612] bg-transparent focus:outline-none"/>
              </div>
              <button onClick={() => updateArea(area.id, { available: !area.available })} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                {area.available ? <Eye size={14}/> : <EyeOff size={14}/>}
              </button>
              <button onClick={() => removeArea(area.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
            </div>
          ))}
          {data.areas.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No delivery areas yet.</p>}
        </div>
        <div className="flex gap-2 pt-2 border-t border-gray-50">
          <input value={newAreaName} onChange={e => setNewAreaName(e.target.value)} onKeyDown={e => { if(e.key==="Enter") addArea(); }}
            placeholder="Area name (e.g. Satellite Town)" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20"/>
          <input type="number" value={newAreaCharge} onChange={e => setNewAreaCharge(e.target.value)}
            className="w-20 border border-gray-200 rounded-xl px-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20" placeholder="0"/>
          <button onClick={addArea} disabled={!newAreaName.trim()} className="px-4 py-2 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-40 flex items-center gap-1.5">
            <Plus size={14}/> Add
          </button>
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
