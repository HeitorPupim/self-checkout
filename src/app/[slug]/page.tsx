import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/consumption-method-option";


interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}


// Component async -> Server component: Renderizado no servidor
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({where: {slug: slug}});
  if (!restaurant) {
    return notFound();  
  }

  return <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
    {/* logo e titulo */}
    <div className="flex flex-col items-center gap-2">
      <Image 
        src={restaurant?.avatarImageUrl} 
        alt={restaurant?.name} 
        width={82} 
        height={82} 
      />

      <h2 className="font-semibold">{restaurant?.name}</h2>

    </div>

    {/* texto de boas vindas */}
    <div className="pt-24 text-center space-y-2">
      <h3 className="font-semibold text-2xl">Seja bem-vindo!</h3>
      <p className="opacity-55">
        Escolha como aproveitar sua refeição. Estamos aqui para oferecer a melhor 
        experiência possível.
      </p>

    </div>

    <div className="pt-14 grid grid-cols-2 gap-4">
      <ConsumptionMethodOption
        slug={slug}
        option="DINE_IN"
        imageUrl="/dine-in.png" 
        imageAlt="Para comer aqui" 
        buttonText="Para comer aqui" 
      />
      <ConsumptionMethodOption
        slug={slug}
        option="TAKEAWAY"
        imageUrl="/take-away.png" 
        imageAlt="Para levar" 
        buttonText="Para levar" 
      />
    </div>

  </div>
};

export default RestaurantPage;
