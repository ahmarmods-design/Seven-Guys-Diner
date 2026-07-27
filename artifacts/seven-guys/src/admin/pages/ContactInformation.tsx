import { useCMSPage } from "../lib/api";
import { SaveBar } from "../components/SaveBar";
import { DEFAULT_WEBSITE, type CMSWebsiteSettings } from "@/context/CMSContext";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";
function Field({ label, icon, note, children }: { label: string; icon?: React.ReactNode; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {icon && <span className="text-[#0A2612]">{icon}</span>}{label}
      </label>
      {children}
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
}

export function ContactInformation() {
  const { data, setData, loading, status, save, cancel, isDirty } = useCMSPage<CMSWebsiteSettings>("website", DEFAULT_WEBSITE);
  const u = (patch: Partial<CMSWebsiteSettings>) => setData({ ...data, ...patch });

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading…</div>;

  return (
    <div className="pb-28 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Contact Information</h1>
        <p className="text-muted-foreground text-sm mt-1">Update the phone numbers, email, and address shown on your website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <Field label="Phone Number" icon={<Phone size={13}/>} note="Displayed in the footer and shown as a tap-to-call link on mobile.">
          <input className={inp} value={data.phone} onChange={e => u({ phone: e.target.value })} placeholder="0319-4800036"/>
        </Field>

        <div className="border-t border-gray-50" />

        <Field label="WhatsApp Number" icon={<MessageCircle size={13}/>} note="International format without the + symbol. Used for wa.me links across the site.">
          <input className={inp} value={data.whatsapp} onChange={e => u({ whatsapp: e.target.value })} placeholder="923194800036"/>
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1.5">
            Preview: <a href={`https://wa.me/${data.whatsapp}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">wa.me/{data.whatsapp}</a>
          </div>
        </Field>

        <div className="border-t border-gray-50" />

        <Field label="Email Address" icon={<Mail size={13}/>} note="Optional. Shown in the contact section if provided.">
          <input type="email" className={inp} value={data.email} onChange={e => u({ email: e.target.value })} placeholder="info@sevenguys.pk"/>
        </Field>

        <div className="border-t border-gray-50" />

        <Field label="Business Address" icon={<MapPin size={13}/>} note="General location shown in the footer.">
          <input className={inp} value={data.address} onChange={e => u({ address: e.target.value })} placeholder="Gujranwala, Pakistan"/>
        </Field>
      </div>

      {/* Preview card */}
      <div className="mt-4 bg-[#0A2612] rounded-2xl p-5">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Footer Preview</p>
        <div className="space-y-2">
          {data.phone    && <p className="text-white/70 text-sm flex items-center gap-2"><Phone size={13} className="text-secondary"/>{data.phone}</p>}
          {data.whatsapp && <p className="text-white/70 text-sm flex items-center gap-2"><MessageCircle size={13} className="text-[#25D366]"/>wa.me/{data.whatsapp}</p>}
          {data.email    && <p className="text-white/70 text-sm flex items-center gap-2"><Mail size={13} className="text-secondary"/>{data.email}</p>}
          {data.address  && <p className="text-white/70 text-sm flex items-center gap-2"><MapPin size={13} className="text-secondary"/>{data.address}</p>}
        </div>
      </div>

      <SaveBar status={status} isDirty={isDirty} onSave={save} onCancel={cancel}/>
    </div>
  );
}
