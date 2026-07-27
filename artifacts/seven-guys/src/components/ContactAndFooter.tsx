import { SiInstagram, SiTiktok, SiFacebook, SiWhatsapp } from "react-icons/si";
import { Phone, MapPin, Clock } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import logoImg from "@assets/WhatsApp_Image_2026-07-18_at_4.55.48_PM_1784372602729.webp";

export function ContactAndFooter() {
  const { website, branches, hours } = useCMS();

  return (
    <footer className="bg-[#081e0e] text-white/80 pt-20 pb-8 border-t-[10px] border-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Seven Guys Logo" className="w-16 h-16 rounded-full border-2 border-secondary" />
              <div className="font-heading font-extrabold text-2xl text-white leading-none">
                SEVEN <br /><span className="text-secondary">GUYS</span>
              </div>
            </div>
            <p className="text-sm">{website.footerText}</p>
            <div className="flex items-center gap-4">
              {website.instagram && (
                <a href={website.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-[#081e0e] transition-colors">
                  <SiInstagram size={20} />
                </a>
              )}
              {website.tiktok && (
                <a href={website.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-[#081e0e] transition-colors">
                  <SiTiktok size={20} />
                </a>
              )}
              {website.facebook && (
                <a href={website.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-[#081e0e] transition-colors">
                  <SiFacebook size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["#home","#menu","#deals","#branches"].map((href, i) => (
                <li key={href}><a href={href} className="hover:text-secondary transition-colors capitalize">{["Home","Menu","Deals","Locations"][i]}</a></li>
              ))}
              <li>
                <a href={`https://wa.me/${website.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">
                  Order Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <a href={`tel:${website.phone.replace(/[^0-9]/g,"")}`} className="hover:text-secondary transition-colors text-lg font-bold text-white">{website.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <SiWhatsapp className="text-[#25D366] shrink-0" size={20} />
                <a href={`https://wa.me/${website.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-secondary shrink-0" size={20} />
                <span>Delivery: All Over Gujranwala<br/>Hours: {hours.openTime} – {hours.closeTime}</span>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-6">Our Branches</h4>
            <ul className="space-y-4 text-sm">
              {branches.map(b => (
                <li key={b.id} className="flex items-start gap-3">
                  <MapPin className="text-secondary shrink-0 mt-1" size={16} />
                  <span>{b.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4">
            <a
              href="https://wa.me/923372905356?text=Assalam-o-Alaikum%20Ahmar%20Studio!%20I%20visited%20the%20Seven%20Guys%20website%20and%20I'm%20interested%20in%20getting%20a%20professional%20website%20for%20my%20business."
              target="_blank" rel="noreferrer"
              className="group cursor-pointer flex flex-col items-center md:items-start shrink-0"
            >
              <span className="text-[9px] text-white/35 tracking-[0.2em] uppercase font-medium mb-[3px]">Designed by</span>
              <span className="relative text-[13px] font-bold tracking-wide text-white/60 group-hover:text-secondary transition-colors duration-300">
                {website.designerCredit}
                <span className="absolute left-0 -bottom-[2px] h-[1.5px] w-0 rounded-full bg-secondary group-hover:w-full transition-all duration-300" />
              </span>
            </a>
            <p className="text-[11px] text-white/40 tracking-wide text-center leading-relaxed order-last md:order-none">
              {website.copyright}
            </p>
            <p className="font-heading font-bold text-white/40 tracking-[0.2em] text-[11px] shrink-0">
              GUJRANWALA, PAKISTAN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
