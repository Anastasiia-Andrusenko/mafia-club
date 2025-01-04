import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Container from "../Container/Container";
import css from "./Overlay.module.css";
import { TfiClose } from "react-icons/tfi";
import { useTranslation } from "../../hooks/useTranslation";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoDiamondOutline } from "react-icons/io5";
import { BiLandscape } from "react-icons/bi";
import { PiOfficeChair } from "react-icons/pi";
import { MdChildCare } from "react-icons/md";
import { RiEnglishInput } from "react-icons/ri";
import { LiaMaskSolid } from "react-icons/lia";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Overlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedName = name.trim();

    if (cleanedName.replace(/\s+/g, "").length < 3) {
      notify(false, "Ім'я повинно містити мінімум 3 символи.");
      return;
    }

    if (services.length === 0) {
      notify(false, "Оберіть хоча б один варіант заходу");
      return;
    }

    if (!/^\+380 \d{2} \d{2} \d{2} \d{3}$/.test(phone)) {
      notify(
        false,
        "Невірний формат номера телефону. Вкажіть номер у форматі +380 XX XX XX XXX."
      );
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (/^(\d)\1*$/.test(phoneDigits.slice(3))) {
      notify(false, "Вкажіть свій реальний номер.");
      return;
    }

    notify(true, "Дані успішно перевірені. Відправляємо заявку...");

    const templateParams = {
      name: name.trim(),
      phone: phone.trim(),
      services: services.join(", "),
      comment: comment.trim(),
    };

    emailjs
      .send(
        "service_awhca1b",
        "template_5etqtqn",
        templateParams,
        "nBlfFj-daI3JM87lR"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          notify(true, `${name}, супер, ми вам перезвоним!`);
        },
        (err) => {
          console.error("FAILED...", err);
          notify(false, "Сталася помилка при відправці. Спробуйте ще.");
        }
      );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 12) input = input.slice(0, 12);
    if (input.startsWith("380")) {
      input = `+380 ${input.slice(3, 5)} ${input.slice(5, 7)} ${input.slice(
        7,
        9
      )} ${input.slice(9, 12)}`;
    } else {
      input = "+380";
    }
    setPhone(input.trim());
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setServices((prevServices) =>
      checked
        ? [...prevServices, value]
        : prevServices.filter((s) => s !== value)
    );
  };

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

  const notify = (isSuccess: boolean, message: string) => {
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className={css.overlay} onClick={handleOverlayClick}>
          <Container>
            <div className={css.formWrapper}>
              <form className={css.form} onSubmit={handleSubmit}>
                <p className={css.formTitle}>{t.services.formTitle}</p>
                <button
                  type="button"
                  className={css.btnClose}
                  onClick={handleClose}
                >
                  <TfiClose />
                </button>
                <div className={css.namePhone}>
                  <input
                    type="text"
                    placeholder={t.overlay.name}
                    required
                    value={name}
                    className={css.input}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder={t.overlay.phone}
                    required
                    className={css.input}
                    value={phone}
                    onChange={handlePhoneChange}
                    pattern="\+380 \d{2} \d{2} \d{2} \d{3}"
                    title="+380 XX XX XX XXX"
                  />
                </div>

                <div className={css.formServicesWrapper}>
                  <p className={css.formServices}>{t.services.formServices}</p>
                  <div className={css.checkboxWrapper}>
                    <label htmlFor="vip">
                      {t.services.vip}
                      <span className={css.checkIcon}>
                        <IoDiamondOutline />
                      </span>
                      <input
                        className={css.check}
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        id="vip"
                        name="vip"
                        value="Віп Мафія"
                      />
                    </label>
                    <label htmlFor="corporate">
                      {t.services.corporateShort}
                      <span className={css.checkIcon}>
                        <PiOfficeChair />
                      </span>
                      <input
                        className={css.check}
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        id="corporate"
                        name="corporate"
                        value="Корпоратив"
                      />
                    </label>
                    <label htmlFor="outdoor">
                      {t.services.outdoor}
                      <span className={css.checkIcon}>
                        <BiLandscape />
                      </span>
                      <input
                        type="checkbox"
                        className={css.check}
                        onChange={handleCheckboxChange}
                        id="outdoor"
                        name="outdoor"
                        value="Виїзна Мафія"
                      />
                    </label>
                    <label htmlFor="kids">
                      {t.services.kids}
                      <span className={css.checkIcon}>
                        <MdChildCare />
                      </span>
                      <input
                        type="checkbox"
                        className={css.check}
                        onChange={handleCheckboxChange}
                        id="kids"
                        name="kids"
                        value="Дитяче Свято"
                      />
                    </label>
                    <label htmlFor="birthday">
                      {t.services.birth}
                      <span className={css.checkIcon}>
                        <LiaBirthdayCakeSolid />
                      </span>
                      <input
                        type="checkbox"
                        className={css.check}
                        onChange={handleCheckboxChange}
                        id="birthday"
                        name="birthday"
                        value="День народження"
                      />
                    </label>
                    <label htmlFor="english">
                      {t.services.engM}
                      <span className={css.checkIcon}>
                        <RiEnglishInput />
                      </span>
                      <input
                        type="checkbox"
                        className={css.check}
                        onChange={handleCheckboxChange}
                        id="english"
                        name="english"
                        value="Англійська Мафія"
                      />
                    </label>
                    <label htmlFor="other">
                      {t.services.other}
                      <span className={css.checkIcon}>
                        <LiaMaskSolid />
                      </span>
                      <input
                        type="checkbox"
                        className={css.check}
                        onChange={handleCheckboxChange}
                        id="other"
                        name="other"
                        value="Ще не вирішили"
                      />
                    </label>
                  </div>
                </div>
                <textarea
                  placeholder={t.overlay.message}
                  className={css.textarea}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <Button text={t.overlay.send} typeBtn="submit" />
              </form>
            </div>
          </Container>
          <ToastContainer theme="dark" />
        </div>
      ) : (
        <Button text={t.overlay.text} typeBtn="button" onClick={handleOpen} />
      )}
    </>
  );
};

export default Overlay;
