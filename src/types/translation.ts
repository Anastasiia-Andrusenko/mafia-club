// Інтерфейс для перекладів
export interface Translation {
  nav: {
    [key: string]: string;
  };
  homeP: {
    [key: string]: string;
  };
  table: {
    [key: string]: string;
  };
  shopP: {
    [key: string]: string;
  };
  overlay: {
    [key: string]: string;
  };
  footer: {
    [key: string]: string;
  };
  services: {
    [key: string]: string;
  };
  extras: {
    [key: string]: string;
  };
  rules: {
    [key: string]: string;
  };
  vipMafia: {
    [key: string]: string;
  };
  officeMafia: {
    [key: string]: string;
  };
  kidsMafia: {
    [key: string]: string;
  };
  outMafia: {
    [key: string]: string;
  };
  birthdayMafia: {
    [key: string]: string;
  };
  enMafia: {
    [key: string]: string;
  };
  info: {
    [key: string]: string;
  };
  gallery: {
    [key: string]: string;
  };
  shopList: {
    [key: string]: {
      id?: number;
      name: string;
      mainDesk: string;
      description1?: string;
      description2?: string;
      description3?: string;
      other: string;
      price?: number;
      imageUrl1?: string;
      imageUrl2?: string;
      imageUrl3?: string;
      imageUrl4?: string;
      imageUrl5?: string;

      cartType?: {
        mafia?: string;
        don?: string;
        sherif?: string;
        pieceP?: string;
        maniac?: string;
        doc?: string;
        putana?: string;
      };
      quantity?: number;
    };
  };
  basket: {
    [key: string]: string;
  };
  reviews: {
    [key: string]: string;
  };
  vipP: {
    [key: string]: string;
  };
  corporateP: {
    [key: string]: string;
  };
  outdoorP: {
    [key: string]: string;
  };
  birthdayP: {
    [key: string]: string;
  };
  kidsP: {
    [key: string]: string;
  };
  englishP: {
    [key: string]: string;
  };
  extrasP: {
    [key: string]: string;
  };
}
