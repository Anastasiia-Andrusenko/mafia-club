// pages/api/reviews.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    if (!rateLimit(`rv-r:${getClientIp(req)}`, READ_LIMIT, READ_WINDOW_MS)) {
      res.setHeader("Retry-After", String(READ_WINDOW_MS / 1000));
      return sendError(res, 429, "Too many requests");
    }

    try {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM reviews ORDER BY date DESC LIMIT ?",
        [MAX_REVIEWS],
      );
      return res.status(200).json(rows);
    } catch (err) {
      // Raw DB errors can expose schema/host details - log only, never return.
      console.error(
        "🔥 DB READ error:",
        (err as { code?: string })?.code ??
          (err instanceof Error ? err.message : "unknown"),
      );
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
      await db.query("INSERT INTO reviews (name, comment) VALUES (?, ?)", [
        name,
        comment,
      ]);
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
