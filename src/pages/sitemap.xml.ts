import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/constants/site";

// Public, indexable routes (trailing slash matches next.config trailingSlash).
// /basket is intentionally excluded (noindex).
const ROUTES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services/", changefreq: "monthly", priority: "0.9" },
  { path: "/services/vip/", changefreq: "monthly", priority: "0.9" },
  { path: "/services/corporate/", changefreq: "monthly", priority: "0.9" },
  { path: "/services/outdoor/", changefreq: "monthly", priority: "0.9" },
  { path: "/services/kids/", changefreq: "monthly", priority: "0.9" },
  { path: "/services/birthday/", changefreq: "monthly", priority: "0.9" },
  { path: "/services/extras/", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery/", changefreq: "monthly", priority: "0.7" },
  { path: "/shop/", changefreq: "monthly", priority: "0.7" },
  { path: "/reviews/", changefreq: "weekly", priority: "0.6" },
  { path: "/rules/", changefreq: "yearly", priority: "0.6" },
];

const buildSitemap = () =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  ({ path, changefreq, priority }) =>
    `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800",
  );
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

// The response is written in getServerSideProps; nothing is rendered.
export default function Sitemap() {
  return null;
}
