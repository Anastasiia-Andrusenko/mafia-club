// components/OrderForm.tsx
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import { Product } from "@/types/product";
import css from "./OrderForm.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { MdOutlineDoneOutline } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollLock } from "@/hooks/useScrollLock";

interface OrderFormProps {
  onBack: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onBack }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { cart } = useCart();
  const { t } = useTranslation();
  const total = cart.reduce(
    (sum: number, product: Product) => sum + product.price * product.quantity,
    0
  );

  useScrollLock(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notify(name);
    if (!name.trim() || !phone.trim() || cart.length === 0) {
      console.error("Помилка: Заповніть усі поля перед відправкою.");
      return;
    }

    if (!/^\+380 \d{2} \d{2} \d{2} \d{3}$/.test(phone)) {
      console.error("Помилка: Невірний формат номера телефону.");
      return;
    }

    const templateParams = {
      name: name.trim(),
      phone: phone.trim(),
      message: cart.map((item) => `${item.quantity} × ${item.name}`).join("\n"),
      total: total,
    };

    // console.log("Дані для EmailJS:", templateParams);

    emailjs
      .send(
        "service_awhca1b",
        "template_0zj9rl8",
        templateParams,
        "nBlfFj-daI3JM87lR"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          onBack();
        },
        (err) => {
          console.error("FAILED...", err);
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
              className={css.input}
            />
          </label>
          <label className={css.label}>
            {t.basket.phone}:
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              required
              className={css.input}
              pattern="\+380 \d{2} \d{2} \d{2} \d{3}"
              title="+380 XX XX XX XXX"
            />
          </label>
          <button type="submit" className={css.submit}>
            <MdOutlineDoneOutline /> {t.basket.submit}
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
