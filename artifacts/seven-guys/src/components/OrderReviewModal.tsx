import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useBranch } from "@/context/BranchContext";
import type { CartItem } from "@/context/CartContext";

// ── Category emoji derived from cart item id ──────────────────────────────
function itemEmoji(id: string): string {
  if (id.startsWith("pizza|") || id.startsWith("menu-pizza|")) return "🍕";
  if (id.startsWith("burger|") || id.startsWith("menu-burger|")) return "🍔";
  if (id.startsWith("fries|")) return "🍟";
  if (id.startsWith("wings|")) return "🍗";
  if (id.startsWith("deal|")) return "⭐";
  if (id.startsWith("menu-chicken|")) return "🍗";
  if (id.startsWith("menu-drinks|")) return "🧃";
  return "🍽️";
}

// ── Professional WhatsApp message ─────────────────────────────────────────
function buildWhatsAppMessage(items: CartItem[], subtotal: number): string {
  const lines = items
    .map(
      (item) =>
        `• *${item.name}*${item.variant ? ` _(${item.variant})_` : ""}\n` +
        `  Qty: ${item.qty}  ×  Rs. ${item.price.toLocaleString()}  =  *Rs. ${(item.price * item.qty).toLocaleString()}*`
    )
    .join("\n\n");

  return (
    `🍕 *Seven Guys Pizza & Burger*\n` +
    `📋 *Customer Order*\n` +
    `━━━━━━━━━━━━━━━━━━━\n\n` +
    `${lines}\n\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `💰 *Grand Total: Rs. ${subtotal.toLocaleString()}*\n\n` +
    `Thank you for choosing Seven Guys! 🙏\n` +
    `Please confirm my order.`
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export function OrderReviewModal() {
  const {
    items,
    subtotal,
    removeItem,
    updateQty,
    clearCart,
    orderReviewOpen,
    closeOrderReview,
  } = useCart();
  const { openOrderModal } = useBranch();

  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  function handleConfirm() {
    const msg = buildWhatsAppMessage(items, subtotal);
    closeOrderReview();
    openOrderModal(msg);
  }

  return (
    <AnimatePresence>
      {orderReviewOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────── */}
          <motion.div
            key="review-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-[180]"
            onClick={closeOrderReview}
          />

          {/* ── Modal ────────────────────────────────────────── */}
          <motion.div
            key="review-modal"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       z-[190] w-[calc(100%-2rem)] max-w-lg max-h-[92dvh]
                       flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative flex flex-col rounded-2xl overflow-hidden
                         border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
              style={{
                background: "linear-gradient(155deg, #0f2013 0%, #08100a 100%)",
              }}
            >
              {/* Golden top accent line */}
              <div
                className="h-[2px] w-full shrink-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent 5%, hsl(37 90% 55%) 40%, hsl(37 90% 55%) 60%, transparent 95%)",
                }}
              />

              {/* ── Header ─────────────────────────────────────── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "hsl(37 90% 55% / 0.14)" }}
                  >
                    <ShoppingBag size={17} style={{ color: "hsl(37 90% 55%)" }} />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-white text-[17px] leading-none">
                      Review Your Order
                    </h2>
                    <p className="text-white/35 text-[11px] mt-[3px]">
                      {totalQty} {totalQty === 1 ? "item" : "items"} — confirm before sending to WhatsApp
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeOrderReview}
                  className="w-8 h-8 rounded-full flex items-center justify-center
                             text-white/35 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close order review"
                >
                  <X size={17} />
                </button>
              </div>

              {/* ── Item list (scrollable) ──────────────────────── */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2 min-h-0">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
                    <ShoppingBag size={42} className="text-white/10" />
                    <p className="text-white/35 text-sm font-medium">
                      Your cart is empty
                    </p>
                    <p className="text-white/20 text-xs">
                      Add something delicious first!
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 32, height: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-3 rounded-xl px-3.5 py-3"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        {/* Emoji icon */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 select-none"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                          aria-hidden
                        >
                          {itemEmoji(item.id)}
                        </div>

                        {/* Name + variant + price line */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm leading-snug truncate">
                            {item.name}
                          </p>
                          {item.variant && (
                            <p className="text-white/40 text-[11px] leading-snug truncate">
                              {item.variant}
                            </p>
                          )}
                          <p
                            className="text-[11px] font-semibold mt-0.5"
                            style={{ color: "hsl(37 90% 60%)" }}
                          >
                            Rs. {item.price.toLocaleString()} × {item.qty}
                            <span className="text-white/50 font-normal mx-1">→</span>
                            Rs. {(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>

                        {/* ± stepper */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center
                                       text-white/50 hover:text-white transition-colors touch-manipulation"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-white select-none">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center
                                       text-white/50 hover:text-white transition-colors touch-manipulation"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center
                                     text-white/20 hover:text-red-400 hover:bg-red-500/10
                                     transition-colors shrink-0 touch-manipulation"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* ── Footer ─────────────────────────────────────── */}
              <div className="border-t border-white/[0.07] px-5 py-4 space-y-3.5 shrink-0">
                {/* Grand total */}
                {items.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-[11px] uppercase tracking-widest font-medium">
                        Grand Total
                      </p>
                      <p
                        className="font-heading font-black text-[26px] leading-none mt-0.5"
                        style={{ color: "hsl(37 90% 55%)" }}
                      >
                        Rs. {subtotal.toLocaleString()}
                      </p>
                    </div>
                    {/* Clear cart */}
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-white/20 hover:text-red-400 transition-colors py-1 px-2 touch-manipulation"
                    >
                      Clear cart
                    </button>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={closeOrderReview}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold
                               text-white/50 border border-white/10
                               hover:border-white/25 hover:text-white/80
                               transition-colors touch-manipulation"
                  >
                    ← Continue Shopping
                  </motion.button>

                  {items.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleConfirm}
                      className="flex-[1.6] py-3 rounded-xl text-sm font-bold
                                 flex items-center justify-center gap-2
                                 touch-manipulation relative overflow-hidden"
                      style={{
                        background: "hsl(37 90% 55%)",
                        color: "#060d08",
                      }}
                    >
                      {/* Shimmer */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                        }}
                        animate={{ x: ["-110%", "210%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                      <MessageCircle size={15} />
                      Confirm Order
                    </motion.button>
                  )}
                </div>

                {/* Safety note */}
                <p className="text-center text-[10px] text-white/20 leading-relaxed">
                  Your order will be sent to WhatsApp after confirming your branch.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
