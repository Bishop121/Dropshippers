import sneakerImg from "@/assets/sneaker.jpg";

export const mockProduct = {
  id: "MD-9521X",
  name: "Premium Men's Sneakers",
  subtitle: "Phantom Black • Size 44",
  price: 45000,
  originalPrice: 65000,
  discountPct: 30,
  currency: "₦",
  rating: 4.8,
  reviews: 128,
  description:
    "Experience ultimate comfort and style with our latest urban collection. Engineered for daily wear with premium breathable materials and a cushioned sole technology that lasts all day.",
  perks: ["Free Delivery", "7-Day Returns", "Authentic Quality", "Size: 40 – 45"],
  image: sneakerImg,
  thumbs: [sneakerImg, sneakerImg, sneakerImg, sneakerImg],
  seller: {
    name: "Global Sneakers Ltd.",
    bank: "Standard Merchant Bank",
    account: "0049283741",
    location: "Lagos Distribution Hub",
    verified: true,
  },
};

export const mockBuyer = {
  name: "Goodness",
  email: "goodness@buyer.cheinly.app",
  phone: "+234 812 345 6789",
  address: "15, Victoria Island Estate, Lagos, Nigeria",
};

export const logisticsProviders = [
  { id: "cheinly", name: "Cheinly In-house", price: 2500, eta: "Today, 14:00 – 16:00", note: "Direct Route", recommended: true, reliability: 4.9 },
  { id: "hub", name: "Logistics Hub Prime", price: 1800, eta: "Tomorrow, 09:00 – 11:00", note: "Standard Delivery", reliability: 4.7 },
  { id: "swift", name: "SwiftCourier Network", price: 2200, eta: "Today, 17:00 – 19:00", note: "Express Bike", reliability: 4.4 },
  { id: "gigl", name: "GIGL", price: 3200, eta: "4 – 6 days", note: "" },
  { id: "gokada", name: "GOKADA", price: 1800, eta: "Same day", note: "" },
  { id: "uber", name: "UBER", price: 4500, eta: "Instant", note: "" },
  { id: "bolt", name: "BOLT", price: 4200, eta: "Instant", note: "" },
];

export const formatNaira = (n: number) =>
  `₦${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;