import React from "react";
import css from "./Overlay.module.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

const CommentTextarea: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <textarea
    className={css.textarea}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default CommentTextarea;
