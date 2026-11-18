import Link from "next/link";
import Container from "../Container/Container";
import NavBar from "../NavBar/NavBar";
import css from "./Header.module.css";
import Image from "next/image";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "@/hooks/useTranslation";
import { MdContactPhone } from "react-icons/md";

// Header switches between the burger menu and the inline desktop nav here.
// Keep in sync with the `min-width` media queries in Header / NavBar /
// LangSwitcher CSS modules.
const HEADER_DESKTOP_QUERY = "(min-width: 1024px)";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // Follows the viewport live (the old one-off window.innerWidth check left
  // the header stuck in its initial state after a resize).
  const isDesktop = useMediaQuery(HEADER_DESKTOP_QUERY);
  const { t } = useTranslation();

  // Crossing into the desktop layout always closes the mobile menu.
  useEffect(() => {
    if (isDesktop) setIsMenuOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true);
      // Lock the page behind the drawer. Where the scrollbar takes space
      // (desktop / tablet), reserve its width so the layout does not shift
      // when it disappears (globals.css + header read --scrollbar-comp).
      const root = document.documentElement;
      const scrollbar = window.innerWidth - root.clientWidth;
      root.style.setProperty("--scrollbar-comp", `${scrollbar}px`);
      root.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        root.style.removeProperty("--scrollbar-comp");
        root.style.overflow = "";
        document.body.style.overflow = "";
      };
    }
    const timer = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerWrapper}>
          <Link href="/" className={css.logo}>
            {/* Decorative: the brand name is right next to it. 36x44 matches the
                real 327x398 artwork (the old 40x44 stretched it); it is above
                the fold on every page, so never lazy-load it. */}
            <Image
              src="/img/logo-sm.webp"
              alt=""
              width={36}
              height={44}
              loading="eager"
            />
            <div className={css.logo_text}>
              <p className={css.mafia}>MAFIA</p>
              <span className={css.dream}>DREAM CLUB</span>
            </div>
          </Link>

          {!isDesktop && (
            <div className={css.actions}>
              {!isMenuOpen && (
                <Link
                  href="#footer"
                  className={css.contacts}
                  onClick={closeMenu}
                  aria-label={t.a11y.contacts}
                >
                  <MdContactPhone aria-hidden="true" />
                </Link>
              )}

              {!isMenuOpen && (
                <Link
                  href="/basket"
                  className={css.basketBtn}
                  aria-label={t.a11y.basket}
                >
                  <LuShoppingCart aria-hidden="true" />
                </Link>
              )}
              <button
                type="button"
                className={`${css.menuButton} ${
                  isMenuOpen ? css.menuButtonOpen : ""
                }`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t.a11y.menuClose : t.a11y.menuOpen}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <span className={css.closeIcon}>
                    <RiCloseLargeLine aria-hidden="true" />
                  </span>
                ) : (
                  <span className={css.burgerIcon}>
                    <GiHamburgerMenu aria-hidden="true" />
                  </span>
                )}
              </button>
            </div>
          )}
          {(isVisible || isDesktop) && (
            <div
              className={`${css.nav} ${
                isMenuOpen || isDesktop ? css.navOpen : ""
              }`}
            >
              {(isVisible || isDesktop) && (
                <>
                  <NavBar closeMenu={closeMenu} isDesktop={isDesktop} />
                  {isMenuOpen && (
                    <>
                      {" "}
                      <Link
                        href="/basket"
                        className={css.basketBtnNav}
                        onClick={closeMenu}
                      >
                        <LuShoppingCart />
                        {t.basket.basket}
                      </Link>
                      <Link
                        href="#footer"
                        className={`${css.basketBtnNav} ${css.cont}`}
                        onClick={closeMenu}
                      >
                        <MdContactPhone />
                        {t.nav.contact}
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {(isMenuOpen || isDesktop) && <LangSwitcher />}
        </div>
      </Container>
      {/* The interactive menu mounts after a viewport check on the client, so
          expose the primary links in the server HTML for crawlers / no-JS. */}
      <noscript>
        <nav aria-label="Main">
          <ul>
            <li>
              <Link href="/">{t.nav.main}</Link>
            </li>
            <li>
              <Link href="/services/">{t.nav.services}</Link>
            </li>
            <li>
              <Link href="/services/vip/">{t.services.vip}</Link>
            </li>
            <li>
              <Link href="/services/corporate/">{t.services.corporate}</Link>
            </li>
            <li>
              <Link href="/services/outdoor/">{t.services.outdoor}</Link>
            </li>
            <li>
              <Link href="/services/kids/">{t.services.kids}</Link>
            </li>
            <li>
              <Link href="/services/birthday/">{t.services.birth}</Link>
            </li>
            <li>
              <Link href="/services/extras/">{t.extrasP.pageName}</Link>
            </li>
            <li>
              <Link href="/gallery/">{t.nav.gallery}</Link>
            </li>
            <li>
              <Link href="/rules/">{t.nav.rules}</Link>
            </li>
            <li>
              <Link href="/shop/">{t.nav.shop}</Link>
            </li>
            <li>
              <Link href="/reviews/">{t.nav.reviews}</Link>
            </li>
          </ul>
        </nav>
      </noscript>
    </header>
  );
};

export default Header;
