import Container from "@/components/Container/Container";
import css from "../../styles/services/vip.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Algorithm from "@/components/Algorithm/Algorithm";

const VipPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${css.bgImg} ${css.vip}`}></div>
      <div className={css.pageTitle}>
        <h2 className={css.title1}>{t.vipP.title}</h2>
      </div>
      <Container>
        <section className={css.main}></section>
        <div className={css.emotionalImg}></div>
        <Algorithm />
        <Overlay />
        <section className={css.details}>
          <h4 className={css.details_title}>{t.vipP.details_title}</h4>
          <p className={css.text1}>1. {t.vipP.text1}</p>
          <p className={css.text2}>2. {t.vipP.text2}</p>
          <p className={css.text3}>3. {t.vipP.text3}</p>
          <p className={css.text4}>4. {t.vipP.text4}</p>
          <p className={css.text5}>5. {t.vipP.text5}</p>
          <p className={css.text6}>6. {t.vipP.text6}</p>
          <p className={css.details_players}>{t.vipP.details_players}</p>
          <p className={css.details_taxi}>{t.vipP.taxi}</p>
          <p className={css.details_coast}>{t.vipP.details_coast}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
    </>
  );
};

export default VipPage;
