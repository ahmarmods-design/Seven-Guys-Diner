import { useState } from "react";
import { Plus, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_DEALS, type CMSDeal } from "@/context/CMSContext";

const COLOR_OPTIONS = [
  { label:"Dark Green", color:"bg-[#0A2612]", textColor:"text-secondary" },
  { label:"Primary",    color:"bg-primary",   textColor:"text-white"    },
  { label:"Golden",     color:"bg-secondary", textColor:"text-primary"  },
  { label:"White",      color:"bg-white",     textColor:"text-primary"  },
] as const;

function newId() { return `deal-${Date.now()}`; }

function DealCard({ deal, onChange, onDelete }: {
  deal: CMSDeal;
  onChange: (d: CMSDeal) => void;
  onDelete: () => void;
}) {
  const [itemsText, setItemsText] = useState(deal.items.join("\n"));

  const update = (patch: Partial<CMSDeal>) => onChange({ ...deal, ...patch });

  const syncItems = (val: string) => {
    setItemsText(val);
    update({ items: val.split("\n").map(s=>s.trim()).filter(Boolean) });
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${!deal.enabled?"opacity-60":""}`}>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50 bg-gray-50/50">
        <GripVertical size={16} className="text-gray-300 shrink-0"/>
        <input
          className="flex-1 font-heading font-bold text-[#0A2612] text-base bg-transparent focus:outline-none placeholder:text-gray-300"
          value={deal.name} onChange={e=>update({ name: e.target.value })} placeholder="Deal name"
        />
        <button onClick={() => update({ enabled: !deal.enabled })} className={`p-1.5 rounded-lg transition-colors ${deal.enabled?"text-emerald-600 hover:bg-emerald-50":"text-gray-400 hover:bg-gray-100"}`}>
          {deal.enabled ? <Eye size={16}/> : <EyeOff size={16}/>}
        </button>
        <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Included Items (one per line)</label>
          <textarea
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20 resize-none h-28"
            value={itemsText} onChange={e => syncItems(e.target.value)}
            placeholder={"1 Fillet Crunch Burger\n1 Drink\nRegular Fries"}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Price (Rs.)</label>
            <input type="number" value={deal.price} onChange={e=>update({ price:+e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20"/>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Card Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map(opt => (
                <button key={opt.label} onClick={() => update({ color: opt.color, textColor: opt.textColor })}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${opt.color} ${deal.color===opt.color?"border-[#0A2612] scale-110":"border-transparent hover:scale-105"}`}
                  title={opt.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DealsManager() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSDeal[]>("deals", DEFAULT_DEALS);

  const addDeal = () => setData([...data, {
    id: newId(), name: "New Deal", items: [], price: 0, enabled: true,
    color: "bg-[#0A2612]", textColor: "text-secondary",
  }]);

  const updateDeal = (id: string, d: CMSDeal) => setData(data.map(x => x.id===id ? d : x));
  const deleteDeal = (id: string) => setData(data.filter(x => x.id !== id));

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Deals &amp; Offers</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage combo deals. Toggle visibility without deleting.</p>
        </div>
        <button onClick={addDeal} className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] transition-colors shrink-0">
          <Plus size={16}/> Add Deal
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No deals yet. Click "Add Deal" to create one.</p>
        </div>
      )}

      <div className="space-y-4">
        {data.map(deal => (
          <DealCard key={deal.id} deal={deal} onChange={d => updateDeal(deal.id, d)} onDelete={() => deleteDeal(deal.id)}/>
        ))}
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
