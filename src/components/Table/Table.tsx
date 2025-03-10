import React, { useEffect } from "react";
import css from "./Table.module.css";
import { useTranslation } from "../../hooks/useTranslation";

import Link from "next/link";

const Table: React.FC = () => {
  const { t } = useTranslation();
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <table className={css.table}>
      <div className={css.table_body}>
        <Link href="/services/vip" className={css.column}>
          <p className={css.table_service}>{t.table.service2}</p>
          <p className={css.thumb_text_p}>{t.table.players}</p>
          <p className={css.thumb_text_p}>{t.table.rules}</p>
          <p className={css.thumb_text_p}>{t.table.specificVip}</p>
          <p className={css.table_price}>
            <span className={css.money}>{t.table.price2}</span>грн
          </p>
          <p className={css.more}>{t.table.more}</p>
        </Link>
        <Link href="/services/corporate" className={css.column}>
          <p className={css.table_service}>{t.table.service1}</p>
          <p className={css.thumb_text_p}>{t.table.players}</p>
          <p className={css.thumb_text_p}>{t.table.rules}</p>
          <p className={css.thumb_text_p}>{t.table.specificCorporate}</p>
          <p className={css.table_price}>
            <span className={css.money}>{t.table.price1}</span>грн
          </p>
          <p className={css.more}>{t.table.more}</p>
        </Link>
        <Link href="/services/kids" className={css.column}>
          <p className={css.table_service}>
            {t.table.service3}
            <br />
            <span className={css.age}>{t.table.age}</span>
          </p>
          <p className={css.thumb_text_p}>{t.table.players}</p>
          <p className={css.thumb_text_p}>{t.table.rules}</p>
          <p className={css.thumb_text_p}>{t.table.specificKids}</p>
          <p className={css.table_price}>
            <span className={css.money}>{t.table.price3}</span>грн
          </p>
          <p className={css.more}>{t.table.more}</p>
        </Link>
        <Link href="/services/birthday" className={css.column}>
          <p className={css.table_service}>{t.table.service4}</p>
          <p className={css.thumb_text_p}>{t.table.players}</p>
          <p className={css.thumb_text_p}>{t.table.rules}</p>
          <p className={css.thumb_text_p}>{t.table.specificBirthday}</p>
          <p className={css.table_price}>
            <span className={css.money}>{t.table.price4}</span>грн
          </p>
          <p className={css.more}>{t.table.more}</p>
        </Link>
        <Link href="/services/extras" className={css.column}>
          <p className={css.table_service}>Додаткові послуги</p>
          <p className={css.thumb_text_p}>{t.table.players}</p>
          <p className={css.thumb_text_p}>{t.table.rules}</p>
          <p className={css.thumb_text_p}>{t.table.specificBirthday}</p>
          <p className={css.table_price}>
            <span className={css.money}>{t.table.price4}</span>грн
          </p>
          <p className={css.more}>{t.table.more}</p>
        </Link>
      </div>
    </table>
  );
};

export default Table;
