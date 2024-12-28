export interface Product {
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
  };
  quantity: number;
}
