import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useAdminAuth } from "./context/AdminAuthContext";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState(false);
  const [shaking, setShaking]     = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    const ok = login(password);
    if (!ok) {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2612] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#F5A623 1px, transparent 1px), linear-gradient(90deg, #F5A623 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Card */}
        <motion.div
          animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Logo + brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4 shadow-lg shadow-secondary/30">
              <Shield size={28} className="text-[#0A2612]" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white tracking-tight">
              Seven Guys
            </h1>
            <p className="text-white/50 text-sm mt-1">Admin Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className={`w-full bg-white/8 border rounded-xl py-3 pl-11 pr-11 text-white placeholder-white/25 text-sm outline-none transition-all duration-200
                    focus:bg-white/12 focus:ring-2
                    ${error
                      ? "border-red-400/60 focus:ring-red-400/30"
                      : "border-white/15 focus:border-secondary/60 focus:ring-secondary/20"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Error message */}
              <motion.div
                initial={false}
                animate={{ opacity: error ? 1 : 0, height: error ? "auto" : 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-red-400 text-xs font-medium mt-2 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  Incorrect Password
                </p>
              </motion.div>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 active:scale-[0.98] text-[#0A2612] font-heading font-bold py-3 rounded-xl transition-all duration-150 shadow-lg shadow-secondary/20 text-sm tracking-wide mt-1"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-white/20 text-xs mt-6">
            Restricted access · Seven Guys Management
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
