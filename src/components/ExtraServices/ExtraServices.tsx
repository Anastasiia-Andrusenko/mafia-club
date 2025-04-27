import Container from "../Container/Container";
import css from "./ExtraServices.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { FaRedhat } from "react-icons/fa";
import { PiSpeakerHifiFill } from "react-icons/pi";
import { FaChalkboardUser } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";
import { FaUserPlus } from "react-icons/fa";
import { GiPokerHand } from "react-icons/gi";
import { GiRollingDices } from "react-icons/gi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

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
            <li>
              <Link href="/services/extras#shop" className={css.extras_item}>
                <FaRedhat className={css.icon} />
                {t.extras.props}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link href="/services/extras#music" className={css.extras_item}>
                <PiSpeakerHifiFill className={css.icon} />
                {t.extras.dj}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link href="/services/extras#photoB" className={css.extras_item}>
                <FaChalkboardUser className={css.icon} />
                {t.extras.photographer}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/services/extras#extraGame"
                className={css.extras_item}
              >
                <RxLapTimer className={css.icon} />
                {t.extras.time}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/services/extras#extraPresenter"
                className={css.extras_item}
              >
                <FaUserPlus className={css.icon} />
                {t.extras.addPresenter}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link href="/services/extras#tableP" className={css.extras_item}>
                <GiPokerHand className={css.icon} />
                {t.extras.tableP}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link href="/services/extras#tableR" className={css.extras_item}>
                <GiRollingDices className={css.icon} />
                {t.extras.tableR}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
            <li>
              <Link href="/services/extras" className={css.extras_item}>
                <FaRegCircleQuestion className={css.icon} />
                {t.extras.other}
                <span className={css.prompt}>{t.extras.prompt}</span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default ExtraServices;
