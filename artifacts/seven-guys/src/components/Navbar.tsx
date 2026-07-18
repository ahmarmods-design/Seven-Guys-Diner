import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/WhatsApp_Image_2026-07-18_at_4.55.48_PM_1784372602729.jpeg";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Seven Guys Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-sm"
          />
          <div className={cn("font-heading font-extrabold text-xl leading-none tracking-tight", isScrolled ? "text-primary" : "text-primary")}>
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
                isScrolled ? "text-foreground/80" : "text-foreground/90"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="rounded-full shadow-lg hover:scale-105 transition-transform">
            <a href="https://wa.me/923194800036" target="_blank" rel="noreferrer">
              Order Now
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Panel */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
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
        <div className="mt-8">
          <Button size="lg" className="w-full text-xl" asChild>
            <a href="https://wa.me/923194800036" target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
