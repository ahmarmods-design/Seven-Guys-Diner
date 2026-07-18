import { SiWhatsapp } from "react-icons/si";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923194800036"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center group"
      aria-label="Order on WhatsApp"
    >
      <div className="absolute -inset-2 bg-[#25D366]/30 rounded-full animate-ping pointer-events-none"></div>
      <SiWhatsapp size={32} className="relative z-10" />
      <span className="absolute right-full mr-4 bg-white text-[#0A2612] px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Order Now
      </span>
    </a>
  );
}

export function MobileStickyOrder() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <a
        href="https://wa.me/923194800036"
        target="_blank"
        rel="noreferrer"
        className="w-full bg-[#25D366] text-white h-12 rounded-full font-bold flex items-center justify-center gap-2 shadow-md"
      >
        <SiWhatsapp size={20} />
        Order on WhatsApp
      </a>
    </div>
  );
}
