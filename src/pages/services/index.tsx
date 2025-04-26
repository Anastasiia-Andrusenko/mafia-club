import Container from "@/components/Container/Container";
import css from "../../styles/Services.module.css";
// import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GiClick } from "react-icons/gi";
import FaqSection from "@/components/FAQ/FaqSection";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, [isDesktop]);

  const handleClickMore = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const { t } = useTranslation();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const hero = heroRef.current;
  //     const heroText = heroTextRef.current;
  //     if (!hero || !heroText) return;

  //     const heroTextRect = heroText.getBoundingClientRect();
  //     const headerHeight = 6 * 16; // 6rem = 96px

  //     if (heroTextRect.top <= headerHeight) {
  //       hero.style.position = "static";
  //     } else {
  //       hero.style.position = "fixed";
  //       hero.style.top = "6rem";
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <div className={css.hero_wrapper}>
        <div ref={heroRef} className={css.hero}></div>
        <div ref={heroTextRef} className={css.hero_text}>
          <h2 className={css.titleWhat}>{t.homeP.what}</h2>
          <p className={css.mafiaText}>{t.homeP.mafia}</p>
        </div>
      </div>

      <Container>
        <div className={css.services} id="services">
          <h4 className={css.listTitle}>{t.services.listTitle}</h4>
          <ul className={css.cards}>
            <li
              className={css.item}
              id="vip"
              onClick={() => !isDesktop && handleClickMore(0)}
            >
              <Link href="/services/vip">
                <div className={css.thumb}>
                  <div className={`${css.img} ${css.vip}`}></div>
                  <div
                    className={
                      activeIndex === 0
                        ? css.thumb_overlay_show
                        : css.thumb_overlay
                    }
                  >
                    <div className={css.thumb_text}>
                      <p className={css.thumb_text_p}>{t.table.description2}</p>
                      <p className={css.thumb_overlay_more}>
                        {t.services.forMore}
                      </p>
                    </div>
                  </div>
                  {!isDesktop && (
                    <p className={css.moreMob}>
                      <GiClick />
                      {t.table.more}
                    </p>
                  )}
                </div>
                <div className={css.card}>
                  <h3 className={css.card_title}>{t.services.vip}</h3>
                </div>
              </Link>
            </li>
            <li
              className={css.item}
              id="corporate"
              onClick={() => !isDesktop && handleClickMore(1)}
            >
              <Link href="/services/corporate">
                <div className={css.thumb}>
                  <div className={`${css.img} ${css.office}`}></div>
                  <div
                    className={
                      activeIndex === 1
                        ? css.thumb_overlay_show
                        : css.thumb_overlay
                    }
                  >
                    <div className={css.thumb_text}>
                      <p className={css.thumb_text_p}>{t.table.description1}</p>
                      <p className={css.thumb_overlay_more}>
                        {t.services.forMore}
                      </p>
                    </div>
                  </div>
                  {!isDesktop && (
                    <p className={css.moreMob}>
                      <GiClick />
                      {t.table.more}
                    </p>
                  )}
                </div>
                <div className={css.card}>
                  <h3 className={css.card_title}>{t.services.corporate}</h3>
                </div>
              </Link>
            </li>
            <li
              className={css.item}
              id="out"
              onClick={() => !isDesktop && handleClickMore(2)}
            >
              <Link href="/services/outdoor">
                <div className={css.thumb}>
                  <div className={`${css.img} ${css.outdoor}`}></div>
                  <div
                    className={
                      activeIndex === 2
                        ? css.thumb_overlay_show
                        : css.thumb_overlay
                    }
                  >
                    <div className={css.thumb_text}>
                      <p className={css.thumb_text_p}>{t.table.description5}</p>
                      <p className={css.thumb_overlay_more}>
                        {t.services.forMore}
                      </p>
                    </div>
                  </div>
                  {!isDesktop && (
                    <p className={css.moreMob}>
                      <GiClick />
                      {t.table.more}
                    </p>
                  )}
                </div>
                <div className={css.card}>
                  <h3 className={css.card_title}>{t.services.outdoor}</h3>
                </div>
              </Link>
            </li>
            <li
              className={css.item}
              id="kids"
              onClick={() => !isDesktop && handleClickMore(3)}
            >
              <Link href="/services/kids">
                <div className={css.thumb}>
                  <div className={`${css.img} ${css.kids}`}></div>
                  <div
                    className={
                      activeIndex === 3
                        ? css.thumb_overlay_show
                        : css.thumb_overlay
                    }
                  >
                    <div className={css.thumb_text}>
                      <p className={css.thumb_text_p}>{t.table.description3}</p>
                      <p className={css.thumb_overlay_more}>
                        {t.services.forMore}
                      </p>
                    </div>
                  </div>
                  {!isDesktop && (
                    <p className={css.moreMob}>
                      <GiClick />
                      {t.table.more}
                    </p>
                  )}
                </div>
                <div className={css.card}>
                  <h3 className={css.card_title}>{t.services.kids}</h3>
                </div>
              </Link>
            </li>
            <li
              className={css.item}
              id="birthday"
              onClick={() => !isDesktop && handleClickMore(4)}
            >
              <Link href="/services/birthday">
                <div className={css.thumb}>
                  <div className={`${css.img} ${css.birthday}`}></div>
                  <div
                    className={
                      activeIndex === 4
                        ? css.thumb_overlay_show
                        : css.thumb_overlay
                    }
                  >
                    <div className={css.thumb_text}>
                      <p className={css.thumb_text_p}>{t.table.description4}</p>
                      <p className={css.thumb_overlay_more}>
                        {t.services.forMore}
                      </p>
                    </div>
                  </div>
                  {!isDesktop && (
                    <p className={css.moreMob}>
                      <GiClick />
                      {t.table.more}
                    </p>
                  )}
                </div>
                <div className={css.card}>
                  <h3 className={css.card_title}>{t.services.birth}</h3>
                </div>
              </Link>
            </li>
            <li
              className={css.item}
              id="extras"
              onClick={() => !isDesktop && handleClickMore(5)}
            >
              <Link href="/services/extras">
                <div className={css.thumb}>
                  <div className={`${css.img} ${css.extras}`}></div>
                  <div
                    className={
                      activeIndex === 5
                        ? css.thumb_overlay_show
                        : css.thumb_overlay
                    }
                  >
                    <div className={css.thumb_text}>
                      <p className={css.thumb_text_p}>{t.table.description6}</p>
                      <p className={css.thumb_overlay_more}>
                        {t.services.forMore}
                      </p>
                    </div>
                  </div>
                  {!isDesktop && (
                    <p className={css.moreMob}>
                      <GiClick />
                      {t.table.more}
                    </p>
                  )}
                </div>
                <div className={css.card}>
                  <h3 className={css.card_title}>{t.services.extrasP}</h3>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <ExtraServices />
        <Overlay />
        <Container>
          <FaqSection />
        </Container>

        <Overlay />
      </Container>
      <ScrollTopBtn />
    </>
  );
};

export default Services;
