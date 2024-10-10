import Container from "@/components/Container/Container";
import css from "../styles/Services.module.css";
// import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";

const Services = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={css.hero}>
        <Container>
          <h2 className={css.title}>{t.services.title}</h2>
          <h2 className={css.titleWhat}>{t.homeP.what}</h2>
          <p className={css.mafiaText}>{t.homeP.mafia}</p>
          {/* <Overlay /> */}
        </Container>
      </div>
      <Container>
        <div className={css.services}>
          <h4 className={css.listTitle}>{t.services.listTitle}</h4>
          <ul className={css.cards}>
            <li className={css.item}>
              <Link className={css.thumb} href="/services/vip">
                <div className={`${css.img} ${css.vip}`}></div>
                <div className={css.thumb_overlay}>
                  <div className={css.thumb_text}>
                    <p className={css.thumb_text_p}>1. {t.vipMafia.p1}</p>
                    <p className={css.thumb_text_p}>2. {t.vipMafia.p2}</p>
                    <p className={css.thumb_text_p}>3. {t.vipMafia.p3}</p>
                    <p className={css.thumb_text_p}>4. {t.vipMafia.p4}</p>
                  </div>
                </div>
              </Link>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.vip}</h3>
              </div>
            </li>
            <li className={css.item}>
              <Link className={css.thumb} href="/services/office">
                <div className={`${css.img} ${css.office}`}></div>
                <div className={css.thumb_overlay}>
                  <div className={css.thumb_text}>
                    <p className={css.thumb_text_p}>1. {t.officeMafia.p1}</p>
                    <p className={css.thumb_text_p}>2. {t.officeMafia.p4}</p>
                    <p className={css.thumb_text_p}>3. {t.officeMafia.p2}</p>
                    <p className={css.thumb_text_p}>4. {t.officeMafia.p3}</p>
                  </div>
                </div>
              </Link>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.corporate}</h3>
              </div>
            </li>
            <li className={css.item}>
              <Link className={css.thumb} href="/services/outdoor">
                <div className={`${css.img} ${css.outdoor}`}></div>
                <div className={css.thumb_overlay}>
                  <div className={css.thumb_text}>
                    <p className={css.thumb_text_p}>1. {t.outMafia.p1}</p>
                    <p className={css.thumb_text_p}>2. {t.outMafia.p2}</p>
                    <p className={css.thumb_text_p}>3. {t.outMafia.p3}</p>
                  </div>
                </div>
              </Link>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.outdoor}</h3>
              </div>
            </li>
            <li className={css.item}>
              <Link className={css.thumb} href="/services/kids">
                <div className={`${css.img} ${css.kids}`}></div>
                <div className={css.thumb_overlay}>
                  <div className={css.thumb_text}>
                    <p className={css.thumb_text_p}>1. {t.kidsMafia.p1}</p>
                    <p className={css.thumb_text_p}>2. {t.kidsMafia.p2}</p>
                    <p className={css.thumb_text_p}>3. {t.kidsMafia.p3}</p>
                  </div>
                </div>
              </Link>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.kids}</h3>
              </div>
            </li>
            <li className={css.item}>
              <Link className={css.thumb} href="/services/birthday">
                <div className={`${css.img} ${css.birthday}`}></div>
                <div className={css.thumb_overlay}>
                  <div className={css.thumb_text}>
                    <p className={css.thumb_text_p}>1. {t.birthdayMafia.p1}</p>
                    <p className={css.thumb_text_p}>2. {t.birthdayMafia.p2}</p>
                    <p className={css.thumb_text_p}>3. {t.birthdayMafia.p3}</p>
                  </div>
                </div>
              </Link>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.birth}</h3>
              </div>
            </li>
            <li className={css.item}>
              <Link className={css.thumb} href="/services/english">
                <div className={`${css.img} ${css.english}`}></div>
                <div className={css.thumb_overlay}>
                  <div className={css.thumb_text}>
                    <p className={css.thumb_text_p}>1. {t.enMafia.p1}</p>
                    <p className={css.thumb_text_p}>2. {t.enMafia.p2}</p>
                    <p className={css.thumb_text_p}>3. {t.enMafia.p3}</p>
                    <p className={css.thumb_text_p}>4. {t.enMafia.p4}</p>
                  </div>
                </div>
              </Link>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.engM}</h3>
              </div>
            </li>
          </ul>
        </div>
        <Overlay />
        <ExtraServices />

        <div className={css.info}>
          <ul className={css.info_list}>
            <li className={css.info_item}>
              <p className={css.info_title}>{t.info.place}</p>
              <p className={css.info_text}>{t.info.placeText}</p>
            </li>
            <li className={css.info_item}>
              <p className={css.info_title}>{t.info.time}</p>
              <p className={css.info_text}>{t.info.timeText}</p>
            </li>
            <li className={css.info_item}>
              <p className={css.info_title}>{t.info.rule}</p>
              <p className={css.info_text}>{t.info.ruleText}</p>
            </li>
            <li className={css.info_item}>
              <p className={css.info_title}>{t.info.players}</p>
              <p className={css.info_text}>{t.info.playersText}</p>
            </li>
            <li className={css.info_item}>
              <p className={css.info_title}>{t.info.extra}</p>
              <p className={css.info_text}>{t.info.extraText}</p>
            </li>
          </ul>
        </div>
        <Overlay />
      </Container>
    </>
  );
};

export default Services;
