"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";
import CartItem from "./components/cartItem";
import Summary from "./components/summary";
import CartItemNotFound from "./components/cartItemNotFound";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <h3 className="text-3xl font-bold text-black pb-4">In Stock</h3>
              {cart.items.length === 0 && (
                <p className="text-neutral-500 pb-6">No items added to cart</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
              <h3 className="text-3xl font-bold text-gray-500 pb-4 pt-10">
                Out of Stock
              </h3>
              {cart.getItems() === 1 ? (
                <div className="text-neutral-500 pb-6">
                  {" "}
                  No items out of stock
                </div>
              ) : (
                <ul>
                  {cart.notAvailableItems.map((item) => (
                    <CartItemNotFound key={item} data={item} />
                  ))}
                </ul>
              )}
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
