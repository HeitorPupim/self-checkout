"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface ProductDetailsPropos {
  product: Prisma.ProductGetPayload<{include: {
    restaurant: {
      select: {
        name: true,
        avatarImageUrl: true,
      }
    }
  }}>
}


const ProductDetails = ({product}: ProductDetailsPropos) => {

  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return ( 
    <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5 flex flex-col">
      <div className="flex-auto">
        
        {/* Restaurante */}
        <div className="flex items-center gap-1.5 ">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground space-x-1">{product.restaurant.name}</p>
        </div>

        {/* Nome do produto */}

        <h2 className=" mt-1 text-xl font-semibold">{product.name}</h2>

        {/* Preço e Quantidade */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
          {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={() => handleQuantityChange(-1)}
            >
              <ChevronLeftIcon/>
            </Button>
            
            <p className="w-4">{quantity}</p>

            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={() => handleQuantityChange(1)}
            >
              <ChevronRightIcon/>
            </Button>
          </div>


        </div>

        {/* Sobre */}
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Ingredientes */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1.5">
            <ChefHatIcon size = {18}/>
            <h4 className="text-lg font-semibold">Ingredientes</h4>
          </div>
          <ul> 
            {/* bullet items */}
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}> • {ingredient}</li>
            ))}
          </ul>
        </div>
      </div>


        {/* Botão Adicionar à sacola */}
        <Button className=" w-full rounded-full mt-6">Adicionar à sacola</Button>

    </div>


   );
}





export default ProductDetails;