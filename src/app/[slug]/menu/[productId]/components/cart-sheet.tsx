import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart";
import CartProductItem from "../../components/cart-product-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import FinishOrderDialog from "../../components/finish-order-dialog";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>Itens adicionados à sua sacola</SheetDescription>
        </SheetHeader>

        <div className="flex h-full flex-col py-5">
          <div className="flex-auto space-y-4 overflow-y-auto">
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
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <Button
            className="mb-6 w-full rounded-full"
            onClick={() => setFinishOrderDialogIsOpen(true)}
            disabled={products.length === 0}
          >
            Finalizar pedido
          </Button>

          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={setFinishOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
