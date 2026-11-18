/**
 * Canonical site origin used for <link rel="canonical">, Open Graph URLs,
 * sitemap.xml, robots.txt and JSON-LD.
 *
 * Override on Vercel with NEXT_PUBLIC_SITE_URL (e.g. https://www.mafiadream.com.ua).
 * It is inlined at build time, so redeploy after changing it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mafiadream.com.ua"
).replace(/\/+$/, "");

export const SITE_NAME = "Mafia Dream Club";

/** Default social-preview image (path inside /public). */
export const OG_IMAGE = {
  path: "/img/hero.webp",
  width: 1440,
  height: 1024,
};

/**
 * Public business facts reused only for structured data (JSON-LD).
 * Keep in sync with the Footer contact links.
 */
export const BUSINESS = {
  email: "info@mafiadream.com.ua",
  phones: ["+380976258545", "+380665986425"],
  city: { ua: "Київ", ru: "Киев" },
  country: "UA",
  sameAs: [
    "https://www.youtube.com/user/MafiaDreamClub",
    "https://t.me/Khovaka",
    "https://www.facebook.com/MafiaDreamClub",
  ],
};
