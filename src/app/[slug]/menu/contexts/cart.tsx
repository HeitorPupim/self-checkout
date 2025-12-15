"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

// Products do Prisma + quantidade
export interface CartProduct extends Pick<
  Product,
  "id" | "name" | "price" | "imageUrl"
> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  total: number;
  products: CartProduct[];
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false, // padrão fechado
  total: 0,
  totalQuantity: 0,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

// Como o cart provider precisa estar no contexto global da aplicação, exporta para a
// página layout.tsx

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);

  // Se está falso, a função muda para verdadeiro e vice-versa -> abre o carrinho
  const toggleCart = () => {
    setIsOpen((prevProduct) => !prevProduct);
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prevProduct) => {
      const existingProduct = prevProduct.find((p) => p.id === product.id);
      if (existingProduct) {
        // Se o produto já existe, atualiza a quantidade
        return prevProduct.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        );
      }
      // Se não existe, adiciona como novo
      return [...prevProduct, product];
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((prevProduct) => {

        if (prevProduct.id !== productId){
          return prevProduct;
        }
        
        if (prevProduct.quantity === 1){
          return prevProduct;
        }
        return {...prevProduct, quantity: prevProduct.quantity - 1}
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((prevProduct) => {
        if (prevProduct.id !== productId){
          return prevProduct;
        }
        return {...prevProduct, quantity: prevProduct.quantity + 1}
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.filter((prevProduct) => prevProduct.id !== productId);
    });
  };


  return (
    <CartContext.Provider
      value={{
        isOpen,
        total,
        totalQuantity,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
