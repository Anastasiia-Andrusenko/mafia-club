import React, { useEffect, useState } from "react";
import css from "./Table.module.css";
import { useTranslation } from "../../hooks/useTranslation";
import { BsQuestionSquare } from "react-icons/bs";
import Link from "next/link";

const Table: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getHref = (section: string) => {
    return isMobile ? `/services#${section}` : `/services#services`;
  };

  return (
    <table className={css.table}>
      <tbody className={css.table_body}>
        <tr className={css.table_row}>
          <td className={css.table_service}>
            <Link href={getHref("corporate")}>{t.table.service1}</Link>
          </td>
          <td className={css.table_price}>
            <span className={css.money}>{t.table.price1}</span>грн
          </td>
          <td className={css.table_que}>
            <Link href={getHref("corporate")}>
              <BsQuestionSquare />
            </Link>
          </td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>
            <Link href={getHref("vip")}>{t.table.service2}</Link>
          </td>
          <td className={css.table_price}>
            <span className={css.money}>{t.table.price2}</span>грн
          </td>
          <td className={css.table_que}>
            <Link href={getHref("vip")}>
              <BsQuestionSquare />
            </Link>
          </td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>
            <Link href={getHref("kids")}>
              {t.table.service3}
              <span className={css.age}>{t.table.age}</span>
            </Link>
          </td>
          <td className={css.table_price}>
            <span className={css.money}>{t.table.price3}</span>грн
          </td>
          <td className={css.table_que}>
            <Link href={getHref("kids")}>
              <BsQuestionSquare />
            </Link>
          </td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>
            <Link href={getHref("birthday")}>{t.table.service4} </Link>
          </td>
          <td className={css.table_price}>
            <span className={css.money}>{t.table.price4}</span>грн
          </td>
          <td className={css.table_que}>
            <Link href={getHref("birthday")}>
              {" "}
              <BsQuestionSquare />{" "}
            </Link>
          </td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>
            {" "}
            <Link href={getHref("extra")}>{t.table.service5}</Link>
          </td>
          <td className={css.table_price}>
            {t.table.from}
            <span className={css.money}>{t.table.price5}</span>
            грн
          </td>
          <td className={css.table_que}>
            <Link href={getHref("extra")}>
              {" "}
              <BsQuestionSquare />
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
