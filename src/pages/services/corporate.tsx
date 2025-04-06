import Container from "@/components/Container/Container";
import css from "../../styles/services/corporate.module.css";
import styles from "../../styles/services/corporate.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Algorithm from "@/components/Algorithm/Algorithm";
import path from "../../components/PhotoGallery/imagesCorporate.json";
import Thread from "@/components/Thread/Thread";

interface CorporateProps {
  imagePaths: string[];
}

const CorporatePage: React.FC<CorporateProps> = ({ imagePaths }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.bgImg}`}></div>
      <div className={css.pageTitle}>
        <h2 className={css.title}>{t.corporateP.title}</h2>
      </div>
      <Container>
        <section className={css.main}>
          <p className={css.description}>{t.corporateP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <Algorithm />
        <Overlay />
        <Thread imagePaths={imagePaths} double />
        <section className={css.details}>
          <h4 className={css.details_title}>{t.corporateP.details_title}</h4>
          <p className={css.text1}>1. {t.corporateP.text1}</p>
          <p className={css.text2}>2. {t.corporateP.text2}</p>
          <p className={css.text3}>3. {t.corporateP.text3}</p>
          <p className={css.text4}>4. {t.corporateP.details_time}</p>
          <p className={css.text5}>5. {t.corporateP.extraCoast}</p>
          <p className={css.details_players}>
            {t.corporateP.players_age}
            {t.corporateP.details_players}
          </p>
          <p className={css.details_taxi}>{t.vipP.taxi}</p>
          <p className={css.details_coast}>{t.corporateP.details_coast}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
    </>
  );
};

export default CorporatePage;

export async function getStaticProps() {
  return {
    props: {
      imagePaths: path,
    },
  };
}
