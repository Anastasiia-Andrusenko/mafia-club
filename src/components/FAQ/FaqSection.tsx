import { useTranslation } from "@/hooks/useTranslation";
import css from "./FaqSection.module.css";
import { useState } from "react";
import { AiOutlineQuestionCircle, AiOutlineCheckCircle } from "react-icons/ai";

const FaqSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);

  const faqKeys = [
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

  const toggleAnswer = (key: string) => {
    setActiveAnswer((prev) => (prev === key ? null : key));
  };

  return (
    <div className={css.faqWrapper}>
      <button
        className={css.faqToggleBtn}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? t.info.faqToggleHide : t.info.faqToggleShow}
      </button>

      {isVisible && (
        <ul className={css.faqList}>
          {faqKeys.map((key, index) => (
            <li
              className={css.faqItem}
              key={key}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={css.faqQuestionRow}>
                <p className={css.faqTitle}>{t.info[key]}</p>
                <button
                  className={css.faqIconBtn}
                  onClick={() => toggleAnswer(key)}
                >
                  {activeAnswer === key ? (
                    <AiOutlineCheckCircle />
                  ) : (
                    <AiOutlineQuestionCircle />
                  )}
                </button>
              </div>
              {activeAnswer === key && (
                <p className={css.faqText}>{t.info[`${key}Text`]}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqSection;
