import React from "react";
import css from "./Overlay.module.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const PhoneInput: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <input
    type="tel"
    inputMode="tel"
    required
    className={css.input}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    title="+380 XX XX XX XXX"
  />
);

export default PhoneInput;
