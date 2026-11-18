// components/OrderForm.tsx
import { useCart } from "@/context/CartContext";
import React, { useRef, useState } from "react";
import { Product } from "@/types/product";
import css from "./OrderForm.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { MdOutlineDoneOutline } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollLock } from "@/hooks/useScrollLock";
import { deliverLead } from "@/lib/leadDelivery";
import { formatUaPhone } from "@/lib/phone";
import { escapeMarkdown, telLink } from "@/lib/telegram";
import { validateName, validatePhone } from "../utils/validateOverlayForm";

interface OrderFormProps {
  onBack: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onBack }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Synchronous guard: state updates are async, so two quick submits could both pass.
  const submittingRef = useRef(false);
  const { cart, clearCart } = useCart();
  const { t } = useTranslation();
  const total = cart.reduce(
    (sum: number, product: Product) => sum + product.price * product.quantity,
    0
  );

  useScrollLock(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    // Validate first - no success feedback until the input is known to be valid.
    const errorKey =
      validateName(name) ??
      (cart.length === 0 ? "cartEmpty" : null) ??
      validatePhone(phone);
    if (errorKey) {
      toast.error(t.validation[errorKey]);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: name.trim(),
        phone: phone.trim(),
        message: cart
          .map((item) => `${item.quantity} × ${item.name}`)
          .join("\n"),
        total: total,
      };

      const messageForTelegram = `
🛒 *ХОЧУТЬ ПРИДБАТИ:*
👤 *Імʼя:* ${escapeMarkdown(templateParams.name)}
📞 *Телефон:* [${escapeMarkdown(templateParams.phone)}](${telLink(templateParams.phone)})
🛍️ *Замовлення:*
${escapeMarkdown(templateParams.message)}
💵 *Разом:* ${templateParams.total} грн
`.trim();

      // EmailJS and Telegram are independent: one failing must not lose the order.
      const result = await deliverLead({
        templateId: "template_0zj9rl8",
        templateParams,
        telegramMessage: messageForTelegram,
      });

      if (!result.ok) {
        toast.error(t.validation.sendFailed);
        return;
      }

      notify(templateParams.name);
      setName("");
      setPhone("");
      clearCart();
      onBack();
    } catch (err) {
      console.error("Order submission failed unexpectedly:", err);
      toast.error(t.validation.sendFailed);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatUaPhone(e.target.value));
  };

  const notify = (name: string) =>
    toast.success(`${name}, ${t.basket.message}`);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onBack();
    }
  };

  return (
    <>
      <div className={css.wrapper} onClick={handleOverlayClick}>
        <form onSubmit={handleSubmit} className={css.form}>
          <p className={css.title}> {t.basket.order}:</p>
          <ul className={css.list}>
            {cart.map((product: Product) => (
              <li key={product.id} className={css.item}>
                <p className={css.quantity}>{product.quantity}</p>
                &#xD7;
                <p className={css.name}>{product.name}</p>
              </li>
            ))}
          </ul>
          <p className={css.total}>
            {t.basket.total}: <span>{total} грн</span>
          </p>
          <label className={css.label}>
            {t.basket.clientName}:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              autoComplete="name"
              className={css.input}
            />
          </label>
          <label className={css.label}>
            {t.basket.phone}:
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
              className={css.input}
              pattern="\+380 \d{2} \d{2} \d{2} \d{3}"
              title="+380 XX XX XX XXX"
            />
          </label>
          <button type="submit" className={css.submit} disabled={isSubmitting}>
            <MdOutlineDoneOutline />{" "}
            {isSubmitting ? t.overlay.sending : t.basket.submit}
          </button>
          <button type="button" className={css.back} onClick={() => onBack()}>
            <LuShoppingCart /> {t.basket.back}
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderForm;
