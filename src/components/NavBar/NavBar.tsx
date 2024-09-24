import Link from "next/link";
import css from "./NavBar.module.css";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li>
          <Link
            href="/"
            className={`${css.link} ${isActive("/") ? css.current : ""}`}
          >
            Головна
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className={`${css.link} ${
              isActive("/services") ? css.current : ""
            }`}
          >
            Послуги
          </Link>
        </li>
        <li>
          <Link
            href="/gallery"
            className={`${css.link} ${isActive("/gallery") ? css.current : ""}`}
          >
            Галерея
          </Link>
        </li>
        <li>
          <Link
            href="/rules"
            className={`${css.link} ${isActive("/rules") ? css.current : ""}`}
          >
            Правила гри
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className={`${css.link} ${isActive("/shop") ? css.current : ""}`}
          >
            Магазин
          </Link>
        </li>
        <li>
          <Link
            href="/reviews"
            className={`${css.link} ${isActive("/reviews") ? css.current : ""}`}
          >
            Відгуки
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
