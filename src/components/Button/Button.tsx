import React, { FC } from "react";
import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  typeBtn: "submit" | "button" | "reset";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick, typeBtn }) => {
  return (
    <div className={css.btnWrapper}>
      <button type={typeBtn} className={css.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
