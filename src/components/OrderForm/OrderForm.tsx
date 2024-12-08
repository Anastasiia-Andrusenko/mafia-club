// components/OrderForm.tsx
import React, { useState } from 'react';

interface OrderFormProps {
  onSubmit: (name: string, phone: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ім&apos;я:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Номер телефону:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>
      <button type="submit">Замовити</button>
    </form>
  );
};

export default OrderForm;
