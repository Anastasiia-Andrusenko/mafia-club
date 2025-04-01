import Container from "@/components/Container/Container";
import css from "../../styles/services/vip.module.css";
import styles from "../../styles/services/corporate.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";

const CorporatePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.bgImg} ${css.vip}`}></div>
      <div className={css.pageTitle}>
        <h2 className={css.title1}>{t.corporateP.title}</h2>
      </div>
      <Container>
        <section className={css.main}>
          {/* <p className={css.description}>{t.vipP.description}</p> */}
        </section>
        <div className={css.emotionalImg}></div>
        <section className={css.instruction}>
          <h4 className={css.instruction_title}>
            {t.corporateP.instruction_title}
          </h4>
          <div className={css.algorithm}>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <svg className={css.icon}>
                  <use href="/img/sprite.svg#discussion-idea_17699750"></use>
                </svg>
              </div>
              <div className={css.algorithm_text}>{t.vipP.negotiation}</div>
            </div>
            <div className={css.algorithm_arrow}>
              <svg className={css.arrow}>
                <use href="/img/sprite.svg#angle-double-right_3916752"></use>
              </svg>
            </div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <svg className={css.icon}>
                  <use href="/img/sprite.svg#land-location_13727473"></use>
                </svg>
              </div>
              <div className={css.algorithm_text}>
                {t.vipP.arrival_of_the_presenter}
              </div>
            </div>
            <div className={css.algorithm_arrow}>
              <svg className={css.arrow}>
                <use href="/img/sprite.svg#angle-double-right_3916752"></use>
              </svg>
            </div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <svg className={css.icon}>
                  <use href="/img/sprite.svg#freemium_17698315"></use>
                </svg>
              </div>
              <div className={css.algorithm_text}> {t.vipP.entourage}</div>
            </div>
            <div className={css.algorithm_arrow}>
              <svg className={css.arrow}>
                <use href="/img/sprite.svg#angle-double-right_3916752"></use>
              </svg>
            </div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <svg className={css.icon}>
                  <use href="/img/sprite.svg#features_13794347"></use>
                </svg>
              </div>
              <div className={css.algorithm_text}> {t.vipP.game}</div>
            </div>
            <div className={css.algorithm_arrow}>
              <svg className={css.arrow}>
                <use href="/img/sprite.svg#angle-double-right_3916752"></use>
              </svg>
            </div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <svg className={css.icon}>
                  <use href="/img/sprite.svg#nfc-magnifying-glass_9768588"></use>
                </svg>
              </div>
              <div className={css.algorithm_text}> {t.vipP.analysis}</div>
            </div>
            <div className={css.algorithm_arrow}>
              <svg className={css.arrow}>
                <use href="/img/sprite.svg#angle-double-right_3916752"></use>
              </svg>
            </div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <svg className={css.icon}>
                  <use href="/img/sprite.svg#message-heart_16769101"></use>
                </svg>
              </div>
              <div className={css.algorithm_text}> {t.vipP.final}</div>
            </div>
          </div>
        </section>
        <Overlay />
        <section className={css.details}>
          <h4 className={css.details_title}>{t.corporateP.details_title}</h4>
          <p className={css.text1}>1. {t.corporateP.text1}</p>
          <p className={css.text2}>2. {t.corporateP.text2}</p>
          <p className={css.text3}>3. {t.corporateP.text3}</p>
          <p className={css.text4}>4. {t.corporateP.details_time}</p>
          <p className={css.text5}>5. {t.corporateP.extraCoast}</p>
          <p className={css.text6}>6. {t.corporateP.players_age}</p>
          <p className={css.details_players}>{t.corporateP.details_players}</p>
          <p className={css.details_taxi}>{t.corporateP.taxi}</p>
          <p className={css.details_coast}>{t.corporateP.details_coast}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
    </>
  );
};

export default CorporatePage;
