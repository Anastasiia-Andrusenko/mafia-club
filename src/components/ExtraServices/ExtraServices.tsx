import Container from "../Container/Container";
import css from "./ExtraServices.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FaRedhat } from "react-icons/fa";
import { PiSpeakerHifiFill } from "react-icons/pi";
import { BsCameraFill } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { FaUserPlus } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const ExtraServices = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <div className={css.extras} id="extra">
          <p className={css.extras_title}>
            <FaPlus />
            {t.extras.title}
          </p>
          <ul className={css.extras_list}>
            <li className={css.extras_item}>
              <FaRedhat className={css.icon} />
              {t.extras.props}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
            <li className={css.extras_item}>
              {" "}
              <PiSpeakerHifiFill className={css.icon} />
              {t.extras.dj}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
            <li className={css.extras_item}>
              {" "}
              <BsCameraFill className={css.icon} />
              {t.extras.photographer}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
            <li className={css.extras_item}>
              {" "}
              <RxLapTimer className={css.icon} />
              {t.extras.time}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
            <li className={css.extras_item}>
              {" "}
              <FaUserPlus className={css.icon} />
              {t.extras.addPresenter}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
            <li className={css.extras_item}>
              {" "}
              <MdTableRestaurant className={css.icon} />
              {t.extras.table}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
            <li className={css.extras_item}>
              {" "}
              <FaRegCircleQuestion className={css.icon} />
              {t.extras.other}
              <span className={css.prompt}>{t.extras.prompt}</span>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default ExtraServices;
