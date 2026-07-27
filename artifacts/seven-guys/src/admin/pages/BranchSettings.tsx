import { Plus, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { ImageUploader } from "../components/ImageUploader";
import { DEFAULT_BRANCHES, type CMSBranch } from "@/context/CMSContext";

function newId() { return `branch-${Date.now()}`; }
const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>{children}</div>;
}

function BranchCard({ branch, onChange, onDelete, expanded, onToggle }: {
  branch: CMSBranch; onChange: (b: CMSBranch) => void; onDelete: () => void;
  expanded: boolean; onToggle: () => void;
}) {
  const u = (patch: Partial<CMSBranch>) => onChange({ ...branch, ...patch });
  const [areasText, setAreasText] = useState(branch.deliveryAreas.join(", "));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0A2612]/8 flex items-center justify-center text-lg">📍</div>
          <span className="font-heading font-bold text-[#0A2612]">{branch.name || "Unnamed Branch"}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={e=>{e.stopPropagation();onDelete();}} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={15}/></button>
          {expanded ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Branch Name"><input className={inp} value={branch.name} onChange={e=>u({name:e.target.value})}/></Field>
          <Field label="Address"><input className={inp} value={branch.address} onChange={e=>u({address:e.target.value})}/></Field>
          <Field label="Phone Number"><input className={inp} value={branch.phone} onChange={e=>u({phone:e.target.value})} placeholder="0319-4800036"/></Field>
          <Field label="WhatsApp Number"><input className={inp} value={branch.whatsapp} onChange={e=>u({whatsapp:e.target.value})} placeholder="923194800036"/></Field>
          <Field label="Google Maps Link"><input className={inp} value={branch.mapLink} onChange={e=>u({mapLink:e.target.value})} placeholder="https://plus.codes/..."/></Field>
          <Field label="Map Code"><input className={inp} value={branch.mapCode} onChange={e=>u({mapCode:e.target.value})} placeholder="56R6+C9"/></Field>
          <div className="md:col-span-2">
            <Field label="Delivery Areas (comma-separated)">
              <input className={inp} value={areasText} onChange={e=>{setAreasText(e.target.value);u({deliveryAreas:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)});}}
                placeholder="Gujranwala, Satellite Town, …"/>
            </Field>
          </div>
          <div className="md:col-span-2">
            <ImageUploader label="Branch Photo" value={branch.imageUrl??""} onChange={v=>u({imageUrl:v})}/>
          </div>
        </div>
      )}
    </div>
  );
}

export function BranchSettings() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSBranch[]>("branches", DEFAULT_BRANCHES);
  const [expanded, setExpanded] = useState<string|null>(data[0]?.id ?? null);

  const addBranch = () => {
    const nb: CMSBranch = { id:newId(), name:"New Branch", address:"", phone:"", whatsapp:"", mapCode:"", mapLink:"", deliveryAreas:[] };
    setData([...data, nb]);
    setExpanded(nb.id);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Branch Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage branch details, contact numbers, and photos.</p>
        </div>
        <button onClick={addBranch} className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] transition-colors shrink-0">
          <Plus size={16}/> Add Branch
        </button>
      </div>

      <div className="space-y-3">
        {data.map(branch => (
          <BranchCard
            key={branch.id} branch={branch} expanded={expanded===branch.id}
            onToggle={() => setExpanded(expanded===branch.id ? null : branch.id)}
            onChange={b => setData(data.map(x=>x.id===branch.id?b:x))}
            onDelete={() => setData(data.filter(x=>x.id!==branch.id))}
          />
        ))}
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
