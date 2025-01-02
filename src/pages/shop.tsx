// components/Shop.tsx

import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import ProductModal from "../components/Product/Product";

import css from "../styles/Shop.module.css";
import Container from "@/components/Container/Container";
import { LuShoppingCart } from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";

import { Product } from "@/types/product";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const link = "https://mafiadream.com.ua/wp-content/images/shop/";

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [basket, setCart] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const notify = (productName: string) =>
    toast.success(`${productName} ${t.basket.add}`);
  const handleAddToCart = (product: Product) => {
    setCart([...basket, product]);
  };

  const handleOpenModal = (product: Product) => {
    setModalProduct(product);
    console.log("modal open");
  };

  const handleCloseModal = () => {
    setModalProduct(null);
  };

  const products: Product[] = [
    {
      id: 1,
      name: `${t.shopList.item1.name}`,
      mainDesk: `${t.shopList.item1.mainDesk}`,
      description1: `${t.shopList.item1.description1}`,
      description2: `${t.shopList.item1.description2}`,
      description3: `${t.shopList.item1.description3}`,
      other: `${t.shopList.item1.other}`,
      price: 100,
      imageUrl1: `${link}present-pro-set-00001.webp`,
      imageUrl2: `${link}present-pro-set-00002.webp`,
      imageUrl3: `${link}present-pro-set-00003.webp`,
      quantity: 1,
    },
    {
      id: 2,
      name: `${t.shopList.item2.name}`,
      mainDesk: `${t.shopList.item2.mainDesk}`,
      description1: `${t.shopList.item2.description1}`,
      description2: `${t.shopList.item2.description2}`,
      description3: `${t.shopList.item2.description3}`,
      other: `${t.shopList.item2.other}`,
      price: 100,
      imageUrl1: `${link}present-set-00002.webp`,
      imageUrl2: `${link}present-set-00001.webp`,
      imageUrl3: `${link}present-set-00003.webp`,
      quantity: 1,
    },
    {
      id: 3,
      name: `${t.shopList.item3.name}`,
      mainDesk: `${t.shopList.item3.mainDesk}`,
      description1: `${t.shopList.item3.description1}`,
      description2: `${t.shopList.item3.description2}`,
      description3: `${t.shopList.item3.description3}`,
      other: `${t.shopList.item3.other}`,
      price: 100,
      imageUrl1: `${link}pro-set-0001.webp`,
      quantity: 1,
    },
    {
      id: 4,
      name: `${t.shopList.item4.name}`,
      mainDesk: `${t.shopList.item4.mainDesk}`,
      description1: `${t.shopList.item4.description1}`,
      description2: `${t.shopList.item4.description2}`,
      description3: `${t.shopList.item4.description3}`,
      other: `${t.shopList.item4.other}`,
      price: 100,
      imageUrl1: `${link}set-00001.webp`,
      imageUrl2: `${link}set-00002.webp`,
      imageUrl3: `${link}set-00003.webp`,
      quantity: 1,
    },
    {
      id: 5,
      name: `${t.shopList.item5.name}`,
      mainDesk: `${t.shopList.item5.mainDesk}`,
      description1: `${t.shopList.item5.description1}`,
      other: `${t.shopList.item5.other}`,
      price: 100,
      imageUrl1: `${link}br-mask-00001.webp`,
      imageUrl2: `${link}br-mask-00002.webp`,
      imageUrl3: `${link}br-mask-00003.webp`,
      quantity: 1,
    },
    {
      id: 6,
      name: `${t.shopList.item7.name}`,
      mainDesk: `${t.shopList.item7.mainDesk}`,
      description1: `${t.shopList.item7.description1}`,
      description2: `${t.shopList.item7.description2}`,
      other: `${t.shopList.item7.other}`,
      price: 100,
      imageUrl1: `${link}carts-00001.webp`,
      imageUrl2: `${link}carts-00002.webp`,
      imageUrl3: `${link}carts-00003.webp`,
      imageUrl4: `${link}carts-00004.webp`,
      cartType1: `${t.shopList.item7.cartType?.mafia}`,
      cartType2: `${t.shopList.item7.cartType?.don}`,
      cartType3: `${t.shopList.item7.cartType?.sherif}`,
      cartType4: `${t.shopList.item7.cartType?.pieceP}`,
      cartType5: `${t.shopList.item7.cartType?.maniac}`,
      cartType6: `${t.shopList.item7.cartType?.doc}`,
      cartType7: `${t.shopList.item7.cartType?.putana}`,
      quantity: 1,
    },
    {
      id: 7,
      name: `${t.shopList.item6.name}`,
      mainDesk: `${t.shopList.item6.mainDesk}`,
      description1: `${t.shopList.item6.description1}`,
      description2: `${t.shopList.item6.description2}`,
      other: `${t.shopList.item6.other}`,
      price: 100,
      imageUrl1: `${link}mask-00001.webp`,
      imageUrl2: `${link}mask-00002.webp`,
      quantity: 1,
    },
    {
      id: 8,
      name: `${t.shopList.item8.name}`,
      mainDesk: `${t.shopList.item8.mainDesk}`,
      description1: `${t.shopList.item8.description1}`,
      other: `${t.shopList.item8.other}`,
      price: 100,
      imageUrl1: `${link}shop_item_00027.webp`,
      quantity: 1,
    },
    {
      id: 9,
      name: `${t.shopList.item9.name}`,
      mainDesk: `${t.shopList.item9.mainDesk}`,
      description1: `${t.shopList.item9.description1}`,
      other: `${t.shopList.item9.other}`,
      price: 100,
      imageUrl1: `${link}pro-n-00001.webp`,
      imageUrl2: `${link}pro-n-00002.webp`,
      quantity: 1,
    },
    {
      id: 10,
      name: `${t.shopList.item10.name}`,
      mainDesk: `${t.shopList.item10.mainDesk}`,
      description1: `${t.shopList.item10.description1}`,
      other: `${t.shopList.item10.other}`,
      price: 100,
      imageUrl1: `${link}m-hat-00001.webp`,
      imageUrl2: `${link}m-hat-00002.webp`,
      imageUrl3: `${link}m-hat-00003.webp`,
      quantity: 1,
    },
    {
      id: 11,
      name: `${t.shopList.item11.name}`,
      mainDesk: `${t.shopList.item11.mainDesk}`,
      description1: `${t.shopList.item11.description1}`,
      description2: `${t.shopList.item11.description2}`,
      other: `${t.shopList.item11.other}`,
      price: 100,
      imageUrl1: `${link}w-hat-00002.webp`,
      imageUrl2: `${link}w-hat-00001.webp`,
      quantity: 1,
    },
    {
      id: 12,
      name: `${t.shopList.item12.name}`,
      mainDesk: `${t.shopList.item12.mainDesk}`,
      other: `${t.shopList.item12.other}`,
      price: 100,
      imageUrl1: `${link}sh-gl-00002.webp`,
      imageUrl2: `${link}sh-gl-00001.webp`,
      quantity: 1,
    },
    {
      id: 13,
      name: `${t.shopList.item13.name}`,
      mainDesk: `${t.shopList.item13.mainDesk}`,
      other: `${t.shopList.item13.other}`,
      price: 100,
      imageUrl1: `${link}long-gl.webp`,
      quantity: 1,
    },
    {
      id: 14,
      name: `${t.shopList.item14.name}`,
      mainDesk: `${t.shopList.item14.mainDesk}`,
      other: `${t.shopList.item14.other}`,
      price: 100,
      imageUrl1: `${link}boa-00004.webp`,
      imageUrl2: `${link}boa-00003.webp`,
      imageUrl3: `${link}boa-00002.webp`,
      imageUrl4: `${link}boa-00001.webp`,
      quantity: 1,
    },
    {
      id: 15,
      name: `${t.shopList.item15.name}`,
      mainDesk: `${t.shopList.item15.mainDesk}`,
      other: `${t.shopList.item15.other}`,
      price: 100,
      imageUrl1: `${link}moutp-00001.webp`,
      imageUrl2: `${link}moutp-00002.webp`,
      quantity: 1,
    },
    {
      id: 16,
      name: `${t.shopList.item16.name}`,
      mainDesk: `${t.shopList.item16.mainDesk}`,
      other: `${t.shopList.item16.other}`,
      price: 100,
      imageUrl1: `${link}shop_item_00003.webp`,
      quantity: 1,
    },
    {
      id: 17,
      name: `${t.shopList.item17.name}`,
      mainDesk: `${t.shopList.item17.mainDesk}`,
      other: `${t.shopList.item17.other}`,
      price: 100,
      quantity: 1,
    },
    {
      id: 18,
      name: `${t.shopList.item18.name}`,
      mainDesk: `${t.shopList.item18.mainDesk}`,
      other: `${t.shopList.item18.other}`,
      price: 100,
      imageUrl1: `${link}shop_item_00031.webp`,
      quantity: 1,
    },
  ];

  return (
    <div>
      <Container>
        <p className={css.description}>{t.shopP.welcoming}</p>
        <ul className={css.productList}>
          {products.map((product) => (
            <li key={product.id} className={css.productItem}>
              <h3 className={css.productName}>{product.name}</h3>
              <div className={css.imgBg}>
                <Image
                  src={product.imageUrl1 ? product.imageUrl1 : "/img/logo.png"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={css.img}
                />
              </div>
              <p className={css.product_price}>{product.price} грн</p>
              <ul className={css.btn_list}>
                <li>
                  <button
                    onClick={() => handleOpenModal(product)}
                    className={css.btn}
                  >
                    <CgDetailsMore className={css.icon} />
                    {t.shopP.btnMore}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
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
          ))}
          <ScrollTopBtn />
        </ul>
        {modalProduct && (
          <ProductModal
            product={modalProduct}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )}
        <Link href="/basket" className={css.basket}>
          <LuShoppingCart />
          <span className={css.basketText}> {t.basket.toBasket}</span>
        </Link>
      </Container>
      <ToastContainer theme="dark" newestOnTop />
    </div>
  );
};

export default Shop;
