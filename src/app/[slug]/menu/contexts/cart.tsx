"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

// Products do Prisma + quantidade
interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,  // padrão fechado
  products: [],
  toggleCart: () => {},
});

// Como o cart provider precisa estar no contexto global da aplicação, exporta para a
// página layout.tsx

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Se está falso, a função muda para verdadeiro e vice-versa -> abre o carrinho
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider 
      value={{
        isOpen,
        products,
        toggleCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};