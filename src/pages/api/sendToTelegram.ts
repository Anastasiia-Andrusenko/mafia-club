// pages/api/sendToTelegram.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { message } = req.body;

  const TELEGRAM_BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TG_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ message: "Missing Telegram credentials" });
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
      }
    );

    const data = await response.json();

    if (!data.ok) {
      console.error("❌ Telegram error:", data);
      return res.status(500).json({ message: "Telegram error", data });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
