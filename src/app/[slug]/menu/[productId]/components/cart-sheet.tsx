import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>Itens adicionados à sua sacola</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Sua sacola está vazia
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qtd: {product.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  R$ {Number(product.price).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
