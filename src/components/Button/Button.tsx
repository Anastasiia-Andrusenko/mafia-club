import React, { FC } from "react";
import css from "./Button.module.css";
// import { useTranslation } from "../../hooks/useTranslation";

interface ButtonProps {
  text: string;
  typeBtn: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  className?: any;
}

const Button: FC<ButtonProps> = ({ text, onClick, typeBtn }) => {
  // const { t } = useTranslation();

  return (
    <div className={css.btnWrapper}>
      <button type={typeBtn} className={css.btn} onClick={onClick} >
        {text}
      </button>
    </div>
  );
};

export default Button;
