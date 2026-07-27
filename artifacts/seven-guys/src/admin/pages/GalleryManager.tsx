import { useState } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { uploadFile } from "../lib/api";
import { type CMSGalleryItem } from "@/context/CMSContext";

function newId() { return `gallery-${Date.now()}`; }
const DEFAULT_GALLERY: CMSGalleryItem[] = [];

export function GalleryManager() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSGalleryItem[]>("gallery", DEFAULT_GALLERY);
  const [editingId, setEditingId]   = useState<string|null>(null);
  const [editAlt,   setEditAlt]     = useState("");
  const [uploading, setUploading]   = useState(false);
  const [urlInput,  setUrlInput]    = useState("");

  const addByUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setData([...data, { id: newId(), url, alt: file.name.replace(/\.[^.]+$/, "") }]);
    } catch { alert("Upload failed"); }
    setUploading(false);
    e.target.value = "";
  };

  const addByUrl = () => {
    if (!urlInput.trim()) return;
    setData([...data, { id: newId(), url: urlInput.trim(), alt: "Gallery image" }]);
    setUrlInput("");
  };

  const startEdit = (item: CMSGalleryItem) => { setEditingId(item.id); setEditAlt(item.alt); };
  const confirmEdit = () => {
    if (editingId) setData(data.map(i => i.id===editingId ? { ...i, alt: editAlt } : i));
    setEditingId(null);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Gallery Manager</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload and manage photos shown in the gallery section.</p>
      </div>

      {/* Add controls */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Add Images</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className={`flex items-center gap-2 px-5 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#0A2612]/40 text-sm font-semibold text-gray-500 hover:text-[#0A2612] transition-colors ${uploading?"opacity-60 pointer-events-none":""}`}>
            <Plus size={16}/> {uploading ? "Uploading…" : "Upload Image"}
            <input type="file" accept="image/*" onChange={addByUpload} className="hidden"/>
          </label>
          <div className="flex gap-2 flex-1">
            <input type="text" placeholder="Or paste image URL…" value={urlInput} onChange={e=>setUrlInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter") addByUrl(); }}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20"/>
            <button onClick={addByUrl} disabled={!urlInput.trim()} className="px-4 py-2.5 bg-[#0A2612] text-white text-sm font-bold rounded-xl hover:bg-[#0d3318] disabled:opacity-40 flex items-center gap-1.5">
              <Plus size={15}/> Add
            </button>
          </div>
        </div>
      </div>

      {data.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🖼️</div>
          <p className="text-sm">No gallery images yet. Upload or add a URL above.</p>
          <p className="text-xs mt-1 text-gray-300">The gallery will show default photos when empty.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map(item => (
          <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-square">
            <img src={item.url} alt={item.alt} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
              {editingId === item.id ? (
                <div className="w-full flex gap-1" onClick={e=>e.stopPropagation()}>
                  <input autoFocus value={editAlt} onChange={e=>setEditAlt(e.target.value)} className="flex-1 text-xs px-2 py-1 rounded-lg bg-white/90 text-gray-800 focus:outline-none"/>
                  <button onClick={confirmEdit} className="p-1 bg-emerald-500 text-white rounded-lg"><Check size={13}/></button>
                  <button onClick={()=>setEditingId(null)} className="p-1 bg-gray-500 text-white rounded-lg"><X size={13}/></button>
                </div>
              ) : (
                <>
                  <p className="text-white text-xs text-center truncate w-full">{item.alt}</p>
                  <div className="flex gap-2">
                    <button onClick={()=>startEdit(item)} className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg"><Pencil size={13}/></button>
                    <button onClick={()=>setData(data.filter(i=>i.id!==item.id))} className="p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg"><Trash2 size={13}/></button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
