/**
 * LoadingScreen — cinematic intro, 0–1 100 ms.
 *
 * Sequence
 *  0 –  450 ms  enter   pizza springs from left, ambient glow builds
 *  ~ 350 ms      sweep  golden sheen passes over pizza
 *  ~ 450 ms      logo   brand block fades in
 *  450 – 720 ms  hold   everything at rest
 *  720 – 1 100 ms exit  pizza exits right · screen fades out
 *  1 100 ms      done   onComplete() fires, component unmounts
 */

import { useEffect, useState, useCallback } from "react";
import { motion }                            from "framer-motion";
import pizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_9.41.06_PM_1784390466550.webp";
import logoImg  from "@assets/WhatsApp_Image_2026-07-18_at_4.55.48_PM_1784372602729.webp";

// ─────────────────────────────────────────────────────────────────────────────
// Timing constants (ms)
// ─────────────────────────────────────────────────────────────────────────────
const T_EXIT     = 720;
const T_COMPLETE = 1100;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
interface Props { onComplete: () => void; }

export function LoadingScreen({ onComplete }: Props) {
  const [exiting, setExiting] = useState(false);
  const [gone,    setGone]    = useState(false);

  const stableComplete = useCallback(onComplete, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tExit = setTimeout(() => setExiting(true),               T_EXIT);
    const tDone = setTimeout(() => { setGone(true); stableComplete(); }, T_COMPLETE);
    return () => { clearTimeout(tExit); clearTimeout(tDone); };
  }, [stableComplete]);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0A2612]"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={exiting ? { duration: 0.36, ease: [0.4, 0, 0.2, 1], delay: 0.04 } : { duration: 0 }}
      aria-hidden="true"
    >
      {/* ── Subtle texture grain ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          opacity: 0.35,
        }}
      />

      {/* ── Ambient radial glow (behind pizza) ───────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width:  560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(245,166,35,0.11) 0%, rgba(245,166,35,0.04) 45%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.65 }}
        animate={exiting ? { opacity: 0, scale: 0.65 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0, 0, 0.2, 1] }}
      />

      {/* ── Pizza ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative mb-8"
        /* enter: spring slide-in from left with slight bounce */
        initial={{ x: "-130vw", rotate: -24, scale: 0.8 }}
        animate={
          exiting
            ? { x: "130vw", rotate: 16, scale: 0.84 }
            : { x: 0,       rotate: -5, scale: 1      }
        }
        transition={
          exiting
            ? { duration: 0.3, ease: [0.55, 0, 0.9, 0.6] }
            : {
                type:      "spring",
                stiffness: 155,
                damping:   17,
                mass:      0.85,
              }
        }
      >
        {/* Circle crop */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width:     "clamp(180px, 28vw, 300px)",
            height:    "clamp(180px, 28vw, 300px)",
            boxShadow:
              "0 0 90px rgba(0,0,0,0.75), 0 0 48px rgba(0,0,0,0.5), 0 0 32px rgba(245,166,35,0.10)",
          }}
        >
          <img
            src={pizzaImg}
            alt=""
            className="w-full h-full object-cover object-center"
            draggable={false}
          />

          {/* ── Golden sheen sweep ────────────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={exiting ? { opacity: 0 } : { opacity: [0, 0, 1, 0] }}
            transition={{
              duration: 0.52,
              delay:    0.3,
              times:    [0, 0.22, 0.52, 1],
              ease:     "easeInOut",
            }}
          >
            {/* Moving streak */}
            <motion.div
              className="absolute top-0 bottom-0"
              style={{
                width:      "52%",
                background: "linear-gradient(108deg, transparent 0%, rgba(255,215,70,0.48) 48%, transparent 100%)",
                filter:     "blur(6px)",
              }}
              initial={{ left: "-55%" }}
              animate={exiting ? { left: "-55%" } : { left: "105%" }}
              transition={{ duration: 0.48, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>

          {/* Subtle dark vignette on pizza edge */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.45)",
            }}
          />
        </div>

        {/* Reflection/glow disc beneath pizza */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-3 pointer-events-none rounded-full"
          style={{
            width:  "70%",
            height: 18,
            background:
              "radial-gradient(ellipse, rgba(245,166,35,0.18) 0%, transparent 75%)",
            filter: "blur(6px)",
          }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── Brand block: logo + name ──────────────────────────────────────── */}
      <motion.div
        className="flex items-center gap-3.5"
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: exiting ? 0 : 1,
          y:       exiting ? -12 : 0,
        }}
        transition={
          exiting
            ? { duration: 0.2, ease: [0.4, 0, 1, 1] }
            : { duration: 0.32, delay: 0.44, ease: [0, 0, 0.2, 1] }
        }
      >
        {/* Logo mark */}
        <motion.img
          src={logoImg}
          alt=""
          className="object-contain rounded-xl"
          draggable={false}
          style={{ width: "clamp(36px, 4.5vw, 48px)", height: "clamp(36px, 4.5vw, 48px)" }}
          initial={{ opacity: 0, scale: 0.78, rotate: -8 }}
          animate={exiting
            ? { opacity: 0, scale: 0.78, rotate: -8 }
            : { opacity: 1, scale: 1,    rotate:  0  }}
          transition={{ duration: 0.36, delay: 0.46, ease: [0, 0, 0.2, 1] }}
        />

        {/* Text */}
        <div>
          <p
            className="font-heading font-extrabold leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(18px, 2.4vw, 26px)" }}
          >
            SEVEN{" "}
            <span style={{ color: "#F5A623" }}>GUYS</span>
          </p>
          <motion.p
            className="font-sans font-medium text-white/35 uppercase"
            style={{
              fontSize:      "clamp(9px, 1vw, 11px)",
              letterSpacing: "0.22em",
              marginTop:     4,
            }}
            initial={{ opacity: 0 }}
            animate={exiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.56, ease: "easeOut" }}
          >
            Detroit Pizza · Gujranwala
          </motion.p>
        </div>
      </motion.div>

      {/* ── Thin golden bottom accent line ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #F5A623, transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={exiting ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.38, ease: [0, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}
