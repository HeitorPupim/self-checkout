import { db } from "@/lib/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";

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
  });
  if (!product){
    return notFound();
  }


  return ( 
    <div>
      {/* Foto do produto */}
      <div className="relative w-full h-[300px]">
        <ProductHeader product={product}/>

      </div>



      <h1>Product Page</h1>
     {slug}
     {productId}  
    </div>




);
}
 
export default ProductPage;