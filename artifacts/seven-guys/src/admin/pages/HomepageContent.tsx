import { useState } from "react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { ImageUploader } from "../components/ImageUploader";
import { DEFAULT_HOMEPAGE, type CMSHomepage } from "@/context/CMSContext";
import { Info, Plus, Trash2 } from "lucide-react";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-50 pb-3 mb-5">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
}

export function HomepageContent() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSHomepage>("homepage", DEFAULT_HOMEPAGE);
  const u = (patch: Partial<CMSHomepage>) => setData({ ...data, ...patch });
  const [newBannerUrl, setNewBannerUrl] = useState("");

  const addBanner = (url: string) => {
    if (!url.trim()) return;
    u({ bannerImages: [...(data.bannerImages ?? []), url.trim()] });
    setNewBannerUrl("");
  };
  const removeBanner = (i: number) =>
    u({ bannerImages: (data.bannerImages ?? []).filter((_, idx) => idx !== i) });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Homepage Content</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit the hero section text and promotional banners shown on the website.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 flex items-start gap-3 mb-5">
        <Info size={15} className="text-blue-500 shrink-0 mt-0.5"/>
        <p className="text-xs text-blue-700">The main animated heading is part of the brand identity and uses these values as reference. CTA button labels apply when the hero is updated to use CMS data.</p>
      </div>

      <div className="space-y-4">
        {/* Hero text */}
        <Section title="Hero Heading">
          <Field label="Main Title" note="Primary headline shown at the top of the hero.">
            <input className={inp} value={data.heroTitle ?? ""} onChange={e => u({ heroTitle: e.target.value })} placeholder="Gujranwala's Home of Detroit Pizza"/>
          </Field>
          <Field label="Subtitle / Tagline" note="Secondary line shown under the main title.">
            <input className={inp} value={data.heroSubtitle ?? ""} onChange={e => u({ heroSubtitle: e.target.value })} placeholder="Bold flavors. Premium craft. Melted cheese."/>
          </Field>
          <Field label="Hero Tagline (animated)" note="Short golden text shown in the animated hero sequence.">
            <input className={inp} value={data.heroTagline} onChange={e => u({ heroTagline: e.target.value })} placeholder="Gujranwala's Finest"/>
          </Field>
          <Field label="Hero Description" note="1–2 sentences shown beneath the animated heading.">
            <textarea className={`${inp} resize-none h-20`} value={data.heroDescription} onChange={e => u({ heroDescription: e.target.value })}/>
          </Field>
        </Section>

        {/* CTA Buttons */}
        <Section title="CTA Buttons">
          <Field label="Primary Button Text" note='Default: "Order Now"'>
            <input className={inp} value={data.heroCtaPrimary ?? ""} onChange={e => u({ heroCtaPrimary: e.target.value })} placeholder="Order Now"/>
          </Field>
          <Field label="Secondary Button Text" note='Default: "Explore Menu"'>
            <input className={inp} value={data.heroCtaSecondary ?? ""} onChange={e => u({ heroCtaSecondary: e.target.value })} placeholder="Explore Menu"/>
          </Field>
        </Section>

        {/* Banner images */}
        <Section title="Banner Images">
          <p className="text-xs text-gray-400 -mt-2">Promotional images shown in a banner or slideshow section. Upload or paste URLs.</p>

          {/* Existing banners */}
          {(data.bannerImages ?? []).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(data.bannerImages ?? []).map((url, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden aspect-[16/9] bg-gray-100 border border-gray-200">
                  <img src={url} alt={`Banner ${i+1}`} className="w-full h-full object-cover"/>
                  <button onClick={() => removeBanner(i)} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} className="text-white"/>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add by upload */}
          <ImageUploader label="Upload Banner" value="" onChange={url => { if (url) addBanner(url); }}/>

          {/* Add by URL */}
          <div className="flex gap-2">
            <input type="text" placeholder="Or paste banner image URL…" value={newBannerUrl} onChange={e => setNewBannerUrl(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter") addBanner(newBannerUrl); }}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20"/>
            <button onClick={() => addBanner(newBannerUrl)} disabled={!newBannerUrl.trim()}
              className="px-4 py-2.5 bg-[#0A2612] text-white text-sm font-bold rounded-xl hover:bg-[#0d3318] disabled:opacity-40 flex items-center gap-1.5">
              <Plus size={14}/> Add
            </button>
          </div>
        </Section>

        {/* Live preview */}
        <div className="bg-[#0A2612] rounded-2xl p-6">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Hero Preview</p>
          <div className="text-center">
            <p className="text-secondary font-heading font-extrabold text-xl mb-1">{data.heroTagline || "—"}</p>
            <p className="text-white font-heading font-bold text-2xl mb-2">{data.heroTitle || "—"}</p>
            <p className="text-white/70 text-sm max-w-xs mx-auto leading-relaxed mb-4">{data.heroDescription || "—"}</p>
            <div className="flex gap-3 justify-center">
              <span className="bg-secondary text-[#0A2612] text-xs font-bold px-4 py-2 rounded-full">{data.heroCtaPrimary || "Order Now"}</span>
              <span className="border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full">{data.heroCtaSecondary || "Explore Menu"}</span>
            </div>
          </div>
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
