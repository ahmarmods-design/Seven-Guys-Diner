import { useState } from "react";
import { Plus, Trash2, Eye, EyeOff, Star, X } from "lucide-react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_REVIEWS, type CMSReview } from "@/context/CMSContext";

function newId() { return `review-${Date.now()}`; }
const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

function AddReviewModal({ onAdd, onClose }: { onAdd: (r: CMSReview) => void; onClose: () => void }) {
  const [name, setName]   = useState("");
  const [text, setText]   = useState("");
  const [time, setTime]   = useState("Just now");
  const [rating, setRating] = useState(5);

  const submit = () => {
    if (!name.trim() || !text.trim()) return;
    onAdd({ id: newId(), name: name.trim(), text: text.trim(), time: time.trim(), rating, visible: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-heading font-bold text-lg text-[#0A2612]">Add Review</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Customer Name</label>
            <input className={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="Ahmed K."/></div>
          <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Review Text</label>
            <textarea className={`${inp} resize-none h-24`} value={text} onChange={e=>setText(e.target.value)} placeholder="Amazing food!"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Time / Date</label>
              <input className={inp} value={time} onChange={e=>setTime(e.target.value)} placeholder="2 days ago"/></div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Rating</label>
              <div className="flex gap-1 mt-1.5">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={()=>setRating(s)}>
                    <Star size={20} className={s<=rating?"text-amber-400 fill-amber-400":"text-gray-200"}/>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={submit} disabled={!name.trim()||!text.trim()} className="flex-1 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-40">Add Review</button>
        </div>
      </div>
    </div>
  );
}

export function ReviewsManager() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSReview[]>("reviews", DEFAULT_REVIEWS);
  const [showAdd, setShowAdd] = useState(false);

  const toggleVisible = (id: string) => setData(data.map(r => r.id===id ? { ...r, visible: !r.visible } : r));

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Reviews</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage customer reviews. Hide or delete to control what appears on the site.</p>
        </div>
        <button onClick={()=>setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] transition-colors shrink-0">
          <Plus size={16}/> Add Review
        </button>
      </div>

      <div className="space-y-3">
        {data.map(review => (
          <div key={review.id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition-opacity ${!review.visible?"opacity-50":""}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="font-heading font-bold text-[#0A2612] text-sm">{review.name}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s=><Star key={s} size={12} className={s<=review.rating?"text-amber-400 fill-amber-400":"text-gray-200"}/>)}
                  </div>
                  <span className="text-xs text-gray-400">{review.time}</span>
                  {!review.visible && <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-semibold">Hidden</span>}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 mt-1">
                <button onClick={()=>toggleVisible(review.id)} title={review.visible?"Hide":"Show"} className={`p-1.5 rounded-lg transition-colors ${review.visible?"hover:bg-gray-100 text-gray-400 hover:text-gray-600":"hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`}>
                  {review.visible ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
                <button onClick={()=>setData(data.filter(r=>r.id!==review.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={15}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddReviewModal onAdd={r=>setData([...data,r])} onClose={()=>setShowAdd(false)}/>}
      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
