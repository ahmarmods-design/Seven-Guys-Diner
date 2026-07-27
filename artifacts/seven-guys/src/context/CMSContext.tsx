import { createContext, useContext, useState, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CMSDeal {
  id: string;
  name: string;
  items: string[];
  price: number;
  enabled: boolean;
  color: string;
  textColor: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
}

export interface CMSPizzaItem {
  id: string; kind: "pizza";
  name: string; desc?: string;
  priceMed: number; priceLg: number;
  available: boolean; featured: boolean;
  imageUrl?: string; sortOrder?: number;
}
export interface CMSSimpleItem {
  id: string; kind: "simple";
  name: string; desc?: string;
  price: number; discountPrice?: number;
  emoji?: string; imageUrl?: string;
  available: boolean; featured: boolean;
  sortOrder?: number;
}
export type CMSMenuItem = CMSPizzaItem | CMSSimpleItem;
export type CMSMenuData = Record<string, CMSMenuItem[]>;

export interface CMSBranch {
  id: string; name: string; address: string;
  phone: string; whatsapp: string;
  mapCode: string; mapLink: string;
  imageUrl?: string; deliveryAreas: string[];
}

export interface CMSBusinessHours {
  openTime: string; closeTime: string;
  holidayClosed: boolean; temporaryClosed: boolean; note: string;
}

export interface CMSGalleryItem { id: string; url: string; alt: string; }

export interface CMSReview {
  id: string; name: string; text: string;
  time: string; rating: number; visible: boolean;
}

export interface CMSHomepage {
  heroTagline: string;
  heroDescription: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaPrimary?: string;
  heroCtaSecondary?: string;
  bannerImages?: string[];
}

export interface CMSWebsiteSettings {
  phone: string; whatsapp: string; email: string; address: string;
  footerText: string; copyright: string; designerCredit: string;
  facebook: string; instagram: string; tiktok: string; googleMaps: string;
  seoTitle: string; seoDescription: string; seoKeywords: string;
  ogImage?: string;
}

export interface CMSDeliveryArea {
  id: string; name: string; charge: number; available: boolean;
}
export interface CMSDeliverySettings {
  available: boolean;
  minimumOrder: number;
  deliveryCharge: number;
  freeDeliveryAbove: number;
  estimatedTime: string;
  areas: CMSDeliveryArea[];
  note: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_DEALS: CMSDeal[] = [
  { id:"d1", name:"Single Guy",      items:["1 Fillet Crunch Burger","1 Drink","Regular Fries"],           price:470,  enabled:true, color:"bg-primary",   textColor:"text-white"    },
  { id:"d2", name:"2 Guys",          items:["2 Fillet Crunch Burgers","2 Drinks","1 Regular Fries"],       price:850,  enabled:true, color:"bg-secondary",  textColor:"text-primary"  },
  { id:"d3", name:"Single Guy Plus", items:["1 Zinger Burger","1 Drink","1 Regular Fries"],                price:580,  enabled:true, color:"bg-primary",   textColor:"text-white"    },
  { id:"d4", name:"2 Guys Plus",     items:["2 Zinger Burgers","2 Drinks","1 Regular Fries"],              price:1050, enabled:true, color:"bg-[#0A2612]", textColor:"text-secondary"},
];

export const DEFAULT_CATEGORIES: string[] = ["Pizza","Burgers","Sides","Wings","Drinks"];

export const DEFAULT_MENU: CMSMenuData = {
  Pizza: [
    { id:"p1", kind:"pizza", name:"Double Beast",   priceMed:650, priceLg:1399, desc:"Chicken Tikka, Kabab, Fajita, Olives, Capsicum & Extra Cheese",              available:true, featured:true,  sortOrder:1 },
    { id:"p2", kind:"pizza", name:"Detroit Fajita", priceMed:650, priceLg:1399, desc:"Chicken Fajita, Onions, Capsicums, Green Jalapeño Sauce",                    available:true, featured:false, sortOrder:2 },
    { id:"p3", kind:"pizza", name:"Malai Boti",     priceMed:650, priceLg:1399, desc:"BBQ Malai Boti Chicken, Creamy Sauce, Onion, Black Olive",                   available:true, featured:false, sortOrder:3 },
    { id:"p4", kind:"pizza", name:"Tandoori BBQ",   priceMed:650, priceLg:1399, desc:"Kebab Bites, Chicken Tikka, Olives, Capsicum, Extra Cheese",                 available:true, featured:false, sortOrder:4 },
    { id:"p5", kind:"pizza", name:"Hot Peri Peri",  priceMed:650, priceLg:1399, desc:"Hot Peri Peri Sauce, Spicy Peri Peri Chicken, Red Jalapeño",                 available:true, featured:false, sortOrder:5 },
    { id:"p6", kind:"pizza", name:"Detroit Tikka",  priceMed:650, priceLg:1399, desc:"Chicken Tikka, Onion, Tomatoes, Olives, Detroit Sauce",                      available:true, featured:false, sortOrder:6 },
  ],
  Burgers: [
    { id:"b1", kind:"simple", name:"Super Zinger Burger",   price:460, available:true, featured:false, sortOrder:1 },
    { id:"b2", kind:"simple", name:"Double Crunch Burger",  price:399, available:true, featured:true,  sortOrder:2 },
    { id:"b3", kind:"simple", name:"Chicken Chapli Burger", price:360, available:true, featured:false, sortOrder:3 },
    { id:"b4", kind:"simple", name:"Fillet Crunch Burger",  price:300, available:true, featured:false, sortOrder:4 },
  ],
  Sides: [
    { id:"s1", kind:"simple", name:"Loaded Fries",            price:600, desc:"Cheese sauce, grilled chicken, olives, jalapeños, bell peppers", available:true, featured:true,  sortOrder:1 },
    { id:"s2", kind:"simple", name:"Foot Long Fries",         price:680, available:true, featured:false, sortOrder:2 },
    { id:"s3", kind:"simple", name:"Chicken Nuggets (6 pcs)", price:399, emoji:"🍗", desc:"6 crispy golden chicken nuggets with signature dips.", available:true, featured:false, sortOrder:3 },
    { id:"s4", kind:"simple", name:"Plain Fries",             price:250, available:true, featured:false, sortOrder:4 },
    { id:"s5", kind:"simple", name:"Regular Fries",           price:150, available:true, featured:false, sortOrder:5 },
  ],
  Wings: [
    { id:"w1", kind:"simple", name:"Wings Bucket (10pcs)",     price:680, desc:"Thai Sweet Chillies, Peri Peri Hot, or Plain Hot", available:true, featured:true,  sortOrder:1 },
    { id:"w2", kind:"simple", name:"Oven Baked Wings (6pcs)",  price:420, available:true, featured:false, sortOrder:2 },
    { id:"w3", kind:"simple", name:"Garlic Mayo Wings (6pcs)", price:420, available:true, featured:false, sortOrder:3 },
    { id:"w4", kind:"simple", name:"Spicy Mayo Wings (6pcs)",  price:420, available:true, featured:false, sortOrder:4 },
  ],
  Drinks: [
    { id:"dr1", kind:"simple", name:"Drink 1.5 ltr",  price:220, available:true, featured:false, sortOrder:1 },
    { id:"dr2", kind:"simple", name:"NR 345ml",        price:80,  available:true, featured:false, sortOrder:2 },
    { id:"dr3", kind:"simple", name:"Water small",     price:70,  available:true, featured:false, sortOrder:3 },
    { id:"dr4", kind:"simple", name:"Extra Dips",      price:70,  desc:"Peri Peri / Detroit Special / Malai / Chipotle", available:true, featured:false, sortOrder:4 },
  ],
};

export const DEFAULT_BRANCHES: CMSBranch[] = [
  { id:"br1", name:"Jugna Bazar Branch",  address:"Jugna Bazar, Sialkot Road, Gujranwala",           phone:"0319-4800036", whatsapp:"923194800036", mapCode:"56R6+C9", mapLink:"https://plus.codes/56R6+C9",  deliveryAreas:["Gujranwala"] },
  { id:"br2", name:"Civil Lines Branch",  address:"Mumtaz Market, Civil Lines, Gujranwala",          phone:"0319-4800036", whatsapp:"923194800036", mapCode:"55JM+6H", mapLink:"https://plus.codes/55JM+6H", deliveryAreas:["Gujranwala"] },
  { id:"br3", name:"Kings Mall Branch",   address:"Kings Mall, Judicial Housing Colony, Gujranwala", phone:"0319-4800036", whatsapp:"923194800036", mapCode:"453Q+2R", mapLink:"https://plus.codes/453Q+2R", deliveryAreas:["Gujranwala"] },
];

export const DEFAULT_HOURS: CMSBusinessHours = {
  openTime:"14:00", closeTime:"02:00",
  holidayClosed:false, temporaryClosed:false, note:"",
};

export const DEFAULT_REVIEWS: CMSReview[] = [
  { id:"rv1", name:"Ahmed K.",  text:"Hands down the best Detroit pizza in Gujranwala. The crispy edges and the loaded cheese on the Double Beast are insane. Highly recommend!", time:"2 days ago",    rating:5, visible:true },
  { id:"rv2", name:"Sara M.",   text:"Finally a premium fast food joint in our city that actually feels international. The Double Crunch burger is a must-try. Ambiance at Kings Mall is 10/10.", time:"1 week ago",    rating:5, visible:true },
  { id:"rv3", name:"Hassan R.", text:"I order their loaded fries at least once a week. The cheese pull is real and the delivery is always fast and hot. Great customer service.", time:"2 weeks ago",   rating:5, visible:true },
  { id:"rv4", name:"Faizan A.", text:"Tried the Malai Boti Detroit pizza and it completely changed my perspective on pizza. Thick but airy crust. Seven Guys never disappoints.", time:"1 month ago",   rating:5, visible:true },
  { id:"rv5", name:"Zainab B.", text:"Perfect spot for late-night cravings. Love that they are open till 2 AM. The Peri Peri wings bucket is super spicy and flavorful.", time:"1 month ago",   rating:5, visible:true },
  { id:"rv6", name:"Bilal T.",  text:"Great deals for students and groups. The Deal 2 is our go-to whenever we hang out. Quality has been consistent since day one.", time:"2 months ago",  rating:5, visible:true },
];

export const DEFAULT_HOMEPAGE: CMSHomepage = {
  heroTagline:      "Gujranwala's Finest",
  heroDescription:  "Detroit-style square pizza with crispy caramelized edges. Gourmet burgers stacked high. Open until 2 AM, three locations across Gujranwala.",
  heroTitle:        "Gujranwala's Home of Detroit Pizza",
  heroSubtitle:     "Bold flavors. Premium craft. Melted cheese.",
  heroCtaPrimary:   "Order Now",
  heroCtaSecondary: "Explore Menu",
  bannerImages:     [],
};

export const DEFAULT_WEBSITE: CMSWebsiteSettings = {
  phone:"0319-4800036", whatsapp:"923194800036", email:"", address:"Gujranwala, Pakistan",
  footerText:"Gujranwala's Home of Detroit Pizza. Bold flavors, premium craft, and the kind of melted cheese you've been dreaming about.",
  copyright:"© 2025 Seven Guys Pizza & Burger. All Rights Reserved.",
  designerCredit:"Ahmar Studio",
  facebook:"https://www.facebook.com/share/193gwFL6sc/",
  instagram:"https://www.instagram.com/sevenguys.pk",
  tiktok:"https://www.tiktok.com/@sevenguys.pk",
  googleMaps:"",
  seoTitle:"Seven Guys Pizza & Burger | Detroit Pizza & Gourmet Burgers in Gujranwala",
  seoDescription:"Order Detroit-style square pizza and gourmet burgers in Gujranwala. 3 branches — Jugna Bazar, Civil Lines, Kings Mall. Delivery available 2PM–2AM. Call 0319-4800036.",
  seoKeywords:"Detroit pizza Gujranwala, pizza burger Gujranwala, Seven Guys, best pizza Pakistan",
  ogImage:"",
};

export const DEFAULT_DELIVERY: CMSDeliverySettings = {
  available:true, minimumOrder:400, deliveryCharge:100, freeDeliveryAbove:800,
  estimatedTime:"30–45 minutes",
  areas:[
    { id:"da1", name:"Gujranwala City",      charge:0,   available:true },
    { id:"da2", name:"Satellite Town",        charge:50,  available:true },
    { id:"da3", name:"Cantt Area",            charge:50,  available:true },
    { id:"da4", name:"Peoples Colony",        charge:50,  available:true },
    { id:"da5", name:"Model Town",            charge:80,  available:true },
  ],
  note:"Free delivery on orders above Rs. 800",
};

// ── Context ──────────────────────────────────────────────────────────────────

interface CMSContextType {
  deals:      CMSDeal[];
  menu:       CMSMenuData;
  categories: string[];
  branches:   CMSBranch[];
  hours:      CMSBusinessHours;
  gallery:    CMSGalleryItem[];
  reviews:    CMSReview[];
  homepage:   CMSHomepage;
  website:    CMSWebsiteSettings;
  delivery:   CMSDeliverySettings;
  ready:      boolean;
}

const CMSContext = createContext<CMSContextType>({
  deals: DEFAULT_DEALS, menu: DEFAULT_MENU, categories: DEFAULT_CATEGORIES,
  branches: DEFAULT_BRANCHES, hours: DEFAULT_HOURS, gallery: [],
  reviews: DEFAULT_REVIEWS, homepage: DEFAULT_HOMEPAGE, website: DEFAULT_WEBSITE,
  delivery: DEFAULT_DELIVERY, ready: false,
});

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [deals,      setDeals]      = useState<CMSDeal[]>(DEFAULT_DEALS);
  const [menu,       setMenu]       = useState<CMSMenuData>(DEFAULT_MENU);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [branches,   setBranches]   = useState<CMSBranch[]>(DEFAULT_BRANCHES);
  const [hours,      setHours]      = useState<CMSBusinessHours>(DEFAULT_HOURS);
  const [gallery,    setGallery]    = useState<CMSGalleryItem[]>([]);
  const [reviews,    setReviews]    = useState<CMSReview[]>(DEFAULT_REVIEWS);
  const [homepage,   setHomepage]   = useState<CMSHomepage>(DEFAULT_HOMEPAGE);
  const [website,    setWebsite]    = useState<CMSWebsiteSettings>(DEFAULT_WEBSITE);
  const [delivery,   setDelivery]   = useState<CMSDeliverySettings>(DEFAULT_DELIVERY);
  const [ready,      setReady]      = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("/api/cms");
        if (!res.ok) { setReady(true); return; }
        const json = await res.json();
        const d = (json.data ?? {}) as Record<string, unknown>;
        if (d.deals)          setDeals(d.deals as CMSDeal[]);
        if (d.menu)           setMenu(d.menu as CMSMenuData);
        if (d.categories)     setCategories(d.categories as string[]);
        if (d.branches)       setBranches(d.branches as CMSBranch[]);
        if (d.business_hours) setHours(d.business_hours as CMSBusinessHours);
        if (d.gallery)        setGallery(d.gallery as CMSGalleryItem[]);
        if (d.reviews)        setReviews(d.reviews as CMSReview[]);
        if (d.homepage)       setHomepage(d.homepage as CMSHomepage);
        if (d.website)        setWebsite(d.website as CMSWebsiteSettings);
        if (d.delivery)       setDelivery(d.delivery as CMSDeliverySettings);
        setReady(true);
      } catch { setReady(true); }
    };

    // Initial load.
    fetchAll();

    // ── Server-Sent Events ── real-time push from server on every admin save ──
    // Falls back to 30-second polling if SSE is unavailable.
    let sse: EventSource | null = null;
    let fallback: ReturnType<typeof setInterval> | null = null;

    const connectSSE = () => {
      try {
        sse = new EventSource("/api/cms/events");

        sse.addEventListener("connected", () => {
          // SSE is live — cancel any fallback polling.
          if (fallback) { clearInterval(fallback); fallback = null; }
        });

        sse.addEventListener("cms-update", () => {
          // Server just saved a change — refetch the full dataset immediately.
          fetchAll();
        });

        sse.onerror = () => {
          // Connection lost; clean up and start fallback polling until SSE reconnects.
          sse?.close();
          sse = null;
          if (!fallback) {
            fallback = setInterval(fetchAll, 3_000);
          }
          // Retry SSE after 5 seconds.
          setTimeout(connectSSE, 5_000);
        };
      } catch {
        // EventSource not supported — fall back to polling.
        if (!fallback) fallback = setInterval(fetchAll, 3_000);
      }
    };

    connectSSE();

    return () => {
      sse?.close();
      if (fallback) clearInterval(fallback);
    };
  }, []);

  return (
    <CMSContext.Provider value={{ deals, menu, categories, branches, hours, gallery, reviews, homepage, website, delivery, ready }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() { return useContext(CMSContext); }
