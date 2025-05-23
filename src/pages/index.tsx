import Head from "next/head";
import css from "../styles/Home.module.css";
import { useTranslation } from "../hooks/useTranslation";
import Container from "@/components/Container/Container";
import Table from "@/components/Table/Table";
import Overlay from "@/components/Overlay/Overlay";
import ClientsList from "@/components/Clients/Clients";
import path from "../components/PhotoGallery/imagesMainPage.json";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import { useEffect, useState } from "react";
import Thread from "@/components/Thread/Thread";
import FaqSection from "@/components/FAQ/FaqSection";

interface HomeProps {
  imagePaths: string[];
}

const Home: React.FC<HomeProps> = ({ imagePaths }) => {
  const { t } = useTranslation();

  const [opacity, setOpacity] = useState(1);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 200, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll(".fadeInUp").forEach((el) => {
        el.classList.add("fadeInUpVisible");
      });
    }, 200); // трохи затримки перед появою

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Head>
        <title>Організація гри в мафію - Mafia Dream Club</title>
        <meta
          name="description"
          content="Професійна організація гри в мафію для дітей, дорослих і корпоративів. Проведення свят, VIP вечірок і виїзних ігор."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="мафія, гра в мафію, мафія Київ, організація мафії, свято для дітей, мафія корпоратив, Mafia Dream"
        />
        <meta name="author" content="Mafia Dream" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="icon" href="/favicon-v2.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon-v2.ico" type="image/x-icon" />
      </Head>
      <div>
        <main>
          <div className={css.hero}>
            <Container>
              <h1
                className={`${css.title} fadeInUp ${
                  pageLoaded ? "fadeInUpVisible" : ""
                }`}
                style={{ opacity }}
              >
                <span className={css.slogan}>{t.homeP.sloganMain}</span>
                <span className={css.slogan}>{t.homeP.sloganSub}</span>
              </h1>
              <p
                className={`${css.heroDescription} fadeInUp ${
                  pageLoaded ? "fadeInUpVisible" : ""
                }`}
                style={{ opacity }}
              >
                {t.homeP.heroDescription}
              </p>
            </Container>
          </div>
          <Container>
            <div className={css.about}>
              <div className={css.about__counter}>
                <ul className={`${css.about__counter_list} fadeInUp`}>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <span className={css.sum}>14</span>
                      {t.homeP.years}
                    </p>
                  </li>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <span className={css.sum}>382</span>
                      {t.homeP.kids}
                    </p>
                  </li>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <span className={css.sum}>679</span>
                      {t.homeP.adult}
                    </p>
                  </li>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <span className={css.sum}>737</span>
                      {t.homeP.corporate}
                    </p>
                  </li>
                </ul>
              </div>
              <h2 className={`${css.about_title} fadeInUp`}>
                {t.homeP.aboutTitle}
              </h2>
              <p className={css.about_text}>{t.homeP.aboutText}</p>
            </div>
          </Container>
          <Thread imagePaths={imagePaths} double />
          <Container>
            <Table />
          </Container>
          <div className={css.mainPageBtn}>
            <Overlay />
          </div>

          <Container>
            <div className={css.video}>
              <iframe
                src="https://www.youtube.com/embed/tUHAoshTRQ0?si=zuLF6Ij4gPv7G3bo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <iframe
                src="https://www.youtube.com/embed/CY4_zTEm_sk?si=aN5_bPGc3OMPlLku"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </Container>
          <FaqSection />
          <ClientsList />
          <ScrollTopBtn />
        </main>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      imagePaths: path,
    },
  };
}
