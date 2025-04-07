import Container from "@/components/Container/Container";
import css from "../../styles/services/extras.module.css";

import Overlay from "@/components/Overlay/Overlay";
import { useTranslation } from "@/hooks/useTranslation";
import React from "react";
import Image from "next/image";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";

const ExtrasPage = () => {
  const { t } = useTranslation();

  const Extras = [
    {
      id: "extraGame",
      title: t.extrasP.extraGame,
      description: t.extrasP.extraGame_text,
      coast: t.extrasP.extraGame_coast,
      image: "/img/extra/time.webp",
    },
    {
      id: "extraPresenter",
      title: t.extrasP.extraPresenter,
      description: t.extrasP.extraPresenter_t,
      coast: t.extrasP.extraPresenter_coast,
      image: "/img/extra/presenter.webp",
    },
    {
      id: "auction",
      title: t.extrasP.auction,
      description: t.extrasP.auction_t,
      coast: t.extrasP.auction_coast,
      image: "/img/extra/auction.webp",
    },
    {
      id: "bookmaker",
      title: t.extrasP.bookmaker,
      description: t.extrasP.bookmaker_t,
      coast: t.extrasP.bookmaker_coast,
      image: "/img/extra/bookmeker.webp",
    },
    {
      id: "music",
      title: t.extrasP.music,
      description: t.extrasP.music_t,
      coast: `${t.extrasP.music_coast_0}\n${t.extrasP.music_coast_1}`,
      image: "/img/extra/dj.webp",
    },
    {
      id: "photoB",
      title: t.extrasP.photoB,
      description: `${t.extrasP.photoB_t}\n${t.extrasP.photoB_size}`,
      coast: t.extrasP.photoB_coast,
      image: "/img/extra/pirson.webp",
    },
    {
      id: "gun",
      title: t.extrasP.gun,
      description: t.extrasP.gun_t,
      coast: t.extrasP.gun_coast,
      image: "/img/extra/gun.webp",
    },
    {
      id: "tableP",
      title: t.extrasP.tableP,
      description: t.extrasP.tableP_t,
      coast: `${t.extrasP.tableP_coast_0}\n${t.extrasP.tableP_coast_1}`,
      image: "/img/extra/poker.webp",
    },
    {
      id: "tableR",
      title: t.extrasP.tableR,
      description: t.extrasP.tableR_t,
      coast: `${t.extrasP.tableR_coast_0}\n${t.extrasP.tableR_coast_1}`,
      image: "/img/extra/tableR.webp",
    },
    {
      id: "tableBJ",
      title: t.extrasP.tableBJ,
      description: t.extrasP.tableBJ_t,
      coast: t.extrasP.tableBJ_coast_1,
      image: "/img/extra/BJ.webp",
    },
    {
      id: "shop",
      title: t.extrasP.shop,
      description: `${t.extrasP.shop_t}`,
      coast: `${t.extrasP.shop_attention}`,
      image: "/img/extra/shop.webp",
    },
  ];

  return (
    <>
      <div className={`${css.bgImg} `}></div>
      <div className={css.pageTitle}>
        <h2 className={css.title1}>{t.extrasP.title}</h2>
      </div>
      <Container>
        <section className={css.main}>
          <p className={css.description}>{t.extrasP.description}</p>
        </section>
        <div className={css.emotionalImg}></div>
        <section className={css.extra_services}>
          <ul className={css.service_list}>
            {Extras.map((item, index) => (
              <React.Fragment key={item.id}>
                <li
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
                    {item.coast && (
                      <p className={css.service_coast}>
                        {item.coast.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </li>
                {(index + 1) % 2 === 0 && <Overlay />}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </Container>
      <ScrollTopBtn />
    </>
  );
};

export default ExtrasPage;
