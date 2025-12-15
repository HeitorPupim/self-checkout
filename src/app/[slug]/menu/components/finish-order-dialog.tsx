"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { z } from "zod";
import { isValidCpf } from "../helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { useParams, useSearchParams } from "next/navigation";
import { createOrder } from "../actions/create-order";
import { ConsumptionMethod } from "@prisma/client";
import { useContext, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  cpf: z.string().refine((value) => isValidCpf(value), {
    message: "CPF inválido",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const searchParams = useSearchParams();
  const { products } = useContext(CartContext);
  const { slug } = useParams<{ slug: string }>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const consumptionMethod = searchParams.get(
      "consumptionMethod",
    ) as ConsumptionMethod;
    try {
      await createOrder({
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      });
      onOpenChange(false);
      toast.success("Pedido finalizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button className="mb-10 w-full rounded-full">Finalizar pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      placeholder="Digite seu CPF"
                      format="###.###.###-##"
                      customInput={Input}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter className="px-0">
              <Button
                type="submit"
                className="w-full rounded-full"
                variant="destructive"
                disabled={isPending}
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Finalizar
              </Button>
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
