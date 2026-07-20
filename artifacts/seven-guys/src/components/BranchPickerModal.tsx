import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useBranch } from "@/context/BranchContext";
import { BRANCHES, buildWhatsAppUrl, type BranchEntry } from "@/lib/whatsapp";

export function BranchPickerModal() {
  const { modalOpen, pendingMessage, closeModal, selectedBranch, setSelectedBranch } =
    useBranch();

  // Local selection — initialised from context each time the modal opens
  const [localBranch, setLocalBranch] = useState<BranchEntry | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstRadioRef = useRef<HTMLButtonElement>(null);

  // Sync local selection & shift focus when modal opens
  useEffect(() => {
    if (modalOpen) {
      setLocalBranch(selectedBranch);
      // Defer focus so the animation has started
      const t = setTimeout(() => firstRadioRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [modalOpen, selectedBranch]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen, closeModal]);

  // Arrow-key navigation helper for the radio group
  const handleRadioKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const radios = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="radio"]'
    );
    if (!radios) return;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (idx + 1) % BRANCHES.length;
      setLocalBranch(BRANCHES[next]);
      radios[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (idx - 1 + BRANCHES.length) % BRANCHES.length;
      setLocalBranch(BRANCHES[prev]);
      radios[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setLocalBranch(BRANCHES[idx]);
    }
  };

  const handleConfirm = () => {
    if (!localBranch) return;
    setSelectedBranch(localBranch);
    const url = buildWhatsAppUrl(pendingMessage, localBranch.name);
    window.open(url, "_blank", "noreferrer");
    closeModal();
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* ── Modal ──────────────────────────────────────────────── */}
          <motion.div
            key="modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="branch-picker-title"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201]
                       w-[calc(100vw-32px)] max-w-[420px]
                       bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A2612] px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="branch-picker-title"
                  className="font-heading font-extrabold text-white text-xl leading-tight"
                >
                  Select Your Branch
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Pick the branch nearest to you
                </p>
              </div>
              <button
                onClick={closeModal}
                className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20
                           flex items-center justify-center text-white transition-colors
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close branch selection"
              >
                <X size={18} />
              </button>
            </div>

            {/* Branch Radio Group */}
            <div
              className="px-5 pt-5 pb-2 space-y-3"
              role="radiogroup"
              aria-labelledby="branch-picker-title"
            >
              {BRANCHES.map((branch, idx) => {
                const selected = localBranch?.id === branch.id;
                return (
                  <button
                    key={branch.id}
                    ref={idx === 0 ? firstRadioRef : undefined}
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected || (!localBranch && idx === 0) ? 0 : -1}
                    onClick={() => setLocalBranch(branch)}
                    onKeyDown={(e) => handleRadioKeyDown(e, idx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left
                                transition-all duration-200
                                focus-visible:outline-none focus-visible:ring-2
                                focus-visible:ring-[#0A2612] focus-visible:ring-offset-2
                                ${
                                  selected
                                    ? "border-[#0A2612] bg-[#0A2612]/5 shadow-md"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                                }`}
                  >
                    {/* Icon circle */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        selected
                          ? "bg-[#0A2612] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                      aria-hidden="true"
                    >
                      {selected ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <MapPin size={20} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-heading font-bold text-base leading-tight ${
                          selected ? "text-[#0A2612]" : "text-gray-800"
                        }`}
                      >
                        {branch.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {branch.address}
                      </div>
                    </div>

                    {/* Gold dot indicator */}
                    {selected && (
                      <div
                        className="shrink-0 w-3 h-3 rounded-full bg-[#f5c400]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="px-5 pb-5 pt-4">
              <button
                onClick={handleConfirm}
                disabled={!localBranch}
                aria-disabled={!localBranch}
                className={`w-full h-14 rounded-2xl font-heading font-bold text-lg
                            flex items-center justify-center gap-3 transition-all duration-200
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-[#25D366] focus-visible:ring-offset-2
                            ${
                              localBranch
                                ? "bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] active:scale-[0.98] cursor-pointer"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
              >
                <SiWhatsapp size={22} aria-hidden="true" />
                {localBranch
                  ? "Confirm & Order on WhatsApp"
                  : "Select a Branch to Continue"}
              </button>

              {localBranch && (
                <p className="text-center text-xs text-gray-500 mt-3">
                  Ordering from{" "}
                  <span className="font-semibold text-[#0A2612]">
                    {localBranch.name}
                  </span>
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
