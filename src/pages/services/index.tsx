import Container from "@/components/Container/Container";
import css from "../../styles/Services.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import ExtraServices from "@/components/ExtraServices/ExtraServices";
import Overlay from "@/components/Overlay/Overlay";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GiClick } from "react-icons/gi";
import FaqSection from "@/components/FAQ/FaqSection";

const SERVICE_THUMB_SIZES =
  "(max-width: 767px) 80vw, calc((100vw - 80px) / 3)";

// Card order, anchors, links and images. Titles / descriptions come from the
// translation keys named here.
const SERVICE_CARDS = [
  {
    id: "vip",
    href: "/services/vip",
    image: "/img/vip_mob.webp",
    title: "vip",
    description: "description2",
  },
  {
    id: "corporate",
    href: "/services/corporate",
    image: "/img/corporate_mob.webp",
    title: "corporate",
    description: "description1",
  },
  {
    id: "out",
    href: "/services/outdoor",
    image: "/img/picnic.webp",
    title: "outdoor",
    description: "description5",
  },
  {
    id: "kids",
    href: "/services/kids",
    image: "/img/services/children-card.webp",
    title: "kids",
    description: "description3",
  },
  {
    id: "birthday",
    href: "/services/birthday",
    image: "/img/birthday_mob.webp",
    title: "birth",
    description: "description4",
  },
  {
    id: "extras",
    href: "/services/extras",
    image: "/img/extra_mob.webp",
    title: "extrasP",
    description: "description6",
  },
] as const;

const Services = () => {
  // Which card's description is slid up. Only the mobile (tap) layout reacts
  // to it: on desktop the overlay is driven by :hover and the "more" badge is
  // hidden, both purely in CSS, so no viewport check / re-render is needed.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClickMore = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* LCP: the fixed hero background is a CSS image (found late), so
            preload it at high priority. */}
        <link
          rel="preload"
          as="image"
          href="/img/party.webp"
          {...{ fetchpriority: "high" }}
        />
      </Head>
      <div className={css.hero_wrapper}>
        <div className={css.hero}></div>
      </div>

      <Container>
        <div className={css.containerBg}>
          <div className={css.hero_text}>
            <h1 className={css.titleWhat}>{t.homeP.what}</h1>
            <p className={css.mafiaText}>{t.homeP.mafia}</p>
          </div>
          <div className={css.services} id="services">
            <h2 className={css.listTitle}>{t.services.listTitle}</h2>
            <ul className={css.cards}>
              {SERVICE_CARDS.map((card, index) => {
                const title = t.services[card.title];
                return (
                  <li
                    key={card.id}
                    className={css.item}
                    id={card.id}
                    onClick={() => handleClickMore(index)}
                  >
                    <Link href={card.href}>
                      <div className={css.thumb}>
                        <div className={css.img}>
                          <Image
                            src={card.image}
                            alt={title}
                            fill
                            sizes={SERVICE_THUMB_SIZES}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div
                          className={`${css.thumb_overlay} ${
                            activeIndex === index ? css.thumb_overlay_show : ""
                          }`}
                        >
                          <div className={css.thumb_text}>
                            <p className={css.thumb_text_p}>
                              {t.table[card.description]}
                            </p>
                            <p className={css.thumb_overlay_more}>
                              {t.services.forMore}
                            </p>
                          </div>
                        </div>
                        <p className={css.moreMob}>
                          <GiClick aria-hidden="true" />
                          {t.table.more}
                        </p>
                      </div>
                      <div className={css.card}>
                        <h3 className={css.card_title}>{title}</h3>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <ExtraServices />
          <Overlay />
        </div>
      </Container>
      <FaqSection />
      <ScrollTopBtn />
    </>
  );
};

export default Services;
