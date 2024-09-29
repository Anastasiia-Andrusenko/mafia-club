import Container from "@/components/Container/Container";
import css from "../styles/Services.module.css";
// import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
// import Image from "next/image";
import { FaRedhat } from "react-icons/fa";
import { PiSpeakerHifiFill } from "react-icons/pi";
import { BsCameraFill } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { FaUserPlus } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const Services = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={css.hero}>
        <Container>
          <h2 className={css.title}>{t.services.title}</h2>
          <h2 className={css.titleWhat}>{t.homeP.what}</h2>
          <p className={css.mafiaText}>{t.homeP.mafia}</p>
          {/* <Overlay /> */}
        </Container>
      </div>
      <Container>
        <div className={css.services}>
          <h4 className={css.listTitle}>{t.services.listTitle}</h4>
          <ul className={css.cards}>
            <li className={css.item}>
              <div className={css.thumb}>
                <div className={css.img}></div>
                <div className={css.thumb_overlay}>
                  <p className={css.thumb_text}>
                    The resource offers comprehensive offers with different
                    levels of functionality and services. All this will allow
                    the visitor to receive comprehensive information about the
                    company or a private person.
                  </p>
                </div>
              </div>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.vip}</h3>
              </div>
            </li>
            <li className={css.item}>
              <div className={css.thumb}>
                <div className={css.img}></div>
                <div className={css.thumb_overlay}>
                  <p className={css.thumb_text}>
                    The resource offers comprehensive offers with different
                    levels of functionality and services. All this will allow
                    the visitor to receive comprehensive information about the
                    company or a private person.
                  </p>
                </div>
              </div>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.corporate}</h3>
              </div>
            </li>
            <li className={css.item}>
              <div className={css.thumb}>
                <div className={css.img}></div>
                <div className={css.thumb_overlay}>
                  <p className={css.thumb_text}>
                    The resource offers comprehensive offers with different
                    levels of functionality and services. All this will allow
                    the visitor to receive comprehensive information about the
                    company or a private person.
                  </p>
                </div>
              </div>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.kids}</h3>
              </div>
            </li>
            <li className={css.item}>
              <div className={css.thumb}>
                <div className={css.img}></div>
                <div className={css.thumb_overlay}>
                  <p className={css.thumb_text}>
                    The resource offers comprehensive offers with different
                    levels of functionality and services. All this will allow
                    the visitor to receive comprehensive information about the
                    company or a private person.
                  </p>
                </div>
              </div>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.outdoor}</h3>
              </div>
            </li>
            <li className={css.item}>
              <div className={css.thumb}>
                <div className={css.img}></div>
                <div className={css.thumb_overlay}>
                  <p className={css.thumb_text}>
                    The resource offers comprehensive offers with different
                    levels of functionality and services. All this will allow
                    the visitor to receive comprehensive information about the
                    company or a private person.
                  </p>
                </div>
              </div>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.birth}</h3>
              </div>
            </li>
            <li className={css.item}>
              <div className={css.thumb}>
                <div className={css.img}></div>
                <div className={css.thumb_overlay}>
                  <p className={css.thumb_text}>
                    The resource offers comprehensive offers with different
                    levels of functionality and services. All this will allow
                    the visitor to receive comprehensive information about the
                    company or a private person.
                  </p>
                </div>
              </div>
              <div className={css.card}>
                <h3 className={css.card_title}>{t.services.engM}</h3>
              </div>
            </li>
          </ul>
        </div>
        <div className={css.extras}>
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

export default Services;
