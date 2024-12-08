// components/Cart.tsx
import Image from 'next/image';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartProps {
  cart: Product[];
  onRemove: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove }) => {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      <h2>Ваш кошик</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <Image src={product.imageUrl} alt={product.name} width={50} />
            <p>{product.name}</p>
            <p>{product.price} грн</p>
            <button onClick={() => onRemove(product.id)}>Видалити</button>
          </li>
        ))}
      </ul>
      <h3>Сума: {total} грн</h3>
      <button>Підтверджую</button>
    </div>
  );
};

export default Cart;
