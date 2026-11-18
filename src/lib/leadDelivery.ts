import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_awhca1b";
const EMAILJS_PUBLIC_KEY = "nBlfFj-daI3JM87lR";
const CHANNEL_TIMEOUT_MS = 20000;

export type DeliveryResult = {
  /** True when at least one channel accepted the lead. */
  ok: boolean;
  email: boolean;
  telegram: boolean;
};

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });

/** POSTs to our Telegram proxy. Rejects on network error or non-2xx. */
const sendToTelegram = async (message: string): Promise<void> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHANNEL_TIMEOUT_MS);
  try {
    const res = await fetch("/api/sendToTelegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });
    if (!res.ok) {
      // Body is informational only - never let a bad/empty body throw first.
      const body = await res.json().catch(() => null);
      throw new Error(`Telegram proxy responded ${res.status}`, {
        cause: body,
      });
    }
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Sends a lead through EmailJS and Telegram in parallel. The lead counts as
 * delivered when AT LEAST ONE channel succeeds, so an outage of one provider
 * never loses the lead or suppresses the conversion event.
 */
export const deliverLead = async ({
  templateId,
  templateParams,
  telegramMessage,
}: {
  templateId: string;
  templateParams: Record<string, unknown>;
  telegramMessage: string;
}): Promise<DeliveryResult> => {
  const [emailRes, telegramRes] = await Promise.allSettled([
    withTimeout(
      emailjs.send(
        EMAILJS_SERVICE_ID,
        templateId,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      ),
      CHANNEL_TIMEOUT_MS,
    ),
    sendToTelegram(telegramMessage),
  ]);

  if (emailRes.status === "rejected") {
    console.error("EmailJS delivery failed:", emailRes.reason);
  }
  if (telegramRes.status === "rejected") {
    console.error("Telegram delivery failed:", telegramRes.reason);
  }

  const email = emailRes.status === "fulfilled";
  const telegram = telegramRes.status === "fulfilled";
  return { ok: email || telegram, email, telegram };
};
