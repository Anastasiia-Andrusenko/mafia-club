// components/Shop.tsx
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import ProductModal from "../components/Product/Product";
import css from "../styles/Shop.module.css";
import Container from "@/components/Container/Container";
import { LuShoppingCart } from "react-icons/lu";
import { Product } from "@/types/product";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import OverlayModal from "@/components/common/OverlayModal";
import ProductCard from "@/components/Shop/ProductCard";
const link = "https://mafiadream.com.ua/wp-content/images/shop/";

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [basket, setCart] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const handleChangeProduct = (product: Product) => {
    setModalProduct(product);
  };
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
      price: 1999,
      imageUrl1: `${link}present-pro-set-0001.webp`,
      imageUrl2: `${link}present-pro-set-0002.webp`,
      imageUrl3: `${link}present-pro-set-0003.webp`,
      imageUrl4: `${link}present-pro-set-0004.webp`,
      imageUrl5: `${link}present-pro-set-0005.webp`,
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
      price: 1199,
      imageUrl1: `${link}present-set-0001.webp`,
      imageUrl2: `${link}present-set-0002.webp`,
      imageUrl3: `${link}present-set-0003.webp`,
      imageUrl4: `${link}present-set-0004.webp`,
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
      price: 1699,
      imageUrl1: `${link}pro-set-0001.webp`,
      imageUrl2: `${link}pro-n-00001.webp`,
      imageUrl3: `${link}carts-0005.webp`,
      imageUrl4: `${link}br-mask-0001.webp`,
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
      price: 849,
      imageUrl1: `${link}set-00001.webp`,
      imageUrl2: `${link}set-00002.webp`,
      imageUrl3: `${link}set-00003.webp`,
      imageUrl4: `${link}carts-0005.webp`,
      quantity: 1,
    },
    {
      id: 5,
      name: `${t.shopList.item5.name}`,
      mainDesk: `${t.shopList.item5.mainDesk}`,
      description1: `${t.shopList.item5.description1}`,
      other: `${t.shopList.item5.other}`,
      price: 899,
      imageUrl1: `${link}br-mask-0001.webp`,
      imageUrl2: `${link}br-mask-0002.webp`,
      imageUrl3: `${link}br-mask-0003.webp`,
      quantity: 1,
    },
    {
      id: 6,
      name: `${t.shopList.item7.name}`,
      mainDesk: `${t.shopList.item7.mainDesk}`,
      description1: `${t.shopList.item7.description1}`,
      description2: `${t.shopList.item7.description2}`,
      other: `${t.shopList.item7.other}`,
      price: 199,
      imageUrl1: `${link}carts-0001.webp`,
      imageUrl2: `${link}carts-0002.webp`,
      imageUrl3: `${link}carts-0003.webp`,
      imageUrl4: `${link}carts-0004.webp`,
      imageUrl5: `${link}carts-0005.webp`,
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
      price: 249,
      imageUrl1: `${link}shop_item_00027.webp`,
      quantity: 1,
    },
    {
      id: 9,
      name: `${t.shopList.item9.name}`,
      mainDesk: `${t.shopList.item9.mainDesk}`,
      description1: `${t.shopList.item9.description1}`,
      other: `${t.shopList.item9.other}`,
      price: 299,
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
      price: 200,
      imageUrl1: `${link}m-hat-00001.webp`,
      imageUrl2: `${link}m-hat-00002.webp`,
      imageUrl3: `${link}m-hat-00003.webp`,
      imageUrl4: `${link}m-hat-00004.webp`,
      quantity: 1,
    },
    {
      id: 11,
      name: `${t.shopList.item11.name}`,
      mainDesk: `${t.shopList.item11.mainDesk}`,
      description1: `${t.shopList.item11.description1}`,
      description2: `${t.shopList.item11.description2}`,
      other: `${t.shopList.item11.other}`,
      price: 150,
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
      price: 130,
      imageUrl1: `${link}long-gl.webp`,
      quantity: 1,
    },
    {
      id: 14,
      name: `${t.shopList.item14.name}`,
      mainDesk: `${t.shopList.item14.mainDesk}`,
      other: `${t.shopList.item14.other}`,
      price: 150,
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
      price: 80,
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
      price: 120,
      imageUrl1: `${link}mustache.webp`,
      quantity: 1,
    },
    {
      id: 18,
      name: `${t.shopList.item18.name}`,
      mainDesk: `${t.shopList.item18.mainDesk}`,
      other: `${t.shopList.item18.other}`,
      price: 150,
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
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={handleOpenModal}
            />
          ))}

          <ScrollTopBtn />
        </ul>
        {modalProduct && (
          <OverlayModal isOpen={true} onClose={handleCloseModal}>
            <ProductModal
              product={modalProduct}
              productList={products}
              onClose={handleCloseModal}
              onAddToCart={handleAddToCart}
              onChangeProduct={handleChangeProduct}
              isBasket={false}
            />
          </OverlayModal>
        )}

        <Link href="/basket" className={css.basket}>
          <LuShoppingCart />
          <span className={css.basketText}> {t.basket.toBasket}</span>
        </Link>
      </Container>
    </div>
  );
};

export default Shop;
