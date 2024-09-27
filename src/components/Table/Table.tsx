import React from "react";
import css from "./Table.module.css";
import { useTranslation } from "../../hooks/useTranslation";

const Table: React.FC = () => {
  const { t } = useTranslation();

  return (
    <table className={css.table}>
      <tbody className={css.table_body}>
        <tr className={css.table_row}>
          <td className={css.table_service}>{t.table.service1}</td>
          <td className={css.table_price}>{t.table.price1}</td>
          <td className={css.table_}>BTN</td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>{t.table.service2}</td>
          <td className={css.table_price}>{t.table.price2}</td>
          <td className={css.table_}>BTN</td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>{t.table.service3}</td>
          <td className={css.table_price}>{t.table.price3}</td>
          <td className={css.table_}>BTN</td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>{t.table.service4}</td>
          <td className={css.table_price}>{t.table.price4}</td>
          <td className={css.table_}>BTN</td>
        </tr>
        <tr className={css.table_row}>
          <td className={css.table_service}>{t.table.service5}</td>
          <td className={css.table_price}>{t.table.price5}</td>
          <td className={css.table_}>BTN</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
