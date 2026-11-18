// LanguageContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import ua from "../locales/ua.json";
import ru from "../locales/ru.json";
import { Translation } from "@/types/translation";

// Об'єкт типізованих перекладів
const translationsMap: Record<"ua" | "ru", Translation> = {
  ua: ua as Translation,
  ru: ru as Translation,
};

// Значення атрибута <html lang> для кожної мови
const HTML_LANG: Record<"ua" | "ru", string> = { ua: "uk", ru: "ru" };

// Створюємо контекст
export const LanguageContext = createContext<{
  language: "ua" | "ru";
  t: Translation;
  changeLanguage: (lang: "ua" | "ru") => void;
}>({
  language: "ua", // Мова за замовчуванням
  t: translationsMap.ua,
  changeLanguage: () => {},
});

export const LanguageProvider = ({
  children,
  initialLanguage = "ua", // Параметр для початкової мови
}: {
  children: React.ReactNode;
  initialLanguage?: "ua" | "ru"; // Параметр для початкової мови
}) => {
  const [language, setLanguage] = useState<"ua" | "ru">(initialLanguage);

  // Переклад виводиться напряму з мови, без додаткового стану (немає відставання на один рендер)
  const t = translationsMap[language];

  // Тримаємо <html lang> у відповідності до обраної мови (SSR віддає lang="uk")
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language];
  }, [language]);

  const changeLanguage = (lang: "ua" | "ru") => {
    console.log(`Changing language to: ${lang}`);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Кастомний хук для використання перекладу
export const useTranslation = () => useContext(LanguageContext);
