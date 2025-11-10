import Container from "@/components/Container/Container";
import css from "../../styles/services/vip.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Algorithm from "@/components/Algorithm/Algorithm";
import Thread from "@/components/Thread/Thread";
import path from "../../components/PhotoGallery/imagesVip.json";
import FaqSection from "@/components/FAQ/FaqSection";
import { useEffect, useState } from "react";

interface VipProps {
  imagePaths: string[];
}

const VipPage: React.FC<VipProps> = ({ imagePaths }) => {
  const { t } = useTranslation();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 300, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`${css.bgImg} ${css.vip}`}></div>
      <div className={css.pageTitle} style={{ opacity }}>
        <h2 className={css.title1}>{t.vipP.title}</h2>
      </div>
      <Container>
        <section className={css.main} style={{ opacity: opacity + 0.5 }}>
          <p className={css.description}>{t.vipP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <Algorithm />
        <Overlay />
        <Thread imagePaths={imagePaths} double />
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
          <p className={css.details_cost}>{t.vipP.details_cost}</p>
          <p className={css.notification}>* {t.tempMessage.notification}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
      <FaqSection />
    </>
  );
};

export default VipPage;

export async function getStaticProps() {
  return {
    props: {
      imagePaths: path,
    },
  };
}
