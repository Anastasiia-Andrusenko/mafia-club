import css from "../styles/Home.module.css";
import { useTranslation } from "../hooks/useTranslation";
import Container from "@/components/Container/Container";
import Table from "@/components/Table/Table";
import Overlay from "@/components/Overlay/Overlay";
import ClientsList from "@/components/Clients/Clients";
import path from "../components/PhotoGallery/imagesMainPage.json";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Thread from "@/components/Thread/Thread";
import FaqSection from "@/components/FAQ/FaqSection";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import YouTubeFacade from "@/components/YouTubeFacade/YouTubeFacade";
// Static imports give the hashed URLs the CSS background resolves to, so the
// preloads below are exactly the requests the hero will make.
import heroDesktop from "../../public/img/hero.webp";
import heroMobile from "../../public/img/hero-mobile.webp";

interface HomeProps {
  imagePaths: string[];
}

const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const HOME_VIDEOS = [
  { id: "tUHAoshTRQ0", titleKey: "videoTitle1" },
  { id: "CY4_zTEm_sk", titleKey: "videoTitle2" },
] as const;

const Home: React.FC<HomeProps> = ({ imagePaths }) => {
  const { t } = useTranslation();
  const heroContentRef = useRef<HTMLDivElement>(null);

  // The hero copy fades out over the first 200px of scroll. Browsers with
  // scroll-driven animations do this in CSS (Home.module.css), with no JS at
  // all. Everywhere else, fall back to a rAF-throttled direct style write:
  // same formula as before, but no React state, so scrolling never re-renders
  // the page.
  useEffect(() => {
    if (CSS.supports("animation-timeline: scroll()")) return;
    const el = heroContentRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.opacity = String(Math.max(1 - window.scrollY / 200, 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div>
      <Head>
        {/* The hero background is the LCP element, but it is a CSS image only
            discovered after the stylesheet: preload it at high priority so it
            is not stuck behind fonts / scripts / thumbnails. The media queries
            mirror the breakpoint in Home.module.css so only one is fetched. */}
        <link
          rel="preload"
          as="image"
          href={heroMobile.src}
          media="(max-width: 767.98px)"
          {...{ fetchpriority: "high" }}
        />
        <link
          rel="preload"
          as="image"
          href={heroDesktop.src}
          media="(min-width: 768px)"
          {...{ fetchpriority: "high" }}
        />
      </Head>
      <div className={css.hero}>
        <Container>
          <div ref={heroContentRef} className={css.heroContent}>
            <h1 className={css.title}>
              <span className={css.slogan}>{t.homeP.sloganMain}</span>
              <span className={css.slogan}>{t.homeP.sloganSub}</span>
            </h1>
            <p className={css.heroDescription}>
              {t.homeP.heroDescription}
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div className={css.about}>
          <p className={css.funFact}> {t.homeP.funFact}</p>
          <div className={css.about__counter}>
            <ul className={css.about__counter_list}>
              <li className={css.item}>
                <p className={css.counter_text}>
                  <AnimatedCounter value={16} className={css.sum} />
                  {t.homeP.years}
                </p>
              </li>
              <li className={css.item}>
                <p className={css.counter_text}>
                  <AnimatedCounter value={437} className={css.sum} />
                  {t.homeP.kids}
                </p>
              </li>
              <li className={css.item}>
                <p className={css.counter_text}>
                  <AnimatedCounter value={749} className={css.sum} />
                  {t.homeP.adult}
                </p>
              </li>
              <li className={css.item}>
                <p className={css.counter_text}>
                  <AnimatedCounter value={801} className={css.sum} />
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
          {HOME_VIDEOS.map(({ id, titleKey }) => (
            <YouTubeFacade
              key={id}
              className={css.videoItem}
              videoId={id}
              title={t.homeP[titleKey]}
              poster={`/img/video/${id}.webp`}
            />
          ))}
        </motion.div>
      </Container>
      <FaqSection />
      <ClientsList />
      <ScrollTopBtn />
    </div>
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
