// Company configuration — update these values to personalize the website
export const COMPANY = {
  name: "Aravalli Decorations",
  tagline: "Premium Event Decoration & Management",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@aravallidecorations.com",
  address: "42, Anna Nagar Main Road, Madurai, Tamil Nadu 625020",
  city: "Madurai",
  state: "Tamil Nadu",
  instagram: "https://instagram.com/aravallidecorations",
  facebook: "https://facebook.com/aravallidecorations",
  youtube: "https://youtube.com/@aravallidecorations",
  whatsappMessage: "Hello, I would like to know more about your event decoration services.",
  foundedYear: 2014,
} as const;

export const getWhatsAppLink = (message?: string) => {
  const msg = encodeURIComponent(message || COMPANY.whatsappMessage);
  return `https://wa.me/${COMPANY.whatsapp}?text=${msg}`;
};
