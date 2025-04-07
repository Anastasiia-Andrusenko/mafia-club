// utils/validateOverlayForm.ts

export type OverlayFormData = {
  name: string;
  phone: string;
  services: string[];
};

export const validateOverlayForm = ({
  name,
  phone,
  services,
}: OverlayFormData): string | null => {
  const cleanedName = name.trim();
  const phoneDigits = phone.replace(/\D/g, "");
  const cleanedPhone = phone.trim().replace(/\s+/g, " ");

  if (cleanedName.replace(/\s+/g, "").length < 3) {
    return "Ім'я повинно містити мінімум 3 символи.";
  }

  if (services.length === 0) {
    return "Оберіть хоча б один варіант заходу.";
  }

  if (!/^\+380(?:\s?\d{2}){3}\s?\d{3}$/.test(cleanedPhone)) {
    return "Невірний формат номера телефону. Вкажіть номер у форматі +380 XX XX XX XXX.";
  }

  if (/^(\d)\1*$/.test(phoneDigits.slice(3))) {
    return "Вкажіть свій реальний номер.";
  }

  return null;
};
