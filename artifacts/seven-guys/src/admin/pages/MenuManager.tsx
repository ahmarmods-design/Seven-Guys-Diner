import { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { ImageUploader } from "../components/ImageUploader";
import { DEFAULT_MENU, DEFAULT_CATEGORIES, type CMSMenuData, type CMSMenuItem, type CMSPizzaItem, type CMSSimpleItem } from "@/context/CMSContext";

const CATEGORY_ICONS: Record<string, string> = { Pizza:"🍕", Burgers:"🍔", Sides:"🍟", Wings:"🍗", Drinks:"🥤" };

function newId() { return `item-${Date.now()}-${Math.random().toString(36).slice(2,7)}`; }

function ItemModal({ item, onSave, onClose }: {
  item: CMSMenuItem | null;
  onSave: (item: CMSMenuItem) => void;
  onClose: () => void;
}) {
  const isNew = item === null;
  const [kind, setKind] = useState<"pizza"|"simple">(item?.kind ?? "simple");
  const base = item ?? { id: newId(), kind: "simple" as const, name: "", price: 0, available: true, featured: false };

  const [name,         setName]         = useState(base.name);
  const [desc,         setDesc]         = useState(base.desc ?? "");
  const [available,    setAvailable]    = useState(base.available);
  const [featured,     setFeatured]     = useState(base.featured);
  const [imageUrl,     setImageUrl]     = useState(base.imageUrl ?? "");
  const [price,        setPrice]        = useState("price" in base ? String(base.price)      : "0");
  const [discountPrice,setDiscountPrice]= useState("discountPrice" in base && base.discountPrice ? String(base.discountPrice) : "");
  const [emoji,        setEmoji]        = useState("emoji" in base ? (base.emoji ?? "") : "");
  const [priceMed,     setPriceMed]     = useState("priceMed" in base ? String(base.priceMed) : "0");
  const [priceLg,      setPriceLg]      = useState("priceLg"  in base ? String(base.priceLg)  : "0");

  const handleSave = () => {
    if (!name.trim()) return;
    if (kind === "pizza") {
      onSave({ id: base.id, kind:"pizza", name:name.trim(), desc:desc||undefined, priceMed:+priceMed, priceLg:+priceLg, available, featured, imageUrl:imageUrl||undefined });
    } else {
      onSave({ id: base.id, kind:"simple", name:name.trim(), desc:desc||undefined, price:+price, discountPrice:discountPrice?+discountPrice:undefined, emoji:emoji||undefined, imageUrl:imageUrl||undefined, available, featured });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-heading font-bold text-lg text-[#0A2612]">{isNew ? "Add Menu Item" : "Edit Menu Item"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
          {/* Kind toggle (only for new items) */}
          {isNew && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Item Type</label>
              <div className="flex gap-2">
                {(["simple","pizza"] as const).map(k => (
                  <button key={k} onClick={() => setKind(k)} className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-colors ${kind===k?"bg-[#0A2612] text-white border-[#0A2612]":"border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    {k==="pizza" ? "🍕 Pizza (Med/Lg)" : "🍔 Single Price"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Field label="Name *"><input className={input} value={name} onChange={e=>setName(e.target.value)} placeholder="Item name"/></Field>
          <Field label="Description"><textarea className={`${input} h-20 resize-none`} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description"/></Field>

          {kind === "simple" ? (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price (Rs.)"><input className={input} type="number" value={price} onChange={e=>setPrice(e.target.value)}/></Field>
              <Field label="Discount Price"><input className={input} type="number" value={discountPrice} onChange={e=>setDiscountPrice(e.target.value)} placeholder="Optional"/></Field>
              <Field label="Emoji"><input className={input} value={emoji} onChange={e=>setEmoji(e.target.value)} placeholder="🍗"/></Field>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Medium Price (Rs.)"><input className={input} type="number" value={priceMed} onChange={e=>setPriceMed(e.target.value)}/></Field>
              <Field label="Large Price (Rs.)"><input className={input} type="number" value={priceLg} onChange={e=>setPriceLg(e.target.value)}/></Field>
            </div>
          )}

          <ImageUploader label="Product Image" value={imageUrl} onChange={setImageUrl}/>

          <div className="flex gap-4 pt-1">
            <Toggle label="Available" value={available} onChange={setAvailable}/>
            <Toggle label="Featured" value={featured} onChange={setFeatured}/>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={!name.trim()} className="flex-1 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-40">
            {isNew ? "Add Item" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

const input = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>{children}</div>;
}
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v:boolean)=>void }) {
  return (
    <button onClick={() => onChange(!value)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${value?"bg-emerald-50 border-emerald-200 text-emerald-700":"border-gray-200 text-gray-500"}`}>
      {value ? <Eye size={14}/> : <EyeOff size={14}/>} {label}
    </button>
  );
}

export function MenuManager() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSMenuData>("menu", DEFAULT_MENU);
  const [expanded, setExpanded] = useState<string | null>("Pizza");
  const [editing, setEditing] = useState<{ cat: string; item: CMSMenuItem | null } | null>(null);

  const removeItem = (cat: string, id: string) =>
    setData({ ...data, [cat]: data[cat].filter(i => i.id !== id) });

  const upsertItem = (cat: string, updated: CMSMenuItem) => {
    const existing = data[cat] ?? [];
    const idx = existing.findIndex(i => i.id === updated.id);
    setData({ ...data, [cat]: idx >= 0 ? existing.map(i => i.id===updated.id ? updated : i) : [...existing, updated] });
    setEditing(null);
  };

  const toggleAvail = (cat: string, id: string) =>
    setData({ ...data, [cat]: data[cat].map(i => i.id===id ? { ...i, available: !i.available } : i) });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Menu Manager</h1>
        <p className="text-muted-foreground text-sm mt-1">Add, edit, and manage all menu items by category.</p>
      </div>

      <div className="space-y-3">
        {DEFAULT_CATEGORIES.map(cat => {
          const items = data[cat] ?? [];
          const open  = expanded === cat;
          return (
            <div key={cat} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button onClick={() => setExpanded(open ? null : cat)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{CATEGORY_ICONS[cat] ?? "🍽️"}</span>
                  <span className="font-heading font-bold text-[#0A2612]">{cat}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{items.length} items</span>
                </div>
                {open ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
              </button>

              {open && (
                <div className="border-t border-gray-100">
                  {items.map(item => (
                    <div key={item.id} className={`flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0 ${!item.available?"opacity-50":""}`}>
                      {item.imageUrl
                        ? <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover shrink-0"/>
                        : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl shrink-0">{(item as CMSSimpleItem).emoji ?? "🍽️"}</div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0A2612] truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          {item.kind==="pizza" ? `Rs. ${(item as CMSPizzaItem).priceMed} / ${(item as CMSPizzaItem).priceLg}` : `Rs. ${(item as CMSSimpleItem).price}`}
                          {item.featured && <span className="ml-2 text-amber-500">★ Featured</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => toggleAvail(cat, item.id)} title={item.available?"Mark unavailable":"Mark available"} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">{item.available ? <Eye size={15}/> : <EyeOff size={15}/>}</button>
                        <button onClick={() => setEditing({ cat, item })} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"><Pencil size={15}/></button>
                        <button onClick={() => removeItem(cat, item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={15}/></button>
                      </div>
                    </div>
                  ))}
                  <div className="px-5 py-3">
                    <button onClick={() => setEditing({ cat, item: null })} className="flex items-center gap-2 text-sm font-semibold text-[#0A2612] hover:text-[#0d3318] transition-colors">
                      <Plus size={16}/> Add item to {cat}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editing && (
        <ItemModal
          item={editing.item}
          onSave={item => upsertItem(editing.cat, item)}
          onClose={() => setEditing(null)}
        />
      )}

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
