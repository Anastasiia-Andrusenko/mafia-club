// Basket.tsx
import Image from "next/image";
import React from "react";
import css from "../styles/Basket.module.css";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "@/hooks/useTranslation";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from "next/link";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface BasketProps {
  basket: Product[];
  onRemove: (productId: number) => void;
}

const Basket: React.FC<BasketProps> = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { t } = useTranslation();
  const total = cart.reduce(
    (sum: number, product: Product) => sum + product.price * product.quantity,
    0
  );
  const notify = (productName: string) =>
    toast.warn(`${productName} ${t.basket.remove}`);

  const isEmpty = cart.length === 0;

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    let newQuantity = parseInt(e.target.value, 10);

    // Перевіряємо, щоб кількість була в межах від 1 до 100
    newQuantity = Math.max(1, Math.min(100, newQuantity));

    // Якщо значення не є числом або менше 1, встановлюємо кількість на 1
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }

    updateQuantity(productId, newQuantity);
  };

  return (
    <div className={css.overlay}>
      <h2 className={css.title}>{t.basket.title}</h2>
      {isEmpty ? (
        <>
          {" "}
          <p className={css.title}>{t.basket.empty}</p>{" "}
          <Link href="/shop" className={css.toShop}>
            <MdOutlineSubdirectoryArrowRight className={css.icon} />
            {t.basket.redirect}
          </Link>
        </>
      ) : (
        ""
      )}
      <ul className={css.productList}>
        {cart.map((product: Product) => (
          <li key={product.id} className={css.item}>
            <Image
              src={product.imageUrl1 ? product.imageUrl1 : "/img/logo.png"}
              alt={product.name}
              width={50}
              height={50}
              className={css.img}
            />
            <p className={css.name}>{product.name}</p>
            <div className={css.quantityWrapper}>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(e, product.id)}
                min="1"
                max="100"
                className={css.quantityInput}
              />
              &#xD7;
            </div>
            <p className={css.price}>{product.price} грн</p>
            <button
              className={css.deleteBtn}
              onClick={() => {
                removeFromCart(product.id);
                notify(product.name);
              }}
            >
              <RiDeleteBinLine />
            </button>
          </li>
        ))}
      </ul>
      {isEmpty ? (
        ""
      ) : (
        <h3 className={css.total}>
          {t.basket.total}: <span>{total} грн</span>
        </h3>
      )}
      {isEmpty ? (
        ""
      ) : (
        <div className={css.btnWrapper}>
          <button type="button" className={css.btn}>
            {t.basket.apply}
          </button>
        </div>
      )}
      <ToastContainer theme="dark" newestOnTop />
    </div>
  );
};

export default Basket;