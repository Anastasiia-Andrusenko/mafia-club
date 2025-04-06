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
import { LiaMaskSolid } from "react-icons/lia";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateOverlayForm } from "../utils/validateOverlayForm";
import CheckboxItem from "./CheckboxItem";
import { notify } from "../utils/notify";
import OverlayModal from "./OverlayModal";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";
import CommentTextarea from "./CommentTextarea";

const Overlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const error = validateOverlayForm({ name, phone, services });
    if (error) {
      notify(false, error);
      return;
    }

    notify(true, "Дані успішно перевірені. Відправляємо заявку...");
    setIsSubmitting(true);

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
          resetForm();
          setIsSubmitting(false);
          setIsOpen(false);
        },
        (err) => {
          console.error("FAILED...", err);
          notify(false, "Сталася помилка при відправці. Спробуйте ще.");
          setIsSubmitting(false);
        }
      );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");

    if (!digits.startsWith("380")) {
      digits = "380";
    }

    digits = digits.slice(0, 12);

    const parts = [
      "+380",
      digits.slice(3, 5),
      digits.slice(5, 7),
      digits.slice(7, 9),
      digits.slice(9, 12),
    ].filter(Boolean);

    setPhone(parts.join(" "));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setServices((prevServices) =>
      checked
        ? [...prevServices, value]
        : prevServices.filter((s) => s !== value)
    );
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

  const resetForm = () => {
    setName("");
    setPhone("");
    setServices([]);
    setComment("");
  };

  return (
    <>
      <Button text={t.overlay.text} typeBtn="button" onClick={handleOpen} />
      <OverlayModal isOpen={isOpen} onClose={handleClose}>
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
                <NameInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.overlay.name}
                />
                <PhoneInput
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t.overlay.phone}
                />
              </div>

              <div className={css.formServicesWrapper}>
                <p className={css.formServices}>{t.services.formServices}</p>
                <div className={css.checkboxWrapper}>
                  <CheckboxItem
                    id="vip"
                    label={t.services.vip}
                    value="Віп Мафія"
                    icon={<IoDiamondOutline />}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="corporate"
                    label={t.services.corporateShort}
                    value="Корпоратив"
                    icon={<PiOfficeChair />}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="outdoor"
                    label={t.services.outdoor}
                    value="Виїзна Мафія"
                    icon={<BiLandscape />}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="kids"
                    label={t.services.kids}
                    value="Дитяче Свято"
                    icon={<MdChildCare />}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="birthday"
                    label={t.services.birth}
                    value="День народження"
                    icon={<LiaBirthdayCakeSolid />}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="other"
                    label={t.services.other}
                    value="Ще не вирішили"
                    icon={<LiaMaskSolid />}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
              <CommentTextarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.overlay.message}
              />
              <Button
                text={isSubmitting ? t.overlay.sending : t.overlay.send}
                typeBtn="submit"
                disabled={isSubmitting}
              />
            </form>
          </div>
        </Container>
      </OverlayModal>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Overlay;
