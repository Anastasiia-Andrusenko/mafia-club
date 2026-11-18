/**
 * Idempotent database setup: creates the `reviews` schema if missing and seeds
 * the historical reviews from public/reviews.json (skipping any that exist).
 *
 *   vercel env pull .env.local   # once, provides DATABASE_URL
 *   npm run db:setup
 *
 * Safe to run any number of times. Never prints connection details.
 */
import { readFile } from "fs/promises";
import path from "path";
import {
  countReviews,
  ensureReviewsSchema,
  seedReviews,
  type SeedReview,
} from "../src/lib/reviewsStore";

async function main() {
  const raw = await readFile(
    path.join(process.cwd(), "public", "reviews.json"),
    "utf-8",
  );
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error("public/reviews.json is not an array");

  const reviews = (data as Partial<SeedReview>[]).filter(
    (r): r is SeedReview =>
      !!r &&
      Number.isInteger(r.id) &&
      typeof r.name === "string" &&
      typeof r.comment === "string" &&
      typeof r.date === "string" &&
      !Number.isNaN(new Date(r.date).getTime()),
  );
  if (reviews.length !== data.length) {
    throw new Error(
      `public/reviews.json: ${data.length - reviews.length} invalid entries`,
    );
  }

  await ensureReviewsSchema();
  const inserted = await seedReviews(reviews);
  const total = await countReviews();
  console.log(
    `✅ Schema ready. Seeded ${inserted} new of ${reviews.length} historical reviews (${total} total in DB).`,
  );
}

main().catch((err) => {
  // Log the driver's code/message only - never the connection string.
  console.error(
    "❌ DB setup failed:",
    (err as { code?: string })?.code ??
      (err instanceof Error ? err.message : "unknown"),
  );
  process.exit(1);
});
