// components/Shop/ProductCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { CgDetailsMore } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "@/hooks/useTranslation";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { Product } from "@/types/product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import css from "@/styles/Shop.module.css";

interface Props {
  product: Product;
  onOpenModal: (product: Product) => void;
}

const getProductImages = (product: Product): string[] => {
  return [
    product.imageUrl1,
    product.imageUrl2,
    product.imageUrl3,
    product.imageUrl4,
    product.imageUrl5,
    product.imageUrl6,
    product.imageUrl7,
    product.imageUrl8,
    product.imageUrl9,
    product.imageUrl10,
  ].filter((img): img is string => typeof img === "string");
};

const ProductCard: React.FC<Props> = ({ product, onOpenModal }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const notify = (productName: string) =>
    toast.success(`${productName} ${t.basket.add}`);

  const images = getProductImages(product);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveImageIndex((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length),
    trackMouse: true,
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <li className={css.productItem} onClick={() => onOpenModal(product)}>
      <h3 className={css.productName}>{product.name}</h3>
      <div className={css.imgBg} {...swipeHandlers}>
        <Image
          src={images[activeImageIndex]}
          alt={product.name}
          width={200}
          height={200}
          className={css.img}
        />
        {images.length > 1 && (
          <div className={css.sliderControls}>
            <button className={css.sliderBtn} onClick={handlePrev}>
              <FaChevronLeft />
            </button>
            <button className={css.sliderBtn} onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className={css.imageSliderDots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${css.dot} ${i === activeImageIndex ? css.active : ""}`}
          />
        ))}
      </div>

      <p className={css.product_price}>{product.price} грн</p>
      <ul className={css.btn_list}>
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            className={css.btn}
          >
            <CgDetailsMore className={css.icon} />
            {t.shopP.btnMore}
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              notify(product.name);
            }}
            className={css.btn}
          >
            <LuShoppingCart className={css.icon} /> {t.shopP.btnBuy}
          </button>
        </li>
      </ul>
    </li>
  );
};

export default ProductCard;
