import { useTranslation } from "@/hooks/useTranslation";
import css from "./FaqSection.module.css";
import { useState } from "react";
import { AiOutlineQuestionCircle, AiOutlineCheckCircle } from "react-icons/ai";

export const FAQ_KEYS = [
  "place",
  "time",
  "rule",
  "cost",
  "player",
  "extraTime",
  "crowd",
  "kids",
  "vip",
  "buy",
  "tooFewPlayers",
  "notInKyiv",
  "tableRent",
  "alcohol",
  "gift",
];

const FaqSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);

  const faqKeys = FAQ_KEYS;

  const toggleAnswer = (key: string) => {
    setActiveAnswer((prev) => (prev === key ? null : key));
  };

  // The full question/answer list is always rendered (so it is present in the
  // server-rendered HTML and matches the FAQPage JSON-LD); CSS only collapses it.
  return (
    <div className={css.faqWrapper}>
      <button
        type="button"
        className={css.faqToggleBtn}
        onClick={() => setIsVisible((prev) => !prev)}
        aria-expanded={isVisible}
        aria-controls="faq-list"
      >
        {isVisible ? t.info.faqToggleHide : t.info.faqToggleShow}
      </button>

      <ul
        id="faq-list"
        className={`${css.faqList} ${isVisible ? "" : css.faqListCollapsed}`}
      >
        {faqKeys.map((key, index) => {
          const isOpen = activeAnswer === key;
          return (
            <li
              className={css.faqItem}
              key={key}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={css.faqQuestionRow}
                onClick={() => toggleAnswer(key)}
              >
                <p className={css.faqTitle}>{t.info[key]}</p>
                <button
                  type="button"
                  className={css.faqIconBtn}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  aria-label={t.info[key]}
                >
                  {isOpen ? (
                    <AiOutlineCheckCircle aria-hidden="true" />
                  ) : (
                    <AiOutlineQuestionCircle aria-hidden="true" />
                  )}
                </button>
              </div>
              <p
                id={`faq-answer-${key}`}
                className={`${css.faqText} ${isOpen ? "" : css.faqTextCollapsed}`}
              >
                {t.info[`${key}Text`]}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FaqSection;
