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
    required
    className={css.input}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    pattern="\\+380 \\d{2} \\d{2} \\d{2} \\d{3}"
    title="+380 XX XX XX XXX"
  />
);

export default PhoneInput;
