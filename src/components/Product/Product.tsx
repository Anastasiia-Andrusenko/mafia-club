// components/ProductModal.tsx
import Image from "next/image";
import React from "react";
import css from "./Product.module.css";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "../../hooks/useTranslation";
import { TfiClose } from "react-icons/tfi";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isBasket: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isBasket = false,
}) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const notify = () => toast.success(`${product.name} ${t.basket.add}`);

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <button onClick={onClose} className={css.btnClose}>
          {" "}
          <TfiClose />
        </button>
        <h2 className={css.name}>{product.name}</h2>
        <Image
          src={product.imageUrl1 ? product.imageUrl1 : "/img/logo.png"}
          alt={product.name}
          width={300}
          height={300}
          className={css.img}
        />
        <p className={css.product_desk}>{product.mainDesk}</p>
        {product.description1 ? (
          <p className={css.product_desk}>{product.description1}</p>
        ) : (
          ""
        )}
        {product.description2 ? (
          <p className={css.product_desk}>{product.description2}</p>
        ) : (
          ""
        )}
        {product.description3 ? (
          <p className={css.product_desk}>{product.description3}</p>
        ) : (
          ""
        )}
        <p className={css.product_desk}>{product.other}</p>
        {product.cartType1 ? (
          <ul>
            <li>{product.cartType1}</li>
            <li>{product.cartType2}</li>
            <li>{product.cartType3}</li>
            <li>{product.cartType4}</li>
            <li>{product.cartType5}</li>
            <li>{product.cartType6}</li>
            <li>{product.cartType7}</li>
          </ul>
        ) : (
          ""
        )}
        {!isBasket && (
          <div className={css.btn_list}>
            <p className={css.product_price}>{product.price} грн</p>
            <button
              className={css.btn}
              onClick={() => {
                addToCart(product);
                notify();
              }}
            >
              <LuShoppingCart />
              {t.shopP.btnBuy}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
