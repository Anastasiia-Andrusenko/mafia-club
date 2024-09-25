import Link from "next/link";
import Container from "../Container/Container";
import NavBar from "../NavBar/NavBar";
import css from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <Link href="/" className={css.logo}>
          <Image src={"/img/logo.png"} alt="logo" width={60} height={60} />
        </Link>
        <NavBar />
      </Container>
    </header>
  );
};

export default Header;
