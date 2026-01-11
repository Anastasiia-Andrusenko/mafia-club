import Container from "@/components/Container/Container";
import css from "../../styles/services/extras.module.css";

import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import Link from "next/link";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import FaqSection from "@/components/FAQ/FaqSection";

const ExtrasPage = () => {
  const { t } = useTranslation();

  const Extras = [
    {
      id: "extraGame",
      title: t.extrasP.extraGame,
      description: t.extrasP.extraGame_text,
      cost: t.extrasP.extraGame_cost,
      image: "/img/extra/time.webp",
    },
    {
      id: "extraPresenter",
      title: t.extrasP.extraPresenter,
      description: t.extrasP.extraPresenter_t,
      cost: t.extrasP.extraPresenter_cost,
      image: "/img/extra/presenter.webp",
    },
    {
      id: "auction",
      title: t.extrasP.auction,
      description: t.extrasP.auction_t,
      cost: t.extrasP.auction_cost,
      image: "/img/extra/auction.webp",
    },
    {
      id: "bookmaker",
      title: t.extrasP.bookmaker,
      description: t.extrasP.bookmaker_t,
      cost: t.extrasP.bookmaker_cost,
      image: "/img/extra/bookmeker.webp",
    },
    {
      id: "music",
      title: t.extrasP.music,
      description: t.extrasP.music_t,
      cost: [t.extrasP.music_cost_0, t.extrasP.music_cost_1],
      image: "/img/extra/dj.webp",
    },
    {
      id: "photoB",
      title: t.extrasP.photoB,
      description: `${t.extrasP.photoB_t}\n${t.extrasP.photoB_size}`,
      cost: t.extrasP.photoB_cost,
      image: "/img/extra/pirson.webp",
    },
    {
      id: "gun",
      title: t.extrasP.gun,
      description: t.extrasP.gun_t,
      cost: t.extrasP.gun_cost,
      image: "/img/extra/gun.webp",
    },
    {
      id: "tableP",
      title: t.extrasP.tableP,
      description: t.extrasP.tableP_t,
      cost: [t.extrasP.tableP_cost_0, t.extrasP.tableP_cost_1],
      weight: t.extrasP.tableP_weight,
      size: t.extrasP.tableP_size,
      capacity: t.extrasP.tableP_capacity,
      image: "/img/extra/poker.webp",
    },
    {
      id: "tableR",
      title: t.extrasP.tableR,
      description: t.extrasP.tableR_t,
      cost: [t.extrasP.tableR_cost_0, t.extrasP.tableR_cost_1],
      weight: t.extrasP.tableR_weight,
      size: t.extrasP.tableR_size,
      capacity: t.extrasP.tableR_capacity,
      image: "/img/extra/tableR.webp",
    },
    {
      id: "tableBJ",
      title: t.extrasP.tableBJ,
      description: t.extrasP.tableBJ_t,
      cost: t.extrasP.tableBJ_cost_1,
      weight: t.extrasP.tableBJ_weight,
      size: t.extrasP.tableBJ_size,
      capacity: t.extrasP.tableBJ_capacity,
      image: "/img/extra/BJ.webp",
    },
    {
      id: "shop",
      title: t.extrasP.shop,
      description: `${t.extrasP.shop_t}`,
      cost: `${t.extrasP.shop_attention}`,
      image: "/img/extra/shop.webp",
    },
  ];
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 300, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className={`${css.bgImg} `}></div>
      <div className={css.pageTitle} style={{ opacity }}>
        <h2 className={css.title1}>{t.extrasP.title}</h2>
      </div>
      <Container>
        <section className={css.main} style={{ opacity }}>
          <p className={css.description}>{t.extrasP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <section className={css.extra_services}>
          <ul className={css.service_list}>
            {Extras.map((item, index) => (
              <React.Fragment key={item.id}>
                <li
                  id={item.id}
                  className={`${css.service_item} ${
                    index % 2 !== 0 ? css.reverse : ""
                  }`}
                >
                  <div className={css.image_wrapper}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className={css.text_wrapper}>
                    <h3 className={css.service_title}>{item.title}</h3>
                    <p className={css.service_description}>
                      {item.description.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    {item.cost && (
                      <p className={css.service_cost}>
                        {Array.isArray(item.cost)
                          ? item.cost.map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))
                          : item.cost.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                      </p>
                    )}

                    <div className={css.service_about}>
                      {item.weight && (
                        <p className={css.weight}>{item.weight}</p>
                      )}
                      {item.size && <p className={css.size}>{item.size}</p>}
                      {item.capacity && (
                        <p className={css.capacity}>{item.capacity}</p>
                      )}
                    </div>

                    {item.id === "shop" && (
                      <Link href="/shop" className={css.linkToShop}>
                        {t.extrasP.shop_link}
                        <span>
                          <FaSquareArrowUpRight />
                        </span>
                      </Link>
                    )}
                  </div>
                </li>
                {(index + 1) % 2 === 0 && <Overlay />}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </Container>
      <FaqSection />
      <ScrollTopBtn />
    </>
  );
};

export default ExtrasPage;
