import Container from "@/components/Container/Container";
import css from "../../styles/services/vip.module.css";
import styles from "../../styles/services/outdor.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Algorithm from "@/components/Algorithm/Algorithm";
import Thread from "@/components/Thread/Thread";
import path from "../../components/PhotoGallery/imagesOut.json";
import FaqSection from "@/components/FAQ/FaqSection";
import { useEffect, useState } from "react";

interface OutdoorProps {
  imagePaths: string[];
}

const OutdoorPage: React.FC<OutdoorProps> = ({ imagePaths }) => {
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
      <div className={`${styles.bgImg} ${css.vip}`}></div>
      <div className={css.pageTitle} style={{ opacity }}>
        <h2 className={css.title1}>{t.outdoorP.title}</h2>
      </div>
      <Container>
        <section className={css.main} style={{ opacity: opacity + 0.5 }}>
          <p className={css.description}>{t.outdoorP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <Algorithm />
        <Overlay />
        <Thread imagePaths={imagePaths} double />
        <section className={css.details}>
          <h4 className={css.details_title}>{t.outdoorP.details_title}</h4>
          <p className={css.text1}>1. {t.outdoorP.text1}</p>
          <p className={css.text2}>2. {t.outdoorP.text2}</p>
          <p className={css.text3}>3. {t.outdoorP.text3}</p>
          <p className={css.text6}>4. {t.outdoorP.details_time}</p>
          <p className={css.details_players}>{t.outdoorP.details_players}</p>
          <p className={css.details_taxi}>{t.vipP.taxi}</p>
          <p className={css.details_cost}>{t.outdoorP.details_cost}</p>
          <p className={css.notification}>* {t.tempMessage.notification}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
      <FaqSection />
    </>
  );
};

export default OutdoorPage;

export async function getStaticProps() {
  return {
    props: {
      imagePaths: path,
    },
  };
}
