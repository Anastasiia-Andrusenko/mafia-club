export const escapeMarkdown = (text: string): string =>
  text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");

export const sendTelegramMessage = async (message: string) => {
  const TELEGRAM_BOT_TOKEN = "7485386261:AAGJJQU2sdEAgBQdov7e-FmY7HwMGTIdL0s";
  const TELEGRAM_CHAT_ID = "472893686";

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
