import Container from "@/components/Container/Container";
import css from "../../styles/services/vip.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import { GiDiscussion } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";
import { BsMagic } from "react-icons/bs";
import { BiGame } from "react-icons/bi";
import { BiAnalyse } from "react-icons/bi";
import { FaPhotoVideo } from "react-icons/fa";

const CorporatePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={css.bgImg}>
        <Container>
          <h2 className={css.pageName}>{t.vipP.pageName}</h2>
        </Container>
      </div>
      <Container>
        <section className={css.main}>
          <h3 className={css.title}>{t.vipP.title}</h3>
          <p className={css.description}>{t.vipP.description}</p>
        </section>
        <section className={css.instruction}>
          <h4 className={css.instruction_title}>{t.vipP.instruction_title}</h4>
          <div className={css.algorithm}>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <GiDiscussion />
              </div>
              <div className={css.algorithm_text}>{t.vipP.negotiation}</div>
            </div>
            <div className={css.algorithm_arrow}></div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <GrMapLocation />
              </div>
              <div className={css.algorithm_text}>
                {t.vipP.arrival_of_the_presenter}
              </div>
            </div>
            <div className={css.algorithm_arrow}></div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <BsMagic />
              </div>
              <div className={css.algorithm_text}> {t.vipP.entourage}</div>
            </div>
            <div className={css.algorithm_arrow}></div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <BiGame />
              </div>
              <div className={css.algorithm_text}> {t.vipP.game}</div>
            </div>
            <div className={css.algorithm_arrow}></div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <BiAnalyse />
              </div>
              <div className={css.algorithm_text}> {t.vipP.analysis}</div>
            </div>
            <div className={css.algorithm_arrow}></div>
            <div className={css.algorithm_item}>
              <div className={css.algorithm_icon}>
                <FaPhotoVideo />
              </div>
              <div className={css.algorithm_text}> {t.vipP.final}</div>
            </div>
          </div>
        </section>
        <section className={css.details}>
          <h4 className={css.details_title}>{t.vipP.details_title}</h4>
          <p className={css.details_time}>{t.vipP.details_time}</p>
          <p className={css.details_coast}>{t.vipP.extraCoast}</p>
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

export default CorporatePage;
