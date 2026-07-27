import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export function Reviews() {
  const { reviews }  = useCMS();
  const visible      = reviews.filter(r => r.visible);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((p) => (p + 1) % visible.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + visible.length) % visible.length);

  if (visible.length === 0) return null;

  return (
    <section id="reviews" className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
          >
            WHAT THE <span className="text-secondary">CITY SAYS</span>
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold">4.9</span>
            <div className="flex text-secondary">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
            </div>
          </div>
          <p className="text-white/70">Based on thousands of happy customers</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {visible.slice(0, 4).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="flex text-secondary mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} fill="currentColor" size={16} />)}
                </div>
                <p className="text-lg leading-relaxed mb-6 font-medium">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="font-heading font-bold">{review.name}</div>
                  <div className="text-sm text-white/50">{review.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative px-4">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 -ml-2">
              <button onClick={prev} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-md"><ChevronLeft size={24} /></button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <Quote className="text-secondary/30 mb-4" size={40} />
                <div className="flex text-secondary mb-4">
                  {[...Array(visible[currentIndex]?.rating ?? 5)].map((_, j) => <Star key={j} fill="currentColor" size={16} />)}
                </div>
                <p className="text-lg leading-relaxed mb-6 font-medium">"{visible[currentIndex]?.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="font-heading font-bold">{visible[currentIndex]?.name}</div>
                  <div className="text-sm text-white/50">{visible[currentIndex]?.time}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 -mr-2">
              <button onClick={next} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-md"><ChevronRight size={24} /></button>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {visible.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i===currentIndex?"w-6 bg-secondary":"w-2 bg-white/20"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
