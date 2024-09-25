import { useState, useEffect } from "react";
import ua from "../locales/ua.json";
import ru from "../locales/ru.json";
import { Translation } from "@/types/translation";

// об'єкт типізованих перекладів
const translationsMap: Record<"ua" | "ru", Translation> = {
  ua: ua as Translation,
  ru: ru as Translation,
};

export const useTranslation = (defaultLang: "ua" | "ru" = "ua") => {
  const [language, setLanguage] = useState<"ua" | "ru">(defaultLang);
  const [t, setTranslations] = useState<Translation>(
    translationsMap[defaultLang]
  );

  useEffect(() => {
    setTranslations(translationsMap[language]);
  }, [language]);

  const changeLng = (lang: "ua" | "ru") => {
    setLanguage(lang);
  };

  return { t, changeLng };
};
