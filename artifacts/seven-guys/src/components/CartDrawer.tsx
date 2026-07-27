import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    removeItem,
    updateQty,
    clearCart,
    cartOpen,
    closeCart,
    openOrderReview,
  } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />

          {/* Drawer — slides in from right, full height */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            // Prevent backdrop click from propagating through the drawer
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-primary" />
                <h2 className="font-heading font-bold text-xl text-primary">
                  Your Order
                </h2>
                {totalItems > 0 && (
                  <span className="bg-secondary text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Item list ───────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                  <ShoppingBag size={56} className="text-gray-200" />
                  <p className="font-medium text-muted-foreground">
                    Your cart is empty
                  </p>
                  <Button variant="outline" onClick={closeCart}>
                    Browse Menu
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
                  >
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-primary text-sm leading-tight">
                        {item.name}
                      </p>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                          {item.variant}
                        </p>
                      )}
                      <p className="text-sm font-bold text-primary mt-1.5">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>

                    {/* Qty stepper */}
                    <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-bold select-none">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors shrink-0 touch-manipulation"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* ── Footer / Checkout ────────────────────────────────── */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    Subtotal
                  </span>
                  <span className="font-heading font-black text-2xl text-primary">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full text-base"
                  onClick={() => {
                    closeCart();
                    openOrderReview();
                  }}
                >
                  Review &amp; Order
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-sm text-muted-foreground hover:text-red-500 transition-colors py-1 touch-manipulation"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
