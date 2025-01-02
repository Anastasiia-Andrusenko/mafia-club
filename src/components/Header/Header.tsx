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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
        <Link href="/" className={css.logo}>
          <Image src={"/img/logo.png"} alt="logo" width={60} height={60} />
        </Link>

        {!isDesktop && (
          <>
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
                <NavBar closeMenu={closeMenu} />
                {isMenuOpen && (
                  <Link
                    href="/basket"
                    className={css.basketBtnNav}
                    onClick={closeMenu}
                  >
                    <LuShoppingCart />
                  </Link>
                )}
                <Link href="/basket" className={css.basket}>
                  <LuShoppingCart />
                </Link>
                <LangSwitcher />
              </>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
