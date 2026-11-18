// utils/validateOverlayForm.ts
import { UA_PHONE_REGEX } from "@/lib/phone";

export type OverlayFormData = {
  name: string;
  phone: string;
  services: string[];
};

/** Keys of the `validation` section in src/locales/*.json. */
export type ValidationErrorKey =
  | "nameShort"
  | "servicesRequired"
  | "phoneFormat"
  | "phoneFake";

export const MIN_NAME_LENGTH = 2;

export const validateName = (name: string): ValidationErrorKey | null =>
  name.replace(/\s+/g, "").length < MIN_NAME_LENGTH ? "nameShort" : null;

export const validatePhone = (phone: string): ValidationErrorKey | null => {
  const cleanedPhone = phone.trim().replace(/\s+/g, " ");

  if (!UA_PHONE_REGEX.test(cleanedPhone)) {
    return "phoneFormat";
  }

  // "+380" + 9 national digits that are all identical (e.g. 000000000).
  if (/^(\d)\1*$/.test(cleanedPhone.replace(/\D/g, "").slice(3))) {
    return "phoneFake";
  }

  return null;
};

/**
 * Returns the locale key of the first validation error (resolve it with
 * `t.validation[key]` so the message follows the active language), or null.
 */
export const validateOverlayForm = ({
  name,
  phone,
  services,
}: OverlayFormData): ValidationErrorKey | null =>
  validateName(name) ??
  (services.length === 0 ? "servicesRequired" : null) ??
  validatePhone(phone);
