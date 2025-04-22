import Container from "@/components/Container/Container";
import styles from "../../styles/services/birthday.module.css";
import css from "../../styles/services/vip.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import Algorithm from "@/components/Algorithm/Algorithm";
import Thread from "@/components/Thread/Thread";
import path from "../../components/PhotoGallery/imagesBirth.json";

interface BirthdayProps {
  imagePaths: string[];
}

const BirthdayPage: React.FC<BirthdayProps> = ({ imagePaths }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.bgImg} `}></div>
      <div className={css.pageTitle}>
        <h2 className={css.title1}>{t.birthdayP.title}</h2>
      </div>
      <Container>
        <section className={css.main}>
          <p className={css.description}>{t.birthdayP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <Algorithm />
        <Overlay />
        <Thread imagePaths={imagePaths} double />
        <section className={css.details}>
          <h4 className={css.details_title}>{t.birthdayP.details_title}</h4>
          <p className={css.text1}>1. {t.birthdayP.text1}</p>
          <p className={css.text2}>2. {t.birthdayP.text2}</p>
          <p className={css.text3}>3. {t.birthdayP.text3}</p>
          <p className={css.text4}>4. {t.birthdayP.details_time}</p>
          <p className={css.details_players}>{t.birthdayP.details_players}</p>
          <p className={css.details_taxi}>{t.vipP.taxi}</p>
          <p className={css.details_cost}>{t.birthdayP.details_cost}</p>
        </section>
        <Overlay />
      </Container>
      <ExtraServices />
    </>
  );
};

export default BirthdayPage;

export async function getStaticProps() {
  return {
    props: {
      imagePaths: path,
    },
  };
}
