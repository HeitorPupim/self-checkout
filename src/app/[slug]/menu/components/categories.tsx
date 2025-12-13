"use client";

import { Prisma } from "@prisma/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";  
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Products from "./products";

interface RestaurantsCategoriesProps{

  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true,
        }
      }
    }
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {products: true}
}>;

const RestaurantCategories = ({ restaurant }: RestaurantsCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]); // categoria padrão é a primeira



  const handleCategoryClick = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category);
  }

  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  }
  
  return ( 
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl  bg-white">
      <div className="p-5">
        {/* header do restaurante */}
        <div className="flex items-center gap-3">
          
          {/* logo do restaurante */}
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
            className="object-cover"    
          />

          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        

        </div>

        {/* horario de funcionamento */}
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12}/>
          <p>Aberto!</p>
        </div>      
      </div>

      {/* categorias */}
      <ScrollArea className="w-full ">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button onClick={() => handleCategoryClick(category)} 
              key={category.id} 
              variant={getCategoryButtonVariant(category)}
              size = "sm"
              className="rounded-full">
              {category.name}
            </Button>
            ))}
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products = {selectedCategory.products}/>


    </div>


   );
}
 
export default RestaurantCategories;