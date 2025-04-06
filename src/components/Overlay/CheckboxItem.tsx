import React from "react";
import css from "./Overlay.module.css";

type CheckboxItemProps = {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  id,
  label,
  value,
  icon,
  onChange,
}) => (
  <label htmlFor={id}>
    {label}
    <span className={css.checkIcon}>{icon}</span>
    <input
      className={css.check}
      type="checkbox"
      onChange={onChange}
      id={id}
      name={id}
      value={value}
    />
  </label>
);

export default CheckboxItem;
