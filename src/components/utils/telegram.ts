export const escapeMarkdown = (text: string): string =>
  text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");

export const sendTelegramMessage = async (message: string) => {
  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN!;
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID!;

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
    console.error("Telegram error:", data);
  }
};
