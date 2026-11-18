// pages/api/sendToTelegram.ts
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getClientIp,
  getJsonObject,
  hasOnlyKeys,
  isSameOrigin,
  rateLimit,
  sendError,
} from "@/lib/apiGuard";

/** Telegram rejects messages longer than 4096 characters. */
const MAX_MESSAGE_LENGTH = 4096;
const RATE_LIMIT = 8; // requests ...
const RATE_WINDOW_MS = 10 * 60 * 1000; // ... per 10 minutes per IP
// Must stay well below the platform's function limit (10s on Hobby): if the
// abort fires at/after that limit Vercel kills the invocation first and the
// client gets a bare 504 instead of our 502 + a useful log line.
const TELEGRAM_TIMEOUT_MS = 6000;

// Raw bodies above this are rejected by Next with 413 before reaching us.
export const config = {
  api: { bodyParser: { sizeLimit: "32kb" } },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendError(res, 405, "Method not allowed");
  }

  if (!isSameOrigin(req)) {
    return sendError(res, 403, "Forbidden");
  }

  if (!rateLimit(`tg:${getClientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    res.setHeader("Retry-After", String(RATE_WINDOW_MS / 1000));
    return sendError(res, 429, "Too many requests");
  }

  const body = getJsonObject(req);
  // `website` is a honeypot: real users never fill it in.
  if (!body || !hasOnlyKeys(body, ["message", "website"])) {
    return sendError(res, 400, "Invalid request");
  }
  if (body.website !== undefined && body.website !== "") {
    return sendError(res, 400, "Invalid request");
  }

  const { message } = body;
  if (
    typeof message !== "string" ||
    message.trim().length === 0 ||
    message.length > MAX_MESSAGE_LENGTH ||
    message.includes("\0")
  ) {
    return sendError(res, 400, "Invalid request");
  }

  const TELEGRAM_BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TG_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("❌ Telegram credentials are not configured");
    return sendError(res, 500, "Service unavailable");
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "MarkdownV2",
        }),
        signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok) {
      // Log Telegram's description server-side only; never echo it to clients.
      console.error("❌ Telegram error:", response.status, data?.description);
      return sendError(res, 502, "Failed to send message");
    }

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    // Do not log the error object: fetch errors can embed the bot-token URL.
    const name = error instanceof Error ? error.name : "unknown";
    console.error(
      name === "TimeoutError"
        ? `❌ Telegram did not answer within ${TELEGRAM_TIMEOUT_MS}ms`
        : `❌ Telegram request failed: ${name}`,
    );
    return sendError(res, 502, "Failed to send message");
  }
}
