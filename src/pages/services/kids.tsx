import Container from "@/components/Container/Container";
import css from "../../styles/services/corporate.module.css";
import styles from "../../styles/services/kids.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Algorithm from "@/components/Algorithm/Algorithm";
import Thread from "@/components/Thread/Thread";
import path from "../../components/PhotoGallery/imagesKids.json";

interface KidsProps {
  imagePaths: string[];
}

const KidsPage: React.FC<KidsProps> = ({ imagePaths }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.bgImg} `}></div>
      <div className={css.pageTitle}>
        <h2 className={css.title}>{t.kidsP.title}</h2>
      </div>
      <Container>
        <section className={css.main}>
          <p className={css.description}>{t.kidsP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <Algorithm />
        <Overlay />
        <Thread imagePaths={imagePaths} double />
        <section className={css.details}>
          <h4 className={css.details_title}>{t.kidsP.details_title}</h4>
          <p className={css.text1}>1. {t.kidsP.text1}</p>
          <p className={css.text2}>2. {t.kidsP.text2}</p>
          <p className={css.text3}>3. {t.kidsP.text3}</p>
          <p className={css.text4}>4. {t.kidsP.text4}</p>
          <p className={css.text5}>5. {t.kidsP.text5}</p>
          <p className={css.details_players}>{t.kidsP.details_players}</p>
          <p className={css.details_taxi}>{t.vipP.taxi}</p>
          <p className={css.details_coast}>{t.kidsP.details_coast}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
    </>
  );
};

export default KidsPage;

export async function getStaticProps() {
  return {
    props: {
      imagePaths: path,
    },
  };
}
