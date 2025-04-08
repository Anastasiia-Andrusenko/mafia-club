// components/ProductModal.tsx
import Image from "next/image";
import React, { useEffect, useState } from "react";
import css from "./Product.module.css";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "../../hooks/useTranslation";
import { TfiClose } from "react-icons/tfi";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";

interface ProductModalProps {
  product: Product;
  productList: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isBasket: boolean;
  onChangeProduct: (product: Product) => void;
}

const getProductImages = (product: Product): string[] => {
  return [
    product.imageUrl1,
    product.imageUrl2,
    product.imageUrl3,
    product.imageUrl4,
    product.imageUrl5,
  ].filter((img): img is string => typeof img === "string");
};

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  productList,
  onClose,
  onChangeProduct,
  isBasket = false,
}) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const notify = () => toast.success(`${product.name} ${t.basket.add}`);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = getProductImages(product);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.documentElement.style.overflow = "auto";
    };
  }, [onClose]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product]);

  const imageSwipeHandlers = useSwipeable({
    onSwipedLeft: (e) => {
      e.event.stopPropagation();
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    },
    onSwipedRight: (e) => {
      e.event.stopPropagation();
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    trackMouse: true,
  });

  const index = productList.findIndex((p) => p.id === product.id);
  const lastIndex = productList.length - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = index === lastIndex ? 0 : index + 1;
      onChangeProduct(productList[nextIndex]);
    },
    onSwipedRight: () => {
      const prevIndex = index === 0 ? lastIndex : index - 1;
      onChangeProduct(productList[prevIndex]);
    },
    trackMouse: true,
  });

  return (
    <>
      <motion.div
        key={product.id}
        className={css.modalContent}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        {...handlers}
      >
        <div className={css.arrowHintLeft}>‹</div>
        <div className={css.arrowHintRight}>›</div>
        <button onClick={onClose} className={css.btnClose}>
          <TfiClose />
        </button>
        <h2 className={css.name}>{product.name}</h2>
        <div className={css.imgWrapper} {...imageSwipeHandlers}>
          <Image
            src={images[activeImageIndex] || "/img/logo.png"}
            alt={product.name}
            width={300}
            height={300}
            className={css.img}
          />
        </div>
        <div className={css.imageSliderDots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${css.dot} ${
                i === activeImageIndex ? css.active : ""
              }`}
            />
          ))}
        </div>

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
                onClose();
              }}
            >
              <LuShoppingCart />
              {t.shopP.btnBuy}
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ProductModal;
