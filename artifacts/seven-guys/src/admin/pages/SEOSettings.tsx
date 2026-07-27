import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { ImageUploader } from "../components/ImageUploader";
import { DEFAULT_WEBSITE, type CMSWebsiteSettings } from "@/context/CMSContext";
import { Globe, Eye, AlertCircle } from "lucide-react";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

export function SEOSettings() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSWebsiteSettings>("website", DEFAULT_WEBSITE);
  const u = (patch: Partial<CMSWebsiteSettings>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  const titleLen = data.seoTitle.length;
  const descLen  = data.seoDescription.length;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">SEO Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Optimize your website for search engines and social media sharing.</p>
      </div>

      {/* Google preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={15} className="text-[#0A2612]"/>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Google Search Preview</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[#1a0dab] text-base font-medium leading-snug line-clamp-1">{data.seoTitle || "Page Title"}</p>
          <p className="text-[#006621] text-xs mt-0.5">sevenguys.pk</p>
          <p className="text-gray-600 text-sm mt-1 leading-snug line-clamp-2">{data.seoDescription || "Page description will appear here."}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Page Title</label>
          <input className={inp} value={data.seoTitle} onChange={e => u({ seoTitle: e.target.value })}/>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-gray-400">Shown in the browser tab and Google results.</p>
            <span className={`text-xs font-semibold ${titleLen > 60 ? "text-red-500" : titleLen > 50 ? "text-amber-500" : "text-emerald-600"}`}>
              {titleLen}/60
            </span>
          </div>
          {titleLen > 60 && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> Too long — Google may truncate this.</p>}
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Meta Description</label>
          <textarea className={`${inp} resize-none h-24`} value={data.seoDescription} onChange={e => u({ seoDescription: e.target.value })}/>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-gray-400">Shown under the title in search results. Aim for 150–160 characters.</p>
            <span className={`text-xs font-semibold ${descLen > 160 ? "text-red-500" : descLen > 145 ? "text-amber-500" : "text-emerald-600"}`}>
              {descLen}/160
            </span>
          </div>
        </div>

        {/* Keywords */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Keywords</label>
          <input className={inp} value={data.seoKeywords} onChange={e => u({ seoKeywords: e.target.value })} placeholder="Detroit pizza Gujranwala, best pizza Pakistan…"/>
          <p className="text-xs text-gray-400 mt-1.5">Comma-separated. Modern search engines rely primarily on content, but keywords help signal relevance.</p>
        </div>

        {/* OG Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={15} className="text-[#0A2612]"/>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Open Graph Image</label>
          </div>
          <p className="text-xs text-gray-400 mb-4">Shown when your link is shared on WhatsApp, Facebook, Twitter, etc. Recommended: 1200×630 px.</p>
          <ImageUploader label="" value={data.ogImage ?? ""} onChange={v => u({ ogImage: v })}/>
          {data.ogImage && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
              <img src={data.ogImage} alt="OG preview" className="w-full aspect-[1200/630] object-cover"/>
              <div className="bg-gray-100 px-3 py-2">
                <p className="text-xs font-bold text-[#0A2612] truncate">{data.seoTitle}</p>
                <p className="text-xs text-gray-400 line-clamp-1">{data.seoDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
