import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Container from "../Container/Container";
import css from "./Overlay.module.css";
import { TfiClose } from "react-icons/tfi";

const Overlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden"; // Заборонити прокрутку сторінки
      document.addEventListener("keydown", handleEscPress);
    } else {
      document.documentElement.style.overflow = ""; // Відновити прокрутку
      document.removeEventListener("keydown", handleEscPress);
    }

    return () => {
      document.documentElement.style.overflow = ""; // Завжди відновлюємо прокрутку при розмонтуванні
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className={css.overlay} onClick={handleOverlayClick}>
          <Container>
            <div className={css.formWrapper}>
              <form className={css.form}>
                <button
                  type="button"
                  className={css.btnClose}
                  onClick={handleClose}
                >
                  <TfiClose />
                </button>
                <input
                  type="text"
                  placeholder="Ім'я"
                  required
                  className={css.input}
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  className={css.input}
                />
                <textarea
                  placeholder="Повідомлення"
                  required
                  className={css.textarea}
                ></textarea>
                <Button
                  text="Відправити"
                  typeBtn="submit"
                  // onClick={handleClose}
                />
              </form>
            </div>
          </Container>
        </div>
      ) : (
        <Button text="Залишити заявку" typeBtn="button" onClick={handleOpen} />
      )}
    </>
  );
};

export default Overlay;
