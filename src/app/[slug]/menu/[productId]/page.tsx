import { db } from "@/lib/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-detail";

interface ProductPageProps {
  params: Promise <{
    slug: string, 
    productId: string
  }>
}

const ProductPage = async ({params}: ProductPageProps) => {
  const {slug, productId} = await params;

  const product = await db.product.findUnique({
    where: {id: productId},
    include: {
      restaurant: {
        select: {
          slug: true,
          name: true,
          avatarImageUrl: true,
        },
      },
    },
  });
  if (!product){
    return notFound();
  }
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase() ){
    return notFound();
  }

  return ( 
    <div className="flex h-full flex-col">
      <ProductHeader product={product}/>
      <ProductDetails product={product}/>
    </div>

  




);
}
 
export default ProductPage;