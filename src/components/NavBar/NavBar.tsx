import Link from "next/link";
import css from "./NavBar.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import Overlay from "../Overlay/Overlay";
import { MdContactPhone } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useCart } from "@/context/CartContext";

type NavBarProps = {
  closeMenu: () => void;
  isDesktop: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ closeMenu, isDesktop }) => {
  const router = useRouter();
  const isActive = (path: string) =>
    path === "/" ? router.pathname === "/" : router.pathname.startsWith(path);

  const { t } = useTranslation();
  const { cart } = useCart();

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li>
          <Link
            href="/"
            className={`${css.link} ${isActive("/") ? css.current : ""}`}
            onClick={closeMenu}
          >
            {t.nav.main}
          </Link>
        </li>
        <li
          className={`${css.services} ${isServicesOpen ? css.open : ""}`}
          onMouseEnter={() => isDesktop && setIsServicesOpen(true)}
          onMouseLeave={() => isDesktop && setIsServicesOpen(false)}
        >
          <Link
            href="/services"
            className={`${css.link} ${
              isActive("/services") ? css.current : ""
            }`}
            onClick={closeMenu}
          >
            {t.nav.services}
          </Link>
          {isDesktop && (
            <ul className={css.submenu}>
              <li
                className={`${css.subLink} ${
                  isActive("/services/vip") ? css.subCurrent : ""
                }`}
              >
                <Link href="/services/vip" onClick={closeMenu}>
                  {t.services.vip}
                </Link>
              </li>
              <li
                className={`${css.subLink} ${
                  isActive("/services/corporate") ? css.subCurrent : ""
                }`}
              >
                <Link href="/services/corporate" onClick={closeMenu}>
                  {t.services.corporate}
                </Link>
              </li>
              <li
                className={`${css.subLink} ${
                  isActive("/services/outdoor") ? css.subCurrent : ""
                }`}
              >
                <Link href="/services/outdoor" onClick={closeMenu}>
                  {t.services.outdoor}
                </Link>
              </li>
              <li
                className={`${css.subLink} ${
                  isActive("/services/kids") ? css.subCurrent : ""
                }`}
              >
                <Link href="/services/kids" onClick={closeMenu}>
                  {t.services.kids}
                </Link>
              </li>
              <li
                className={`${css.subLink} ${
                  isActive("/services/birthday") ? css.subCurrent : ""
                }`}
              >
                <Link href="/services/birthday" onClick={closeMenu}>
                  {t.services.birth}
                </Link>
              </li>

              <li
                className={`${css.subLink} ${
                  isActive("/services/extras") ? css.subCurrent : ""
                }`}
              >
                <Link href="/services/extras" onClick={closeMenu}>
                  {t.extrasP.pageName}
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            href="/gallery"
            className={`${css.link} ${isActive("/gallery") ? css.current : ""}`}
            onClick={closeMenu}
          >
            {t.nav.gallery}
          </Link>
        </li>
        <li>
          <Link
            href="/rules"
            className={`${css.link} ${isActive("/rules") ? css.current : ""}`}
            onClick={closeMenu}
          >
            {t.nav.rules}
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className={`${css.link} ${isActive("/shop") ? css.current : ""}`}
            onClick={closeMenu}
          >
            {t.nav.shop}
          </Link>
        </li>
        <li>
          <Link
            href="/reviews"
            className={`${css.link} ${isActive("/reviews") ? css.current : ""}`}
            onClick={closeMenu}
          >
            {t.nav.reviews}
          </Link>
        </li>
      </ul>
      <div className={css.navButtonsContainer}>
        <div className={css.buttonsIconsWrapper}>
          {isDesktop && (
            <Link href="#footer" className={css.contactHeader}>
              <MdContactPhone />
            </Link>
          )}
          {isDesktop && (
            <Link href="/basket" className={css.basket}>
              {cart.length > 0 ? <TfiShoppingCartFull /> : <LuShoppingCart />}
            </Link>
          )}
        </div>
        <div className={css.mainFormBtn}>
          <Overlay />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
