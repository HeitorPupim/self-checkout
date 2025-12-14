import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart";
import CartProductItem from "../../components/cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>Itens adicionados à sua sacola</SheetDescription>
        </SheetHeader>
        <div className="py-5">
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Sua sacola está vazia
            </p>
          ) : (
            products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))
          )}
        </div>
  
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
