import Container from "@/components/Container/Container";
import css from "../../styles/services/extras.module.css";
import styles from "../../styles/services/kids.module.css";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";

const ExtrasPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.bgImg} ${css.vip}`}></div>
      <div className={styles.pageTitle}>
        <h2 className={css.title1}>{t.extrasP.title}</h2>
      </div>
      <Container>
        <section className={css.main}>
          <p className={css.description}>{t.extrasP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <Overlay />
        <section className={css.extra_services}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
      </Container>
    </>
  );
};

export default ExtrasPage;
