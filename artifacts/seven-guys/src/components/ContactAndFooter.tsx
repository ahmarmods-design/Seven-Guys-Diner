import { SiInstagram, SiTiktok, SiFacebook, SiWhatsapp } from "react-icons/si";
import { Phone, MapPin, Clock } from "lucide-react";
import logoImg from "@assets/WhatsApp_Image_2026-07-18_at_4.55.48_PM_1784372602729.jpeg";

export function ContactAndFooter() {
  return (
    <footer className="bg-[#081e0e] text-white/80 pt-20 pb-8 border-t-[10px] border-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Seven Guys Logo" className="w-16 h-16 rounded-full border-2 border-secondary" />
              <div className="font-heading font-extrabold text-2xl text-white leading-none">
                SEVEN <br/><span className="text-secondary">GUYS</span>
              </div>
            </div>
            <p className="text-sm">
              Gujranwala's Home of Detroit Pizza. Bold flavors, premium craft, and the kind of melted cheese you've been dreaming about.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/sevenguys.pk" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-[#081e0e] transition-colors">
                <SiInstagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@sevenguys.pk" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-[#081e0e] transition-colors">
                <SiTiktok size={20} />
              </a>
              <a href="https://www.facebook.com/share/193gwFL6sc/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-[#081e0e] transition-colors">
                <SiFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-secondary transition-colors">Menu</a></li>
              <li><a href="#deals" className="hover:text-secondary transition-colors">Deals</a></li>
              <li><a href="#branches" className="hover:text-secondary transition-colors">Locations</a></li>
              <li><a href="https://wa.me/923194800036" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">Order Now</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <a href="tel:03194800036" className="hover:text-secondary transition-colors text-lg font-bold text-white">0319-4800036</a>
              </li>
              <li className="flex items-start gap-3">
                <SiWhatsapp className="text-[#25D366] shrink-0" size={20} />
                <a href="https://wa.me/923194800036" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-secondary shrink-0" size={20} />
                <span>Delivery: All Over Gujranwala<br/>Hours: 2:00 PM – 2:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Branches list */}
          <div>
            <h4 className="font-heading font-bold text-white text-xl mb-6">Our Branches</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={16} />
                <span>Jugna Bazar, Sialkot Road</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={16} />
                <span>Mumtaz Market, Civil Lines</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={16} />
                <span>Kings Mall, Judicial Colony</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Seven Guys Pizza &amp; Burger. All Rights Reserved.</p>
          <p className="font-heading font-bold text-white/50 tracking-wider">GUJRANWALA, PAKISTAN</p>
        </div>

        {/* Designer credit */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-white/25 tracking-wide">
            Designed by{" "}
            <a
              href="https://wa.me/923372905356?text=Assalam-o-Alaikum%20Ahmar%20Studio!%20I%20visited%20the%20Seven%20Guys%20website%20and%20I'm%20interested%20in%20getting%20a%20professional%20website%20for%20my%20business."
              target="_blank"
              rel="noreferrer"
              className="inline-block text-white/40 font-semibold cursor-pointer
                         transition-all duration-300 ease-out
                         hover:text-secondary hover:tracking-widest"
            >
              Ahmar Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
