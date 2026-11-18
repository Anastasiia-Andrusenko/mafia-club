import Head from "next/head";

interface JsonLdProps {
  /** Unique key so next/head de-duplicates the tag across re-renders. */
  id: string;
  data: Record<string, unknown>;
}

/** Serialises JSON-LD safely (prevents "</script>" breaking out of the tag). */
const serialize = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const JsonLd: React.FC<JsonLdProps> = ({ id, data }) => (
  <Head>
    <script
      key={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  </Head>
);

export default JsonLd;
