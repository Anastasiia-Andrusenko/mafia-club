import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/constants/site";

const buildRobots = () =>
  `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800",
  );
  res.write(buildRobots());
  res.end();
  return { props: {} };
};

// The response is written in getServerSideProps; nothing is rendered.
export default function Robots() {
  return null;
}
