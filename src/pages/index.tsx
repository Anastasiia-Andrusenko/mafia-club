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
import { motion } from "framer-motion";
import Thread from "@/components/Thread/Thread";
import FaqSection from "@/components/FAQ/FaqSection";
import AnimatedCounter from "@/components/common/AnimatedCounter";

interface HomeProps {
  imagePaths: string[];
}

const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Home: React.FC<HomeProps> = ({ imagePaths }) => {
  const { t } = useTranslation();

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 200, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              <h1 className={css.title} style={{ opacity }}>
                <span className={css.slogan}>{t.homeP.sloganMain}</span>
                <span className={css.slogan}>{t.homeP.sloganSub}</span>
              </h1>
              <p className={css.heroDescription} style={{ opacity }}>
                {t.homeP.heroDescription}
              </p>
            </Container>
          </div>
          <Container>
            <div className={css.about}>
              <p className={css.funFact}> {t.homeP.funFact}</p>
              <div className={css.about__counter}>
                <ul className={css.about__counter_list}>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <AnimatedCounter value={15} className={css.sum} />
                      {t.homeP.years}
                    </p>
                  </li>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <AnimatedCounter value={402} className={css.sum} />
                      {t.homeP.kids}
                    </p>
                  </li>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <AnimatedCounter value={713} className={css.sum} />
                      {t.homeP.adult}
                    </p>
                  </li>
                  <li className={css.item}>
                    <p className={css.counter_text}>
                      <AnimatedCounter value={752} className={css.sum} />
                      {t.homeP.corporate}
                    </p>
                  </li>
                </ul>
              </div>
              <motion.div {...scrollReveal}>
                <h2 className={css.about_title}>{t.homeP.aboutTitle}</h2>
                <p className={css.about_text}>{t.homeP.aboutText}</p>
              </motion.div>
            </div>
          </Container>
          <Thread imagePaths={imagePaths} double />
          <Container>
            <motion.div {...scrollReveal}>
              <Table />
            </motion.div>
          </Container>
          <div className={css.mainPageBtn}>
            <Overlay />
          </div>

          <Container>
            <motion.div className={css.video} {...scrollReveal}>
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
            </motion.div>
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
