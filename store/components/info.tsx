"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import { ShoppingCart } from "lucide-react";
import Button from "./ui/button";
import useCart from "@/hooks/useCart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const onAddToCart = () => {
    cart.addItem(data);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Card
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
