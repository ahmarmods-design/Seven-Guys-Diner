import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Pencil, Check, X } from "lucide-react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_CATEGORIES } from "@/context/CMSContext";

const CATEGORY_ICONS: Record<string, string> = { Pizza:"🍕", Burgers:"🍔", Sides:"🍟", Wings:"🍗", Drinks:"🥤" };

export function CategoryManager() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<string[]>("categories", DEFAULT_CATEGORIES);
  const [editingIdx, setEditingIdx] = useState<number|null>(null);
  const [editVal,    setEditVal]    = useState("");
  const [newName,    setNewName]    = useState("");

  const move = (idx: number, dir: -1|1) => {
    const next = [...data];
    const tmp = next[idx]; next[idx] = next[idx+dir]; next[idx+dir] = tmp;
    setData(next);
  };

  const startEdit = (idx: number) => { setEditingIdx(idx); setEditVal(data[idx]); };
  const confirmEdit = () => {
    if (!editVal.trim() || editingIdx===null) { setEditingIdx(null); return; }
    setData(data.map((c,i) => i===editingIdx ? editVal.trim() : c));
    setEditingIdx(null);
  };

  const addCat = () => {
    if (!newName.trim() || data.includes(newName.trim())) return;
    setData([...data, newName.trim()]);
    setNewName("");
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Category Manager</h1>
        <p className="text-muted-foreground text-sm mt-1">Reorder, rename, add, or delete menu categories.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6 max-w-lg">
        {data.map((cat, idx) => (
          <div key={cat} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0">
            <span className="text-xl w-8 text-center">{CATEGORY_ICONS[cat] ?? "🍽️"}</span>

            {editingIdx === idx ? (
              <input
                autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)}
                onKeyDown={e => { if(e.key==="Enter") confirmEdit(); if(e.key==="Escape") setEditingIdx(null); }}
                className="flex-1 border border-[#0A2612]/40 rounded-lg px-2 py-1 text-sm focus:outline-none"
              />
            ) : (
              <span className="flex-1 font-semibold text-[#0A2612] text-sm">{cat}</span>
            )}

            <div className="flex items-center gap-0.5 shrink-0">
              {editingIdx === idx ? (
                <>
                  <button onClick={confirmEdit}    className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600"><Check size={14}/></button>
                  <button onClick={() => setEditingIdx(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={14}/></button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(idx)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"><Pencil size={14}/></button>
                  <button onClick={() => move(idx,-1)} disabled={idx===0} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-20"><ArrowUp size={14}/></button>
                  <button onClick={() => move(idx,1)} disabled={idx===data.length-1} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-20"><ArrowDown size={14}/></button>
                  <button onClick={() => setData(data.filter((_,i)=>i!==idx))} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-lg">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Add New Category</p>
        <div className="flex gap-2">
          <input
            value={newName} onChange={e=>setNewName(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter") addCat(); }}
            placeholder="Category name (e.g. Wraps)"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20"
          />
          <button onClick={addCat} disabled={!newName.trim()} className="px-4 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-40 flex items-center gap-1.5">
            <Plus size={15}/> Add
          </button>
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
