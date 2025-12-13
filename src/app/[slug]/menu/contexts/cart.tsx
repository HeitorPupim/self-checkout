"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

// Products do Prisma + quantidade
interface CartProduct extends Pick<
  Product,
  "id" | "name" | "price" | "imageUrl"
> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false, // padrão fechado
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

// Como o cart provider precisa estar no contexto global da aplicação, exporta para a
// página layout.tsx

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Se está falso, a função muda para verdadeiro e vice-versa -> abre o carrinho
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      if (existingProduct) {
        // Se o produto já existe, atualiza a quantidade
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        );
      }
      // Se não existe, adiciona como novo
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
