import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartProductItemProps{

  product: CartProduct


}


const CartProductItem = ({product}: CartProductItemProps) => {
  const {decreaseProductQuantity, increaseProductQuantity, removeProduct} = useContext(CartContext);
  
  return (  
      <div className="flex items-center justify-between gap-10">
        <div className="flex items-center gap-3">
          {/* Esquerda */}
          <div className = "relative h-20 w-20 bg-gray-100 rounded-xl">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          {/* Direita */}
          <div className="space-y-1">
            <p className="text-xs max-w-[90%] truncate text-elipsis ">{product.name}</p>
            <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
            {/* Quantidade */}
            <div className="flex items-center gap-1 text-center">
              <Button
              variant="outline"
              className="h-7 w-7 rounded-lg"
              onClick={() => decreaseProductQuantity(product.id)}
              >
                <ChevronLeftIcon size={16} />
              </Button>

              <p className="text-xs w-7">{product.quantity}</p>
              
              <Button
              variant="destructive"
              className="h-7 w-7  rounded-lg"
              onClick={() => increaseProductQuantity(product.id)}
              >
                <ChevronRightIcon size={16} />
              </Button>

          </div>

        </div>
        {/* Botão de Deletar */}
        <Button variant="outline" className= "h-7 w-7 rounded-lg" onClick={() => removeProduct(product.id)}>
          <Trash2Icon />
        </Button>



        </div>



      </div>


  );
}
 
export default CartProductItem;