// Basket.tsx
import Image from 'next/image';
import React from 'react';
import css from '../styles/Basket.module.css';
import { Product } from '@/types/product';
import {useCart} from '@/context/CartContext';


interface BasketProps {
  basket: Product[];
  onRemove: (productId: number) => void;
}

const Basket: React.FC<BasketProps> = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum: number, product: Product) => sum + product.price, 0);

  return (
    <div className={css.overlay}>
      <h2>Ваш кошик</h2>
      <ul>
        {cart.map((product: Product) => (
          <li key={product.id}>
            <Image src={product.imageUrl1 ? product.imageUrl1 : "/img/logo.png"} alt={product.name} width={50} height={50} />
            <p>{product.name}</p>
            <p>{product.price} грн</p>
            <button onClick={() => removeFromCart(product.id)}>Видалити</button>
          </li>
        ))}
      </ul>
      <h3>Сума: {total} грн</h3>
      <button>Підтверджую</button>
    </div>
  );
};

export default Basket;
