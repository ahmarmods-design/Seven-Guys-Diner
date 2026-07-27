import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_HOMEPAGE, type CMSHomepage } from "@/context/CMSContext";
import { Info } from "lucide-react";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

export function HomepageContent() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSHomepage>("homepage", DEFAULT_HOMEPAGE);
  const u = (patch: Partial<CMSHomepage>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Homepage Content</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit the hero section text shown at the top of the website.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
        <Info size={16} className="text-blue-500 shrink-0 mt-0.5"/>
        <p className="text-sm text-blue-700">The main animated heading and logo are part of the brand identity and are not editable here. Edit the supporting tagline and description below.</p>
      </div>

      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Hero Tagline</label>
          <input className={inp} value={data.heroTagline} onChange={e=>u({heroTagline:e.target.value})} placeholder="Gujranwala's Finest"/>
          <p className="text-xs text-gray-400 mt-1.5">Short tagline shown below the main heading. Keep it under 40 characters.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Hero Description</label>
          <textarea className={`${inp} resize-none h-28`} value={data.heroDescription} onChange={e=>u({heroDescription:e.target.value})}
            placeholder="Detroit-style square pizza with crispy caramelized edges…"/>
          <p className="text-xs text-gray-400 mt-1.5">1–2 sentences shown beneath the tagline. Keep it punchy and direct.</p>
        </div>

        {/* Live preview */}
        <div className="bg-[#0A2612] rounded-2xl p-6">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Preview</p>
          <div className="text-center">
            <p className="text-secondary font-heading font-extrabold text-xl mb-2">{data.heroTagline || "—"}</p>
            <p className="text-white/70 text-sm max-w-xs mx-auto leading-relaxed">{data.heroDescription || "—"}</p>
          </div>
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
