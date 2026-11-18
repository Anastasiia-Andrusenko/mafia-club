import Link from "next/link";
import Container from "../Container/Container";
import NavBar from "../NavBar/NavBar";
import css from "./Header.module.css";
import Image from "next/image";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "@/hooks/useTranslation";
import { MdContactPhone } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);

    if (isMenuOpen) {
      setIsVisible(true);
      document.documentElement.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen, isDesktop]);

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
            <>
              {!isMenuOpen && (
                <Link
                  href="#footer"
                  className={isMenuOpen ? css.menuContacts : css.contacts}
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
            </>
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
