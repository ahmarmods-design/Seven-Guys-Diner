export const WHATSAPP_NUMBER = "923194800036";

export const BRANCHES = [
  {
    id: "sialkot-road",
    name: "Sialkot Road Branch",
    address: "Jugna Bazar, Sialkot Road, Gujranwala",
  },
  {
    id: "civil-lines",
    name: "Mumtaz Market Branch",
    address: "Mumtaz Market, Civil Lines, Gujranwala",
  },
  {
    id: "kings-mall",
    name: "Kings Mall Branch",
    address: "Kings Mall, Judicial Housing Colony, Gujranwala",
  },
] as const;

export type BranchId = (typeof BRANCHES)[number]["id"];
export type BranchEntry = (typeof BRANCHES)[number];

/**
 * Builds the WhatsApp wa.me URL with the order message and nearest branch.
 * For all orders (delivery or pickup) we label it "Nearest Branch" so it
 * works for both dine-in / takeaway and home delivery.
 */
export function buildWhatsAppUrl(message: string, branchName: string): string {
  const fullMessage = `${message}\n\nNearest Branch: ${branchName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
}
