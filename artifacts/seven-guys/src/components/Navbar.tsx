import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/WhatsApp_Image_2026-07-18_at_4.55.48_PM_1784372602729.webp";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Deals", href: "#deals" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Branches", href: "#branches" },
  { name: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  function CartIconButton({ className }: { className?: string }) {
    return (
      <button
        onClick={openCart}
        className={cn(
          "relative p-2 rounded-full hover:bg-primary/5 transition-colors touch-manipulation",
          className,
        )}
        aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
      >
        <ShoppingCart size={22} className="text-primary" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-secondary text-primary text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center leading-none pointer-events-none">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </button>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="flex items-center gap-3"
        >
          <img
            src={logoImg}
            alt="Seven Guys Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-sm"
          />
          <div className="font-heading font-extrabold text-xl leading-none tracking-tight text-primary">
            SEVEN <span className="text-secondary">GUYS</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={cn(
                "font-medium text-sm hover:text-secondary transition-colors",
                isScrolled ? "text-foreground/80" : "text-foreground/90",
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop right side: cart icon + Order Now */}
        <div className="hidden md:flex items-center gap-2">
          <CartIconButton />
          <Button
            asChild
            className="rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <a
              href="https://wa.me/923194800036"
              target="_blank"
              rel="noreferrer"
            >
              Order Now
            </a>
          </Button>
        </div>

        {/* Mobile right side: cart icon + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <CartIconButton />
          <button
            className="p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-6 text-2xl font-heading font-bold text-primary">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="border-b border-primary/10 pb-4"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-8 space-y-3">
            {/* Cart button in mobile menu */}
            <Button
              size="lg"
              variant="outline"
              className="w-full text-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
            >
              <ShoppingCart size={20} className="mr-2" />
              View Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-secondary text-primary text-xs font-black px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button size="lg" className="w-full text-xl" asChild>
              <a
                href="https://wa.me/923194800036"
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
