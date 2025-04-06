import React from "react";
import css from "./Overlay.module.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const NameInput: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    required
    className={css.input}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default NameInput;
