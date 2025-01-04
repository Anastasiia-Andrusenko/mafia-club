import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";
import Container from "../Container/Container";
import css from "./Footer.module.css";
import Image from "next/image";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
// import { RiInstagramFill } from "react-icons/ri";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.wrapper}>
          <Link href="/" className={css.logo}>
            <Image src={"/img/logo.png"} alt="logo" width={60} height={60} />
          </Link>

          <ul className={css.contacts}>
            <li className={css.contact_item}>
              <span className={css.contact_text}>{t.footer.mail}</span>
              <Link
                target="blank"
                href="mailto:info@mafiadream.com.ua"
                className={css.contact_link}
              >
                <IoMdMail className={css.contact_icon} />
                info@mafiadream.com.ua
              </Link>
            </li>
            <li className={css.contact_item}>
              <span className={css.contact_text}>{t.footer.call}</span>
              <Link
                target="blank"
                href="tel:+380976258545 "
                className={css.contact_link}
              >
                <FaPhoneSquareAlt className={css.contact_icon} />
                +380 97 625 85 45
              </Link>
            </li>
          </ul>
          <div className={css.social}>
            <p className={css.social_text}>{t.footer.getInTouch}</p>
            <ul className={css.social_list}>
              <li className={css.social_item}>
                <Link
                  href="https://www.youtube.com/user/MafiaDreamClub"
                  className={css.social_link}
                  target="blank"
                >
                  <FaYoutube />
                </Link>
              </li>
              <li className={css.social_item}>
                <Link
                  href="https://t.me/Khovaka"
                  className={css.social_link}
                  target="blank"
                >
                  <FaTelegram />
                </Link>
              </li>
              <li className={css.social_item}>
                <Link
                  href="https://www.facebook.com/MafiaDreamClub"
                  className={css.social_link}
                  target="blank"
                >
                  <FaSquareFacebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <address className={css.address}>
          <p>&copy; MAFIA Dream Club</p>
          <p>{t.footer.address}</p>
        </address>
      </Container>
    </footer>
  );
};

export default Footer;
