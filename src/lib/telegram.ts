/**
 * Escapes text for Telegram MarkdownV2. Per the Bot API docs every one of
 * `_ * [ ] ( ) ~ ` > # + - = | { } . !` must be escaped, and the escape
 * character itself (`\`) must be escaped too - otherwise user input such as
 * `a\b` or a trailing backslash makes Telegram reject the message (HTTP 400).
 */
export const escapeMarkdown = (text: string): string =>
  text.replace(/[\\_*[\]()~`>#+\-=|{}.!]/g, "\\$&");

/** Builds a `tel:` link target that is safe inside a MarkdownV2 `(...)`. */
export const telLink = (phone: string): string =>
  `tel:${phone.replace(/\s/g, "").replace(/\+/g, "%2B")}`;
