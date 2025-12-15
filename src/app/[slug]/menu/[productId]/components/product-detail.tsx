"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../contexts/cart";
import CartSheet from "./cart-sheet";

interface ProductDetailsPropos {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsPropos) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { toggleCart, addProduct } = useContext(CartContext);

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    addProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
    toggleCart();
  };
  // console.log(isOpen)
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-col rounded-t-3xl p-5">
        <div className="flex-auto overflow-hidden">
          {/* Restaurante */}
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="space-x-1 text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          {/* Nome do produto */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
          {/* Preço e Quantidade */}
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={() => handleQuantityChange(-1)}
              >
                <ChevronLeftIcon />
              </Button>

              <p className="w-4">{quantity}</p>

              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={() => handleQuantityChange(1)}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            {/* Sobre */}
            <div className="mt-6 space-y-3">
              <h4 className="text-lg font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            {/* Ingredientes */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1.5">
                <ChefHatIcon size={18} />
                <h4 className="text-lg font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-6 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>

        {/* Botão Adicionar à sacola */}
        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
