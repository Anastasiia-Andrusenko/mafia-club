import Link from "next/link";
import css from "./NavBar.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";

type NavBarProps = {
  closeMenu: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ closeMenu }) => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;
  const { t } = useTranslation();

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
        <li>
          <Link
            href="/services"
            className={`${css.link} ${
              isActive("/services") ? css.current : ""
            }`}
            onClick={closeMenu}
          >
            {t.nav.services}
          </Link>
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
    </nav>
  );
};

export default NavBar;
