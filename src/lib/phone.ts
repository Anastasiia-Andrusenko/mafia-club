/**
 * Ukrainian phone number helpers shared by the lead form (Overlay) and the
 * shop order form (OrderForm).
 *
 * Display format: "+380 XX XX XX XXX" (9 national digits, grouped 2-2-2-3).
 */

/** Matches a fully formatted, complete number. */
export const UA_PHONE_REGEX = /^\+380 \d{2} \d{2} \d{2} \d{3}$/;

const COUNTRY_PREFIX = "+380";

/**
 * Normalises whatever the user typed / pasted / autofilled into the display
 * format. Accepted inputs include `097 123 45 67`, `+38 (097) 123-45-67`,
 * `38097...`, `380971234567`, `971234567` and `8 097...`.
 *
 * - No digits at all -> "" (lets the user clear the field).
 * - Only (part of) the country code so far -> "+380".
 */
export const formatUaPhone = (raw: string): string => {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("380")) {
    // "380" + national digits. National numbers never start with 0, so a
    // second 0 means the user pasted "380 097..." / "+380 (097)...".
    digits = digits.slice(3).replace(/^0+/, "");
  } else if (digits.startsWith("80")) {
    // Legacy "8 0XX ..." trunk-prefix format.
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    // Local format "0XX XXX XX XX".
    digits = digits.slice(1);
  } else if (digits.length <= 2 && "380".startsWith(digits)) {
    // Still typing / deleting inside the "+38" country code.
    digits = "";
  } else if (digits === "8" || digits === "3") {
    digits = "";
  } else if (digits.startsWith("38")) {
    // "38" followed by a non-zero digit: country code without the 0.
    digits = digits.slice(2);
  }
  // Otherwise the digits are already a national number ("971234567").

  digits = digits.slice(0, 9);

  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 4),
    digits.slice(4, 6),
    digits.slice(6, 9),
  ].filter(Boolean);

  return [COUNTRY_PREFIX, ...parts].join(" ");
};
