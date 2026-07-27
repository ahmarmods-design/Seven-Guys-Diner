import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_WEBSITE, type CMSWebsiteSettings } from "@/context/CMSContext";

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

export function FooterSettings() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSWebsiteSettings>("website", DEFAULT_WEBSITE);
  const u = (patch: Partial<CMSWebsiteSettings>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Footer Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit the text content shown at the bottom of your website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 mb-4">
        <Field label="Brand Description" note="Short tagline shown in the footer brand column. Keep it to 1–2 sentences.">
          <textarea className={`${inp} resize-none h-20`} value={data.footerText} onChange={e => u({ footerText: e.target.value })}/>
          <p className="text-xs text-right text-gray-400 mt-1">{data.footerText.length} characters</p>
        </Field>
        <div className="border-t border-gray-50"/>
        <Field label="Copyright Text" note='Shown in the footer bottom bar. Include © and the year.'>
          <input className={inp} value={data.copyright} onChange={e => u({ copyright: e.target.value })} placeholder="© 2025 Seven Guys Pizza & Burger. All Rights Reserved."/>
        </Field>
        <div className="border-t border-gray-50"/>
        <Field label="Designer Credit" note="Name shown as the website designer. Links to WhatsApp for credit.">
          <input className={inp} value={data.designerCredit} onChange={e => u({ designerCredit: e.target.value })} placeholder="Ahmar Studio"/>
        </Field>
      </div>

      {/* Footer preview */}
      <div className="bg-[#081e0e] rounded-2xl p-6 border-t-4 border-secondary">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Footer Preview</p>
        <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">{data.footerText || "—"}</p>
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">Designed by</p>
              <p className="text-white/60 text-xs font-bold">{data.designerCredit || "—"}</p>
            </div>
            <p className="text-white/30 text-[11px]">{data.copyright || "—"}</p>
          </div>
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
