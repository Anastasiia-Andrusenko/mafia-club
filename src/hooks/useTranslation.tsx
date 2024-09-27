import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext"; // Adjust path if necessary

export const useTranslation = () => {
  const context = useContext(LanguageContext); // Access the context
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context; // Return the context directly
};
