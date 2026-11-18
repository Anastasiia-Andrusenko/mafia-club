import { useCallback, useEffect, useRef, useState } from "react";
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
import { deliverLead } from "@/lib/leadDelivery";
import { formatUaPhone } from "@/lib/phone";
import { escapeMarkdown, telLink } from "@/lib/telegram";

const Overlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Synchronous guard: state updates are async, so two quick submits could both pass.
  const submittingRef = useRef(false);

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const errorKey = validateOverlayForm({ name, phone, services });
    if (errorKey) {
      notify(false, t.validation[errorKey]);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    notify(true, t.validation.leadChecking);

    try {
      const templateParams = {
        name: name.trim(),
        phone: phone.trim(),
        services: services.join(", "),
        comment: comment.trim(),
      };

      const messageForTelegram = `
📩 *ХОЧУТЬ СВЯТО:*
👤 *Імʼя:* ${escapeMarkdown(templateParams.name)}
📞 *Телефон:* [${escapeMarkdown(templateParams.phone)}](${telLink(templateParams.phone)})
🧩 *Послуги:* ${escapeMarkdown(templateParams.services)}
💬 *Коментар:* ${escapeMarkdown(templateParams.comment)}
`.trim();

      // EmailJS and Telegram are independent: one failing must not lose the lead.
      const result = await deliverLead({
        templateId: "template_5etqtqn",
        templateParams,
        telegramMessage: messageForTelegram,
      });

      if (!result.ok) {
        notify(false, t.validation.sendFailed);
        return;
      }

      notify(true, `${templateParams.name}, ${t.validation.leadSuccess}`);

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
      setIsOpen(false);
    } catch (err) {
      console.error("Lead submission failed unexpectedly:", err);
      notify(false, t.validation.sendFailed);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatUaPhone(e.target.value));
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

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Only lock / unlock while this modal is open, so a closed instance (e.g.
    // the one inside the mobile menu) never releases a lock held elsewhere.
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscPress);
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
      <OverlayModal
        isOpen={isOpen}
        onClose={handleClose}
        overlayClassName={css.overlayLead}
        wrapperClassName={css.wrapperLead}
      >
        <Container>
          <div className={css.leadPanel}>
            <div className={css.snowBackground}>
              <SnowContainer snowflakeCount={100}>
                <></>
              </SnowContainer>
            </div>
            {/* Outside the scrolling <form> (its backdrop-filter would make it
                the containing block), so the X stays reachable on short
                windows. */}
            <button
              type="button"
              className={css.btnClose}
              onClick={handleClose}
              aria-label={t.a11y.closePhoto}
            >
              <TfiClose aria-hidden="true" />
            </button>
            <form className={css.form} onSubmit={handleSubmit}>
              <p className={css.formTitle}>{t.services.formTitle}</p>
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
                    checked={services.includes("Віп Мафія")}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="corporate"
                    label={t.services.corporateShort}
                    value="Корпоратив"
                    icon={<PiOfficeChair />}
                    checked={services.includes("Корпоратив")}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="outdoor"
                    label={t.services.outdoor}
                    value="Виїзна Мафія"
                    icon={<BiLandscape />}
                    checked={services.includes("Виїзна Мафія")}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="kids"
                    label={t.services.kids}
                    value="Дитяче Свято"
                    icon={<MdChildCare />}
                    checked={services.includes("Дитяче Свято")}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="birthday"
                    label={t.services.birth}
                    value="День народження"
                    icon={<LiaBirthdayCakeSolid />}
                    checked={services.includes("День народження")}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxItem
                    id="other"
                    label={t.services.other}
                    value="Ще не вирішили"
                    icon={<LiaMaskSolid />}
                    checked={services.includes("Ще не вирішили")}
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
