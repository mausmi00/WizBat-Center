"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/iconButton";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  console.log("cart item: ", data)

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-15 w-15 rounded-md overflow-hidden sm:h-20 sm:w-20">
        <Image
          fill
          src={data.images[0]?.url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex jusitfy-bewteen">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};
// };

export default CartItem;
