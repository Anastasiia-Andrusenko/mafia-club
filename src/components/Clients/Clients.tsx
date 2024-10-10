import { useTranslation } from "../../hooks/useTranslation";
import Container from "../Container/Container";
import css from "./Clients.module.css";

const ClientsList = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <h4 className={css.title}>{t.homeP.clients}</h4>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.contactis}></div>
        </li>
        <li className={css.item}>
          <div className={css.dbshenker}></div>
        </li>
        <li className={css.item}>
          <div className={css.dominos}></div>
        </li>
        <li className={css.item}>
          <div className={css.alfa}></div>
        </li>
        <li className={css.item}>
          <div className={css.breeze}></div>
        </li>

        <li className={css.item}>
          <div className={css.kyivstar}></div>
        </li>
        <li className={css.item}>
          <div className={css.otp}></div>
        </li>
        <li className={css.item}>
          <div className={css.vodafone}></div>
        </li>
        <li className={css.item}>
          <div className={css.persha}></div>
        </li>
        <li className={css.item}>
          <div className={css.promin}></div>
        </li>
        <li className={css.item}>
          <div className={css.delta}></div>
        </li>
        <li className={css.item}>
          <div className={css.materialis}></div>
        </li>
        <li className={css.item}>
          <div className={css.cptl}></div>
        </li>
        <li className={css.item}>
          <div className={css.artofmice}></div>
        </li>
        <li className={css.item}>
          <div className={css.estafeta}></div>
        </li>
        <li className={css.item}>
          <div className={css.ekta}></div>
        </li>
        <li className={css.item}>
          <div className={css.mont}></div>
        </li>
      </ul>
    </Container>
  );
};

export default ClientsList;
