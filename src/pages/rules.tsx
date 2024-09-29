import Container from "@/components/Container/Container";
import css from "../styles/Rules.module.css";
import { useTranslation } from "@/hooks/useTranslation";

const Rules = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.img}></div>
      <Container>
        <p className={css.rules_title}>{t.rules.qw}</p>
        <h2 className={css.rules_title}>{t.rules.title}</h2>
        <div className={css.rules}>
          <p className={css.rulesShort}></p>
          <button type="button">show more</button>
          <article className={css.article}>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </article>
          <article className={css.article}>
            <p></p>
            <p></p>
            <p></p>
          </article>
        </div>
      </Container>
    </>
  );
};

export default Rules;
