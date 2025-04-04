import css from "./Algorithm.module.css";
import { useTranslation } from "@/hooks/useTranslation";

const Algorithm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
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
            <div className={css.algorithm_text}> {t.vipP.emotions}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Algorithm;
