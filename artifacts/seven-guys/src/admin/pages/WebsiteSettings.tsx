import { useState } from "react";
import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_WEBSITE, type CMSWebsiteSettings } from "@/context/CMSContext";
import { Phone, Globe, FileText, Share2 } from "lucide-react";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";
function Field({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
}
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-50">
        <span className="text-[#0A2612]">{icon}</span>
        <h2 className="font-heading font-bold text-[#0A2612]">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

type Tab = "contact" | "social" | "footer" | "seo";

export function WebsiteSettings() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSWebsiteSettings>("website", DEFAULT_WEBSITE);
  const [tab, setTab] = useState<Tab>("contact");
  const u = (patch: Partial<CMSWebsiteSettings>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key:"contact", label:"Contact",      icon:<Phone size={15}/> },
    { key:"social",  label:"Social Media", icon:<Share2 size={15}/> },
    { key:"footer",  label:"Footer",       icon:<FileText size={15}/> },
    { key:"seo",     label:"SEO",          icon:<Globe size={15}/> },
  ];

  return (
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Website Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage contact info, social links, footer text, and SEO settings.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t.key?"bg-white text-[#0A2612] shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {tab === "contact" && (
          <Section icon={<Phone size={16}/>} title="Contact Information">
            <Field label="Phone Number" note="Shown in the footer and branches section."><input className={inp} value={data.phone} onChange={e=>u({phone:e.target.value})} placeholder="0319-4800036"/></Field>
            <Field label="WhatsApp Number" note="Used for WhatsApp links (international format, no +)."><input className={inp} value={data.whatsapp} onChange={e=>u({whatsapp:e.target.value})} placeholder="923194800036"/></Field>
            <Field label="Email Address (optional)"><input type="email" className={inp} value={data.email} onChange={e=>u({email:e.target.value})} placeholder="info@sevenguys.pk"/></Field>
            <Field label="Address"><input className={inp} value={data.address} onChange={e=>u({address:e.target.value})} placeholder="Gujranwala, Pakistan"/></Field>
          </Section>
        )}

        {tab === "social" && (
          <Section icon={<Share2 size={16}/>} title="Social Media Links">
            <Field label="Facebook URL"><input className={inp} value={data.facebook} onChange={e=>u({facebook:e.target.value})} placeholder="https://www.facebook.com/…"/></Field>
            <Field label="Instagram URL"><input className={inp} value={data.instagram} onChange={e=>u({instagram:e.target.value})} placeholder="https://www.instagram.com/…"/></Field>
            <Field label="TikTok URL"><input className={inp} value={data.tiktok} onChange={e=>u({tiktok:e.target.value})} placeholder="https://www.tiktok.com/…"/></Field>
            <Field label="Google Maps URL"><input className={inp} value={data.googleMaps} onChange={e=>u({googleMaps:e.target.value})} placeholder="https://maps.google.com/…"/></Field>
          </Section>
        )}

        {tab === "footer" && (
          <Section icon={<FileText size={16}/>} title="Footer Text">
            <Field label="Brand Description" note="Short tagline shown in the footer brand column.">
              <textarea className={`${inp} resize-none h-20`} value={data.footerText} onChange={e=>u({footerText:e.target.value})}/></Field>
            <Field label="Copyright Text"><input className={inp} value={data.copyright} onChange={e=>u({copyright:e.target.value})} placeholder="© 2025 Seven Guys Pizza & Burger. All Rights Reserved."/></Field>
            <Field label="Designer Credit" note="Shown in the footer bottom bar."><input className={inp} value={data.designerCredit} onChange={e=>u({designerCredit:e.target.value})} placeholder="Ahmar Studio"/></Field>
          </Section>
        )}

        {tab === "seo" && (
          <Section icon={<Globe size={16}/>} title="SEO Settings">
            <Field label="Page Title" note="Shown in the browser tab and search engine results.">
              <input className={inp} value={data.seoTitle} onChange={e=>u({seoTitle:e.target.value})}/>
              <div className={`text-xs mt-1 ${data.seoTitle.length>60?"text-red-500":"text-gray-400"}`}>{data.seoTitle.length}/60 characters (recommended max: 60)</div>
            </Field>
            <Field label="Meta Description" note="Shown in Google search results. 150–160 chars recommended.">
              <textarea className={`${inp} resize-none h-24`} value={data.seoDescription} onChange={e=>u({seoDescription:e.target.value})}/>
              <div className={`text-xs mt-1 ${data.seoDescription.length>160?"text-red-500":"text-gray-400"}`}>{data.seoDescription.length}/160 characters</div>
            </Field>
            <Field label="Keywords" note="Comma-separated keywords for search engines.">
              <input className={inp} value={data.seoKeywords} onChange={e=>u({seoKeywords:e.target.value})} placeholder="Detroit pizza Gujranwala, pizza burger Gujranwala…"/>
            </Field>
          </Section>
        )}
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
