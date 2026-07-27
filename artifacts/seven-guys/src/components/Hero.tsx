import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { Star, Clock, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import heroPizzaImg from "@assets/WhatsApp_Image_2026-07-18_at_9.41.06_PM_1784390466550.webp";
import { useBranch } from "@/context/BranchContext";

// ── Fixed particles (deterministic — no layout shift) ──────────────────────
const PARTICLES = [
  { id: 0,  x: 7,  y: 14, s: 1.5, dur: 9,  delay: 0,   gold: true  },
  { id: 1,  x: 21, y: 71, s: 1,   dur: 7,  delay: 1.2, gold: false },
  { id: 2,  x: 37, y: 38, s: 2,   dur: 11, delay: 0.5, gold: true  },
  { id: 3,  x: 54, y: 84, s: 1,   dur: 8,  delay: 2,   gold: false },
  { id: 4,  x: 69, y: 24, s: 2.5, dur: 10, delay: 0.8, gold: true  },
  { id: 5,  x: 81, y: 59, s: 1,   dur: 6,  delay: 1.5, gold: false },
  { id: 6,  x: 91, y: 9,  s: 1.5, dur: 12, delay: 0.3, gold: false },
  { id: 7,  x: 14, y: 89, s: 1,   dur: 9,  delay: 3,   gold: true  },
  { id: 8,  x: 44, y: 5,  s: 2,   dur: 7,  delay: 1.8, gold: false },
  { id: 9,  x: 64, y: 49, s: 1.5, dur: 8,  delay: 0.6, gold: true  },
  { id: 10, x: 77, y: 79, s: 1,   dur: 13, delay: 2.2, gold: false },
  { id: 11, x: 29, y: 54, s: 1,   dur: 6,  delay: 4,   gold: false },
  { id: 12, x: 89, y: 39, s: 2,   dur: 10, delay: 1,   gold: true  },
  { id: 13, x: 5,  y: 49, s: 1.5, dur: 8,  delay: 2.8, gold: false },
  { id: 14, x: 49, y: 64, s: 1,   dur: 11, delay: 0.4, gold: true  },
  { id: 15, x: 33, y: 22, s: 1,   dur: 9,  delay: 1.1, gold: false },
  { id: 16, x: 58, y: 77, s: 2,   dur: 7,  delay: 3.5, gold: true  },
  { id: 17, x: 72, y: 13, s: 1,   dur: 14, delay: 0.7, gold: false },
];

// ── Steam wisp ─────────────────────────────────────────────────────────────
function SteamWisp({
  left,
  delay,
  duration,
}: {
  left: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left,
        top: "18%",
        width: 3,
        height: 45,
        borderRadius: 999,
        background:
          "linear-gradient(to top, rgba(255,255,255,0.25) 0%, transparent 100%)",
        filter: "blur(4px)",
      }}
      animate={{
        y: [0, -70, -90],
        opacity: [0, 0.45, 0],
        x: [0, 10, -6],
        scaleX: [1, 1.8, 2.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
        repeatDelay: 0.6,
      }}
    />
  );
}

