import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "@/hooks/useTranslation";
import { BUSINESS, OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/site";
import { PageKey, seoCopy } from "@/locales/seo";
import { FAQ_KEYS } from "@/components/FAQ/FaqSection";
import JsonLd from "./JsonLd";

/** Maps a Next.js route (router.pathname) to its SEO copy key. */
const ROUTE_TO_PAGE: Record<string, PageKey> = {
  "/": "home",
  "/services": "services",
  "/services/vip": "vip",
  "/services/corporate": "corporate",
  "/services/outdoor": "outdoor",
  "/services/kids": "kids",
  "/services/birthday": "birthday",
  "/services/extras": "extras",
  "/gallery": "gallery",
  "/shop": "shop",
  "/reviews": "reviews",
  "/rules": "rules",
  "/basket": "basket",
};

/** Pages that should stay out of the search index. */
const NOINDEX: PageKey[] = ["basket"];

/** Service landing pages that get Service + Breadcrumb structured data. */
const SERVICE_PAGES: PageKey[] = [
  "vip",
  "corporate",
  "outdoor",
  "kids",
  "birthday",
  "extras",
];

const OG_LOCALE = { ua: "uk_UA", ru: "ru_RU" } as const;

// The site uses trailingSlash: true, so canonical URLs end with "/".
const toCanonicalPath = (pathname: string) =>
  pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;

const Seo: React.FC = () => {
  const router = useRouter();
  const { language, t } = useTranslation();

  const page = ROUTE_TO_PAGE[router.pathname];

  // Unknown routes (404 / error pages) must never be indexed.
  if (!page) {
    return (
      <Head>
        <meta key="robots" name="robots" content="noindex, nofollow" />
      </Head>
    );
  }

  const copy = seoCopy[language];
  const { title, description } = copy.pages[page];
  const canonicalPath = toCanonicalPath(router.pathname);
  const url = `${SITE_URL}${canonicalPath}`;
  const image = `${SITE_URL}${OG_IMAGE.path}`;
  const robots = NOINDEX.includes(page)
    ? "noindex, follow"
    : "index, follow, max-image-preview:large";
  const otherLocale = language === "ua" ? OG_LOCALE.ru : OG_LOCALE.ua;
  const city = BUSINESS.city[language];

  const businessId = `${SITE_URL}/#business`;
  const business = {
    "@type": "EntertainmentBusiness",
    "@id": businessId,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/img/logo.png`,
    image,
    description: copy.siteDescription,
    email: BUSINESS.email,
    telephone: BUSINESS.phones,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: BUSINESS.country,
    },
    areaServed: { "@type": "City", name: city },
    sameAs: BUSINESS.sameAs,
  };

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />
        <meta key="robots" name="robots" content={robots} />
        <link key="canonical" rel="canonical" href={url} />

        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta key="og:url" property="og:url" content={url} />
        <meta key="og:image" property="og:image" content={image} />
        <meta
          key="og:image:width"
          property="og:image:width"
          content={String(OG_IMAGE.width)}
        />
        <meta
          key="og:image:height"
          property="og:image:height"
          content={String(OG_IMAGE.height)}
        />
        <meta key="og:image:alt" property="og:image:alt" content={SITE_NAME} />
        <meta
          key="og:locale"
          property="og:locale"
          content={OG_LOCALE[language]}
        />
        <meta
          key="og:locale:alternate"
          property="og:locale:alternate"
          content={otherLocale}
        />

        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:title" name="twitter:title" content={title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta key="twitter:image" name="twitter:image" content={image} />
      </Head>

      {page === "home" && (
        <>
          <JsonLd
            id="ld-business"
            data={{ "@context": "https://schema.org", ...business }}
          />
          <JsonLd
            id="ld-website"
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: SITE_NAME,
              inLanguage: language === "ua" ? "uk" : "ru",
              publisher: { "@id": businessId },
            }}
          />
          {/* FAQ is rendered by <FaqSection /> on several pages; mark it up once (home). */}
          <JsonLd
            id="ld-faq"
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_KEYS.filter((key) => t.info[key]).map((key) => ({
                "@type": "Question",
                name: t.info[key],
                acceptedAnswer: {
                  "@type": "Answer",
                  text: t.info[`${key}Text`],
                },
              })),
            }}
          />
        </>
      )}

      {SERVICE_PAGES.includes(page) && (
        <>
          <JsonLd
            id="ld-service"
            data={{
              "@context": "https://schema.org",
              "@type": "Service",
              name: title.split("|")[0].trim(),
              description,
              url,
              provider: {
                "@type": "EntertainmentBusiness",
                "@id": businessId,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
              },
              areaServed: { "@type": "City", name: city },
              image,
            }}
          />
          <JsonLd
            id="ld-breadcrumbs"
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.nav.main,
                  item: `${SITE_URL}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t.nav.services,
                  item: `${SITE_URL}/services/`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: title.split("|")[0].trim(),
                  item: url,
                },
              ],
            }}
          />
        </>
      )}
    </>
  );
};

export default Seo;
