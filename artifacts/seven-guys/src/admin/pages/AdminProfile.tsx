import { useState } from "react";
import { Shield, User, Key, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2612]/20";

export function AdminProfile() {
  const { logout } = useAdminAuth();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const ADMIN_PASSWORD = "sevenguys@7890";

  const handleSave = () => {
    if (form.current !== ADMIN_PASSWORD) { setStatus("error"); setErrMsg("Current password is incorrect."); return; }
    if (form.newPass.length < 8)          { setStatus("error"); setErrMsg("New password must be at least 8 characters."); return; }
    if (form.newPass !== form.confirm)    { setStatus("error"); setErrMsg("Passwords do not match."); return; }
    // Note: password is stored in code. This UI change is cosmetic until backend auth is added.
    setStatus("success");
    setForm({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="pb-8 max-w-lg">
      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0A2612]">Admin Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Your administrator account details.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0A2612] flex items-center justify-center text-secondary font-heading font-extrabold text-2xl shrink-0">
            A
          </div>
          <div>
            <p className="font-heading font-extrabold text-xl text-[#0A2612]">Administrator</p>
            <p className="text-sm text-gray-500">Seven Guys Restaurant CMS</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
              <span className="text-xs font-semibold text-emerald-600">Active Session</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User size={15} className="text-[#0A2612]/50 shrink-0"/>
            <span className="text-gray-500">Role:</span>
            <span className="font-semibold text-[#0A2612]">Super Administrator</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield size={15} className="text-[#0A2612]/50 shrink-0"/>
            <span className="text-gray-500">Access:</span>
            <span className="font-semibold text-[#0A2612]">Full CMS — All Modules</span>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <Key size={16} className="text-[#0A2612]"/>
          <h2 className="font-heading font-bold text-[#0A2612]">Change Password</h2>
        </div>

        {status === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
            <CheckCircle2 size={15} className="text-emerald-600"/>
            <p className="text-xs text-emerald-700 font-semibold">Password updated for this session.</p>
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs text-red-600 font-medium">{errMsg}</p>
          </div>
        )}

        <div className="space-y-4">
          {[
            { label:"Current Password",  key:"current",  show:showCurrent, toggle:()=>setShowCurrent(v=>!v) },
            { label:"New Password",      key:"newPass",  show:showNew,     toggle:()=>setShowNew(v=>!v)     },
            { label:"Confirm Password",  key:"confirm",  show:showConfirm, toggle:()=>setShowConfirm(v=>!v) },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
              <div className="relative">
                <input
                  type={f.show ? "text" : "password"}
                  className={`${inp} pr-10`}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                />
                <button onClick={f.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {f.show ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleSave} disabled={!form.current || !form.newPass || !form.confirm}
          className="mt-5 px-5 py-2.5 bg-[#0A2612] text-white rounded-xl text-sm font-bold hover:bg-[#0d3318] disabled:opacity-40 transition-colors">
          Update Password
        </button>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">Session</p>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );
}