// ── Magnetic button ─────────────────────────────────────────────────────────
function MagneticWrap({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        rawX.set((e.clientX - rect.left - rect.width / 2) * 0.28);
        rawY.set((e.clientY - rect.top - rect.height / 2) * 0.28);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function Hero() {
  const { openOrderModal } = useBranch();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse → 3-D tilt
  const rawMX = useMotionValue(0.5);
  const rawMY = useMotionValue(0.5);
  const smoothMX = useSpring(rawMX, { stiffness: 55, damping: 22 });
  const smoothMY = useSpring(rawMY, { stiffness: 55, damping: 22 });
  const rotateY = useTransform(smoothMX, [0, 1], [-13, 13]);
  const rotateX = useTransform(smoothMY, [0, 1], [9,  -9]);

  // Shadow shifts with mouse
  const shadowX = useTransform(smoothMX, [0, 1], [-24, 24]);
  const shadowY = useTransform(smoothMY, [0, 1], [-10, 14]);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const pizzaScrollScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.78]);
  const pizzaScrollY     = useTransform(scrollYProgress, [0, 0.55], [0, -55]);
  const textScrollY      = useTransform(scrollYProgress, [0, 0.55], [0, -35]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    rawMX.set((e.clientX - rect.left) / rect.width);
    rawMY.set((e.clientY - rect.top)  / rect.height);
  };
  const handleMouseLeave = () => {
    rawMX.set(0.5);
    rawMY.set(0.5);
  };

  // Staggered entrance
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 26 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 100% at 68% 38%, #0d2e14 0%, #070f09 55%, #050908 100%)",
      }}
    >
      {/* ── Background layers ──────────────────────────────────────────── */}

      {/* Green atmospheric blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", right: "-8%",
          width: "68%", height: "80%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(13,74,31,0.45) 0%, transparent 68%)",
        }}
      />
      {/* Gold ambient warmth */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%", left: "-18%",
          width: "55%", height: "65%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(245,166,35,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 w-full h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(5,9,8,0.75))" }}
      />
      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 w-full h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(5,9,8,0.5), transparent)" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left:   `${p.x}%`,
              top:    `${p.y}%`,
              width:  p.s,
              height: p.s,
              background: p.gold
                ? "rgba(245,166,35,0.55)"
                : "rgba(255,255,255,0.18)",
            }}
            animate={{
              y:       [0, -28, 0],
              opacity: [0.04, p.gold ? 0.45 : 0.14, 0.04],
            }}
            transition={{
              duration: p.dur,
              delay:    p.delay,
              repeat:   Infinity,
              ease:     "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center min-h-[100dvh] py-28 lg:py-0">

          {/* ── LEFT — Text ─────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textScrollY }}
            className="flex flex-col gap-5 text-white order-2 lg:order-1 lg:pr-6"
          >
            {/* Rating badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                              border border-white/12 bg-white/[0.04] backdrop-blur-md w-fit">
                <div className="flex gap-0.5" style={{ color: "hsl(37 90% 55%)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-white/75 tracking-wider">
                  Gujranwala's Top Rated
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="font-heading font-extrabold leading-[1.04] tracking-tight">
                <span className="block text-[clamp(2rem,5vw,4rem)] text-white/85">
                  GUJRANWALA'S
                </span>
                <span
                  className="block text-[clamp(2.4rem,6.5vw,5.2rem)]"
                  style={{
                    color: "hsl(37 90% 55%)",
                    textShadow: "0 0 55px hsl(37 90% 55% / 0.38)",
                  }}
                >
                  HOME OF
                </span>
                <span className="block text-[clamp(2rem,5vw,4rem)] text-white">
                  DETROIT PIZZA
                </span>
              </h1>
            </motion.div>

            {/* Divider line */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="h-[1px] w-16"
                style={{ background: "linear-gradient(to right, hsl(37 90% 55% / 0.7), transparent)" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[15px] md:text-base text-white/55 max-w-[38ch] leading-relaxed"
            >
              Bold flavors, premium craft, and the kind of melted cheese
              you've been dreaming about. Young, energetic, undeniably delicious.
            </motion.p>

            {/* Info chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
              {[
                { icon: <Clock size={13} />, label: "Open 2PM – 2AM Daily" },
                { icon: <MapPin size={13} />, label: "Delivery All Over Gujranwala" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs
                             text-white/45 border border-white/10 px-3 py-1.5
                             rounded-full bg-white/[0.03]"
                >
                  <span style={{ color: "hsl(37 90% 55%)" }}>{icon}</span>
                  {label}
                </div>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              {/* Primary — magnetic + shimmer */}
              <MagneticWrap onClick={() => openOrderModal("Hi! I'd like to place an order.")}>
                <motion.button
                  className="relative overflow-hidden flex items-center justify-center
                             gap-2.5 px-7 py-3.5 rounded-full font-bold text-[15px]
                             cursor-pointer select-none"
                  style={{
                    background: "hsl(37 90% 55%)",
                    color: "#060d08",
                    boxShadow: "0 0 0 0 hsl(37 90% 55% / 0)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 6px 28px hsl(37 90% 55% / 0.22)",
                      "0 8px 36px hsl(37 90% 55% / 0.38)",
                      "0 6px 28px hsl(37 90% 55% / 0.22)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(108deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                    }}
                    animate={{ x: ["-110%", "210%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 2.8,
                      ease: "easeInOut",
                    }}
                  />
                  <MessageCircle size={17} />
                  Order Now
                </motion.button>
              </MagneticWrap>

              {/* Secondary — ghost + arrow */}
              <motion.a
                href="#menu"
                className="group flex items-center justify-center gap-2 px-7 py-3.5
                           rounded-full font-semibold text-[15px] border border-white/20
                           text-white/70 hover:text-white hover:border-white/40
                           bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-sm
                           transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Menu
                <ChevronDown
                  size={15}
                  className="group-hover:translate-y-0.5 transition-transform duration-300"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Pizza ─────────────────────────────────── */}
          <div className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2">

            {/* Scroll parallax wrapper */}
            <motion.div
              style={{ y: pizzaScrollY, scale: pizzaScrollScale }}
              className="w-full flex justify-center lg:justify-end"
            >
              {/* Entrance animation wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
                style={{ maxWidth: "min(540px, 90vw)" }}
              >
                {/* Pulsing radial glow ring */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    inset: "-28%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse, hsl(37 90% 55% / 0.13) 0%, hsl(138 70% 17% / 0.08) 45%, transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.07, 1], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 3-D perspective container */}
                <div style={{ perspective: "1100px", width: "100%" }}>
                  <motion.div
                    style={{
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                    }}
                  >
                    {/* Float + breathe */}
                    <motion.div
                      animate={{ y: [0, -20, 0], rotate: [-0.7, 0.7, -0.7] }}
                      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      {/* Dynamic drop shadow (breathes with float) */}
                      <motion.div
                        className="absolute -bottom-7 left-1/2 -translate-x-1/2 pointer-events-none"
                        style={{
                          width: "78%",
                          height: 32,
                          borderRadius: "50%",
                          background:
                            "radial-gradient(ellipse, rgba(0,0,0,0.65) 0%, transparent 70%)",
                          filter: "blur(14px)",
                        }}
                        animate={{ scaleX: [1, 0.86, 1], opacity: [0.65, 0.42, 0.65] }}
                        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Pizza image + effects */}
                      <div className="relative">
                        <img
                          src={heroPizzaImg}
                          alt="Detroit Square Pizza Loaded with Cheese"
                          className="w-full h-auto object-contain relative z-10"
                          fetchPriority="high"
                          decoding="async"
                          style={{
                            borderRadius: "50%",
                            maxHeight: "min(62vh, 530px)",
                            filter: "brightness(1.1) contrast(1.1) saturate(1.18)",
                          }}
                        />

                        {/* Cheese shine — periodic gold catch */}
                        <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none z-20"
                          style={{
                            background:
                              "radial-gradient(circle at 40% 34%, rgba(255,205,70,0.3) 0%, transparent 44%)",
                          }}
                          animate={{
                            opacity: [0, 0.72, 0, 0.52, 0],
                            x:       ["0%", "6%",  "0%", "-4%", "0%"],
                          }}
                          transition={{
                            duration: 5,
                            repeat:   Infinity,
                            ease:     "easeInOut",
                            times:    [0, 0.22, 0.5, 0.74, 1],
                          }}
                        />

                        {/* Second cheese shine — offset for realism */}
                        <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none z-20"
                          style={{
                            background:
                              "radial-gradient(circle at 62% 55%, rgba(255,190,50,0.2) 0%, transparent 35%)",
                          }}
                          animate={{
                            opacity: [0, 0, 0.55, 0, 0],
                            x:       ["0%", "0%", "4%", "0%", "0%"],
                          }}
                          transition={{
                            duration: 5,
                            delay:    2.5,
                            repeat:   Infinity,
                            ease:     "easeInOut",
                          }}
                        />

                        {/* Light sweep */}
                        <div
                          className="absolute inset-0 rounded-full z-20 pointer-events-none overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(118deg, transparent 30%, rgba(255,255,255,0.065) 50%, transparent 70%)",
                            }}
                            animate={{ x: ["-110%", "210%"] }}
                            transition={{
                              duration:    3.8,
                              repeat:      Infinity,
                              repeatDelay: 4,
                              ease:        "easeInOut",
                            }}
                          />
                        </div>

                        {/* Steam wisps */}
                        <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
                          <SteamWisp left="32%" delay={0}   duration={2.9} />
                          <SteamWisp left="44%" delay={0.9} duration={3.4} />
                          <SteamWisp left="55%" delay={1.8} duration={2.7} />
                          <SteamWisp left="63%" delay={0.5} duration={3.1} />
                          <SteamWisp left="38%" delay={2.4} duration={3.6} />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col
                   items-center gap-1.5 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="text-[9px] tracking-[0.28em] uppercase text-white/25 font-medium">
          Scroll
        </span>
        <motion.div
          className="w-px h-7 rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}
          animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
