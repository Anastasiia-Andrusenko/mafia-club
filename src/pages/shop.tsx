// components/Shop.tsx

import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
// import ProductModal from './ProductModal';
// import Cart from './Cart';
import css from '../styles/Shop.module.css';
import Container from "@/components/Container/Container";

interface Product {
  id: number;
  name: string;

  mainDesk: string;

  description1?: string;
  description2?: string;
  description3?: string;

  other: string;
  price: number;

  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  imageUrl5?: string;
  
  cartType1?: string;
  cartType2?: string;
  cartType3?: string;
  cartType4?: string;
  cartType5?: string;
  cartType6?: string;
  cartType7?: string;

  cartType?: {
    mafia?: string;
    don?: string;
    sherif?: string;
    pieceP?: string;
    maniac?: string;
    doc?: string;
    putana?: string;
  }
}

const link = "https://mafiadream.com.ua/wp-content/images/shop/";

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // const handleRemoveFromCart = (productId: number) => {
  //   setCart(cart.filter((item) => item.id !== productId));
  // };

  const handleOpenModal = (product: Product) => {
    setModalProduct(product);
  };

  // const handleCloseModal = () => {
  //   setModalProduct(null);
  // };

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
    },
    {
      id: 8,
      name: `${t.shopList.item8.name}`,
      mainDesk: `${t.shopList.item8.mainDesk}`,
      description1: `${t.shopList.item8.description1}`,
      other: `${t.shopList.item8.other}`,
      price: 100,
      imageUrl1: `${link}shop_item_00027.webp`,
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
    },
    {
      id: 12,
      name: `${t.shopList.item12.name}`,
      mainDesk: `${t.shopList.item12.mainDesk}`,
      other: `${t.shopList.item12.other}`,
      price: 100,
      imageUrl1: `${link}sh-gl-00002.webp`,
      imageUrl2: `${link}sh-gl-00001.webp`,
    },
    {
      id: 13,
      name: `${t.shopList.item13.name}`,
      mainDesk: `${t.shopList.item13.mainDesk}`,
      other: `${t.shopList.item13.other}`,
      price: 100,
      imageUrl1: `${link}long-gl.webp`,
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
    },
    {
      id: 15,
      name: `${t.shopList.item15.name}`,
      mainDesk: `${t.shopList.item15.mainDesk}`,
      other: `${t.shopList.item15.other}`,
      price: 100,
      imageUrl1: `${link}moutp-00001.webp`,
      imageUrl2: `${link}moutp-00002.webp`,
    },
    {
      id: 16,
      name: `${t.shopList.item16.name}`,
      mainDesk: `${t.shopList.item16.mainDesk}`,
      other: `${t.shopList.item16.other}`,
      price: 100,
      imageUrl1: `${link}shop_item_00003.webp`
    },
    {
      id: 17,
      name: `${t.shopList.item17.name}`,
      mainDesk: `${t.shopList.item17.mainDesk}`,
      other: `${t.shopList.item17.other}`,
      price: 100,
    },
    {
      id: 18,
      name: `${t.shopList.item18.name}`,
      mainDesk: `${t.shopList.item18.mainDesk}`,
      other: `${t.shopList.item18.other}`,
      price: 100,
      imageUrl1: `${link}shop_item_00031.webp`
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
            <Image
              src={product.imageUrl1 ? product.imageUrl1 : "/img/logo.png"}
              alt={product.name}
              width={200}
              height={200}
              className={css.img}
            />
            {/* <p className={css.product_desk}>{product.mainDesk}</p>
            {product.description1 ? <p className={css.product_desk}>{product.description1}</p> : ''}
            {product.description2 ? <p className={css.product_desk}>{product.description2}</p> : ''}
            {product.description3 ? <p className={css.product_desk}>{product.description3}</p> : ''}
            <p className={css.product_desk}>{product.other}</p>
           { product.cartType1 ? <ul>
            <li>{product.cartType1}</li>
            <li>{product.cartType2}</li>
            <li>{product.cartType3}</li>
            <li>{product.cartType4}</li>
            <li>{product.cartType5}</li>
            <li>{product.cartType6}</li>
            <li>{product.cartType7}</li>
            </ul> : ''} */}
            <p className={css.product_price}>{product.price} грн</p>
            <ul className={css.btn_list}>
              <li><button onClick={() => handleOpenModal(product)} className={css.btn}>{t.shopP.btnMore}</button></li>
              <li><button onClick={() => handleAddToCart(product)} className={css.btn}>{t.shopP.btnBuy}</button></li>
            </ul>
            
            
          </li>
        ))}
        <ScrollTopBtn />
      </ul>
      {/* {modalProduct && <ProductModal product={modalProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
      <Cart cart={cart} onRemove={handleRemoveFromCart} /> */}
      </Container>
    </div>
  );
};

export default Shop;
