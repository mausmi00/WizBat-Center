"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/iconButton";
import useCart from "@/hooks/useCart";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  data: string;
}

const CartItemNotFound: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const outOfStockName = data.split("Item out of stock: ");

  // if the name of the product starts with '%' then its a dish name
  // const isDish = data.charAt(0) == "%" ? true : false;
  // let dishName = null;
  // if (isDish) {
  //   dishName = data.split("%")[1];
  //   // console.log("dishname: ", dishName);
  // }

  const onRemove = () => {
    cart.removeItem(data);
  };

  // console.log("length of ingredients: ", data);

  // return isDish && outOfStockName.length >= 1 ? (
  //   <ul>
  //     {/* if we want to display dish names before displaying their ingredients*/}
  //     {/* <h4 className="text-2xl font-semibold text-black text-decoration-line: underline">
  //       {dishName}
  //     </h4> */}
  //   </ul>
  // ) :
  return (
    <>
      <li className="flex py-6 border-b">
        <div className="relative h-15 w-15 rounded-md overflow-hidden sm:h-20 sm:w-20">
          <Image
            fill
            src="/images/outOfStock.png"
            alt=""
            className="object-cover object-center"
          />
        </div>
        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="absolute z-10 right-0 top-0">
            <IconButton onClick={onRemove} icon={<X size={15} />} />
          </div>
          <div className="flex jusitfy-bewteen pt-4">
            <p className="text-md font-semibold text-black">
              {outOfStockName[1]}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};
// };

export default CartItemNotFound;
