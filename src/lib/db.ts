import { neon } from "@neondatabase/serverless";

/**
 * Serverless-safe Postgres access (Neon over HTTP).
 *
 * Every query is a single stateless HTTPS request, so there is no pool and no
 * connection to leak or exhaust when many Vercel instances spin up. The
 * Vercel <-> Neon integration injects `DATABASE_URL` (pooled) - nothing else
 * needs configuring. The client is created lazily so builds and pages that
 * never touch the DB work without any env var.
 */

// Fail fast when Neon is unreachable so callers can serve the static backup
// instead of stalling the page.
const QUERY_TIMEOUT_MS = 4000;

type Sql = ReturnType<typeof neon>;
let client: Sql | null = null;

const getClient = (): Sql => {
  if (client) return client;
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    throw Object.assign(new Error("DATABASE_URL is not configured"), {
      code: "DB_NOT_CONFIGURED",
    });
  }
  client = neon(url);
  return client;
};

/**
 * Runs one parameterised statement ($1, $2, ...) and returns its rows.
 * Never interpolate user input into `text` - always pass it via `params`.
 */
export async function query<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const rows = await getClient().query(text, params, {
    fetchOptions: { signal: AbortSignal.timeout(QUERY_TIMEOUT_MS) },
  });
  return rows as unknown as T[];
}
