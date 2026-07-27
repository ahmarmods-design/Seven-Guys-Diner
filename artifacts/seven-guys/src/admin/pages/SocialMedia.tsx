import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_WEBSITE, type CMSWebsiteSettings } from "@/context/CMSContext";
import { ExternalLink } from "lucide-react";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

interface SocialField {
  key: keyof CMSWebsiteSettings;
  label: string;
  placeholder: string;
  icon: string;
  color: string;
  hint: string;
}

const SOCIAL_FIELDS: SocialField[] = [
  { key: "facebook",   label: "Facebook",    placeholder: "https://www.facebook.com/…",    icon: "f",  color: "bg-[#1877F2]",  hint: "Facebook page URL" },
  { key: "instagram",  label: "Instagram",   placeholder: "https://www.instagram.com/…",   icon: "in", color: "bg-[#E4405F]",  hint: "Instagram profile URL" },
  { key: "tiktok",     label: "TikTok",      placeholder: "https://www.tiktok.com/@…",      icon: "tt", color: "bg-[#000000]",  hint: "TikTok profile URL" },
  { key: "googleMaps", label: "Google Maps", placeholder: "https://maps.google.com/…",      icon: "gm", color: "bg-[#4285F4]",  hint: "Google Maps listing or directions link" },
];

export function SocialMedia() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSWebsiteSettings>("website", DEFAULT_WEBSITE);
  const u = (patch: Partial<CMSWebsiteSettings>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Social Media</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage social profile links shown in the footer and contact section.</p>
      </div>

      <div className="space-y-3">
        {SOCIAL_FIELDS.map(field => {
          const val = String(data[field.key] ?? "");
          return (
            <div key={field.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${field.color} flex items-center justify-center text-white text-xs font-black shrink-0`}>
                  {field.icon.toUpperCase()}
                </div>
                <div>
                  <p className="font-heading font-bold text-[#0A2612] text-sm">{field.label}</p>
                  <p className="text-xs text-gray-400">{field.hint}</p>
                </div>
                {val && (
                  <a href={val} target="_blank" rel="noreferrer" className="ml-auto text-gray-400 hover:text-[#0A2612] transition-colors">
                    <ExternalLink size={15}/>
                  </a>
                )}
              </div>
              <input
                className={inp} value={val}
                onChange={e => u({ [field.key]: e.target.value } as Partial<CMSWebsiteSettings>)}
                placeholder={field.placeholder}
              />
              {val && (
                <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Link saved
                </p>
              )}
              {!val && (
                <p className="text-xs text-gray-300 mt-1.5">Leave empty to hide this icon from the website.</p>
              )}
            </div>
          );
        })}
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
