import React from "react";
import css from "./Table.module.css";
import { useTranslation } from "../../hooks/useTranslation";
import Link from "next/link";
import SnowContainer from "../SnowContainer/SnowContainer";
import { PiTreeEvergreen } from "react-icons/pi";

const serviceItems = [
  { id: 1, href: "/services/corporate" },
  { id: 2, href: "/services/vip" },
  { id: 3, href: "/services/kids" },
  { id: 4, href: "/services/birthday" },
  { id: 5, href: "/services/outdoor" },
  { id: 6, href: "/services/extras" },
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Table: React.FC = () => {
  const { t } = useTranslation();
  const rows = chunkArray(serviceItems, 3);

  return (
    <div className={css.table}>
      {rows.map((row, rowIndex) => (
        <div className={css.table_row} key={rowIndex}>
          {row.map(({ id, href }) => {
            const service = t.table[`service${id}`];
            const description = t.table[`description${id}`];
            const price = t.table[`price${id}`];

            const showSnow = true;

            return (
              <Link href={href} className={css.column} key={id}>
                {showSnow && (
                  <SnowContainer
                    className={css.snowOverlay}
                    snowflakeCount={50}
                  >
                    <></>
                  </SnowContainer>
                )}

                <div className={css.cardTop}>
                  <p className={css.table_service}>
                    {service}
                    {id === 3 && (
                      <>
                        <br />
                        <span className={css.age}>{t.table.age}</span>
                      </>
                    )}
                  </p>
                  <p className={css.thumb_text_p}>{description}</p>
                </div>

                <div className={css.cardBottom}>
                  <p className={css.table_price}>
                    <span className={css.money}>{price}</span> грн
                  </p>
                  <PiTreeEvergreen className={css.treeIcon} />
                  <span className={css.notification}>
                    {t.tempMessage.notification}
                  </span>
                  <p className={css.more}>{t.table.more}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Table;
