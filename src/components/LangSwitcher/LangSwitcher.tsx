import css from "./LangSwitcher.module.css";
import { useTranslation } from "@/context/LanguageContext";

const LangSwitcher = () => {
  const { changeLanguage, language } = useTranslation();

  return (
    <ul className={css.container}>
      <li>
        <button
          type="button"
          className={css.btn}
          onClick={() => {
            changeLanguage("ua");
            console.log("Switching to UA");
          }}
          disabled={language === "ua"}
        >
          UA
        </button>
      </li>
      <li>
        <button
          type="button"
          className={css.btn}
          onClick={() => {
            changeLanguage("ru");
            console.log("Switching to RU");
          }}
          disabled={language === "ru"}
        >
          RU
        </button>
      </li>
    </ul>
  );
};

export default LangSwitcher;
