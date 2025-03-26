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
      // Таймер для плавного закриття
      const timer = setTimeout(() => setIsVisible(false), 1000); // 300 мс — тривалість анімації
      return () => clearTimeout(timer); // Очищення таймера при повторному виклику
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen, isDesktop]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Функція для закриття меню
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerWrapper}>
          <Link href="/" className={css.logo}>
            <Image src={"/img/logo.png"} alt="logo" width={40} height={44} />
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
                >
                  <MdContactPhone />
                </Link>
              )}

              {!isMenuOpen && (
                <Link href="/basket" className={css.basketBtn}>
                  <LuShoppingCart />
                </Link>
              )}
              <button
                className={`${css.menuButton} ${
                  isMenuOpen ? css.menuButtonOpen : ""
                }`}
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <span className={css.closeIcon}>
                    <RiCloseLargeLine />
                  </span>
                ) : (
                  <span className={css.burgerIcon}>
                    <GiHamburgerMenu />
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
                    <Link
                      href="/basket"
                      className={css.basketBtnNav}
                      onClick={closeMenu}
                    >
                      <LuShoppingCart />
                      {t.basket.basket}
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
          <LangSwitcher />
        </div>
      </Container>
    </header>
  );
};

export default Header;
