// pages/api/reviews.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { addReview, listReviews } from "@/lib/reviewsStore";
import { promises as fs } from "fs";
import path from "path";
import {
  getClientIp,
  getJsonObject,
  hasOnlyKeys,
  isSameOrigin,
  rateLimit,
  sendError,
} from "@/lib/apiGuard";

const MAX_NAME_LENGTH = 100;
const MAX_COMMENT_LENGTH = 2000;
const MAX_REVIEWS = 1000;

const WRITE_LIMIT = 3; // new reviews ...
const WRITE_WINDOW_MS = 10 * 60 * 1000; // ... per 10 minutes per IP
const READ_LIMIT = 60; // list requests ...
const READ_WINDOW_MS = 60 * 1000; // ... per minute per IP

// Raw bodies above this are rejected by Next with 413 before reaching us.
export const config = {
  api: { bodyParser: { sizeLimit: "16kb" } },
};

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const clean = (value: string) => value.replace(CONTROL_CHARS, "").trim();

type FallbackReview = {
  id: number | string;
  name: string;
  comment: string;
  date: string;
};

const time = (d: string) => {
  const n = new Date(d).getTime();
  return Number.isNaN(n) ? -Infinity : n;
};

/**
 * Read-only backup used when the database is unreachable. Never throws: a missing or
 * corrupted file yields null so the caller can answer with a generic 500.
 */
async function readFallbackReviews(): Promise<FallbackReview[] | null> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "public", "reviews.json"),
      "utf-8",
    );
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    return (data as Partial<FallbackReview>[])
      .filter(
        (r): r is FallbackReview =>
          !!r &&
          typeof r.name === "string" &&
          typeof r.comment === "string" &&
          typeof r.date === "string" &&
          (typeof r.id === "number" || typeof r.id === "string"),
      )
      .sort((a, b) => time(b.date) - time(a.date))
      .slice(0, MAX_REVIEWS);
  } catch {
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    if (!rateLimit(`rv-r:${getClientIp(req)}`, READ_LIMIT, READ_WINDOW_MS)) {
      res.setHeader("Retry-After", String(READ_WINDOW_MS / 1000));
      return sendError(res, 429, "Too many requests");
    }

    // A freshly published review must show up on the very next request.
    res.setHeader("Cache-Control", "no-store");

    try {
      const rows = await listReviews(MAX_REVIEWS);
      res.setHeader("X-Reviews-Source", "db");
      return res.status(200).json(rows);
    } catch (err) {
      // Raw DB errors can expose schema/host details - log only, never return.
      console.error(
        "🔥 DB READ error:",
        (err as { code?: string })?.code ??
          (err instanceof Error ? err.message : "unknown"),
      );
      // DB unreachable / query failed: serve the static backup instead.
      const fallback = await readFallbackReviews();
      if (fallback) {
        res.setHeader("X-Reviews-Source", "fallback");
        return res.status(200).json(fallback);
      }
      return sendError(res, 500, "Failed to fetch reviews");
    }
  }

  if (req.method === "POST") {
    if (!isSameOrigin(req)) {
      return sendError(res, 403, "Forbidden");
    }

    if (!rateLimit(`rv-w:${getClientIp(req)}`, WRITE_LIMIT, WRITE_WINDOW_MS)) {
      res.setHeader("Retry-After", String(WRITE_WINDOW_MS / 1000));
      return sendError(res, 429, "Too many requests");
    }

    const body = getJsonObject(req);
    // `date` is sent by the existing form but ignored (the DB sets it);
    // `website` is a honeypot that real users never fill in.
    if (!body || !hasOnlyKeys(body, ["name", "comment", "date", "website"])) {
      return sendError(res, 400, "Invalid request");
    }
    if (body.website !== undefined && body.website !== "") {
      return sendError(res, 400, "Invalid request");
    }

    if (typeof body.name !== "string" || typeof body.comment !== "string") {
      return sendError(res, 400, "Invalid request");
    }

    const name = clean(body.name);
    const comment = clean(body.comment);

    if (
      !name ||
      !comment ||
      name.length > MAX_NAME_LENGTH ||
      comment.length > MAX_COMMENT_LENGTH
    ) {
      return sendError(res, 400, "Invalid request");
    }

    try {
      // Published immediately. An identical (normalised) review that already
      // exists is rejected instead of being stored twice.
      const result = await addReview(name, comment);
      if (result === "duplicate") {
        return sendError(res, 409, "Duplicate review");
      }
      return res.status(200).json({ message: "Review added successfully!" });
    } catch (err) {
      console.error(
        "🔥 DB WRITE error:",
        (err as { code?: string })?.code ??
          (err instanceof Error ? err.message : "unknown"),
      );
      return sendError(res, 500, "Failed to add review");
    }
  }

  res.setHeader("Allow", "GET, POST");
  return sendError(res, 405, "Method not allowed");
}
