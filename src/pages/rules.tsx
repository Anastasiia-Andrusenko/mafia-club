import Container from "@/components/Container/Container";
import css from "../styles/Rules.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { FaHandPointDown } from "react-icons/fa";
import Overlay from "@/components/Overlay/Overlay";
// import Overlay from "@/components/Overlay/Overlay";

const Rules = () => {
  const { t } = useTranslation();
  const [isShowRules, setIsShowRules] = useState(false);

  const handleShowBtn = () => {
    setIsShowRules(!isShowRules);
  };

  return (
    <>
      <div className={css.img}></div>
      <Container>
        <p className={css.question}>{t.rules.qw}</p>
        <p className={css.rules_description}>{t.rules.text}</p>
        <>
          <h3 className={css.rules_title}>{t.rules.classicTitle}</h3>
          <div className={css.video}>
            <iframe
              width="840"
              height="473"
              src="https://www.youtube.com/embed/GqgDMsWyFHY?si=VnFkm1m6B6N24UTS"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className={css.rules}>
            <p className={css.rulesShort}>{t.rules.rulesShort}</p>
            <button
              type="button"
              className={css.moreBtn}
              onClick={handleShowBtn}
            >
              {isShowRules ? t.rules.hide : t.rules.more}
            </button>
          </div>
          {isShowRules && (
            <article className={css.article}>
              <p className={css.paragraph}>{t.rules.p1}</p>
              <p className={css.paragraph}>{t.rules.p2}</p>
              <p className={css.paragraph}>{t.rules.p3}</p>
              <p className={css.paragraph}>{t.rules.p4}</p>
              <p className={css.paragraph}>{t.rules.p5}</p>
              <p className={css.paragraph}>{t.rules.p6}</p>
              <p className={css.paragraph}>{t.rules.p7}</p>
              <p className={css.paragraph}>{t.rules.p8}</p>
              <p className={css.paragraph}>{t.rules.p9}</p>
              <p className={css.paragraph}>{t.rules.p10}</p>
              <p className={css.paragraph}>{t.rules.p11}</p>
              <p className={css.paragraph}>{t.rules.p12}</p>
              <p className={css.paragraph}>{t.rules.p13}</p>
              <p className={css.paragraph}>{t.rules.p14}</p>
              <p className={css.paragraph}>{t.rules.p15}</p>
              <p className={css.paragraph}>{t.rules.p16}</p>
              <p className={css.paragraph}>{t.rules.p17}</p>
              <p className={css.paragraph}>{t.rules.p18}</p>
              <p className={`${css.paragraph} ${css.endGame} ${css.end}`}>
                {t.rules.p191}
              </p>
              <p className={`${css.paragraph} ${css.endGame}`}>
                {t.rules.p192}
              </p>
              <p className={`${css.paragraph} ${css.extra}`}>{t.rules.p20}</p>
              <p className={css.paragraph}>{t.rules.p21}</p>
              <p className={css.paragraph}>
                <span className={css.number}>1.</span>
                {t.rules.p22}
              </p>
              <p className={css.paragraph}>{t.rules.p23}</p>
              <p className={css.paragraph}>{t.rules.p24}</p>
              <p className={css.paragraph}>{t.rules.p25}</p>
              <p className={css.paragraph}>
                {" "}
                <span className={css.number}>2.</span> {t.rules.p26}
              </p>
              <p className={css.paragraph}>{t.rules.p27}</p>
              <p className={css.paragraph}>
                <span className={css.number}>3.</span>
                {t.rules.p28}
              </p>
              <p className={css.paragraph}>{t.rules.p29}</p>
            </article>
          )}
        </>
        <>
          <h3 className={css.rules_title}>{t.rules.balaganTitle}</h3>
          <div className={css.video}>
            <iframe
              width="840"
              height="473"
              src="https://www.youtube.com/embed/DkMNdCm51wU?si=n4d6e0t7wAin09KG"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </>
        <div className={css.final}>
          <p className={css.callQuestion}>{t.rules.callQuestion}</p>
          <p className={css.callAction}>{t.rules.callAction}</p>
          <span className={css.icon}>
            <FaHandPointDown />
          </span>
        </div>
      </Container>
      <div className={css.btnTable}>
        <Overlay />
      </div>
    </>
  );
};

export default Rules;
