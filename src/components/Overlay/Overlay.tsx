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
import "react-toastify/dist/ReactToastify.css";
import { validateOverlayForm } from "../utils/validateOverlayForm";
import CheckboxItem from "./CheckboxItem";
import { notify } from "../utils/notify";
import OverlayModal from "../common/OverlayModal";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";
import CommentTextarea from "./CommentTextarea";
import SnowContainer from "../SnowContainer/SnowContainer";
import { GOOGLE_CONVERSIONS } from "@/constants/analytics";

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

    const escapeMarkdown = (text: string) =>
      text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");

    const safeName = escapeMarkdown(templateParams.name);
    const safePhone = escapeMarkdown(templateParams.phone);
    const safeServices = escapeMarkdown(templateParams.services);
    const safeComment = escapeMarkdown(templateParams.comment);
    const rawPhone = templateParams.phone.replace(/\s/g, "");
    const safePhoneLink = `tel:${rawPhone.replace(/\+/g, "%2B")}`;

    const messageForTelegram = `
📩 *ХОЧУТЬ СВЯТО:*
👤 *Імʼя:* ${safeName}
📞 *Телефон:* [${safePhone}](${safePhoneLink})
🧩 *Послуги:* ${safeServices}
💬 *Коментар:* ${safeComment}
`.trim();

    emailjs
      .send(
        "service_awhca1b",
        "template_5etqtqn",
        templateParams,
        "nBlfFj-daI3JM87lR",
      )
      .then(
        async (response) => {
          console.log("SUCCESS!", response.status, response.text);

          const telegramRes = await fetch("/api/sendToTelegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: messageForTelegram }),
          });

          const telegramData = await telegramRes.json();

          if (!telegramRes.ok) {
            console.error("❌ Telegram did not send a message:", telegramData);
            notify(false, "Telegram не надіслав повідомлення 😔");
          } else {
            console.log("✅ Telegram message sent!", telegramData);
            notify(true, `${name}, супер, ми вам перезвоним!`);

            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "conversion", {
                send_to: `${GOOGLE_CONVERSIONS.LEAD_SUCCESS}`,
                event_callback: function () {
                  console.log(
                    "✅ [Analytics Debug] Conversion event sent to Google Ads",
                  );
                },
              });
            } else {
              console.warn(
                "❌ [Analytics Debug] gtag is not defined. Conversion event not sent.",
              );
            }

            resetForm();
            setIsSubmitting(false);
            setIsOpen(false);
          }
        },
        (err) => {
          console.error("FAILED...", err);
          notify(false, "Сталася помилка при відправці. Спробуйте ще.");
          setIsSubmitting(false);
        },
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
        : prevServices.filter((s) => s !== value),
    );
  };

  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_open", {
        event_category: "engagement",
        event_label: "Overlay Order Form Opened",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscPress);
    } else {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleEscPress);
    }

    return () => {
      document.documentElement.style.overflow = "";
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
            <div className={css.snowBackground}>
              <SnowContainer snowflakeCount={100}>
                <></>
              </SnowContainer>
            </div>
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
    </>
  );
};

export default Overlay;
