// components/ProductModal.tsx
import Image from 'next/image';
import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Закрити</button>
        <Image src={product.imageUrl} alt={product.name} width={300} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price} грн</p>
        <button onClick={() => onAddToCart(product)}>Купити</button>
      </div>
    </div>
  );
};

export default ProductModal;
