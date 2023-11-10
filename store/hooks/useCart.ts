import { Product } from "@/types"
import { useState } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseCartStore {
    // items: Product[];
    items: Product[];
    dishes: string[];
    notAvailableItems: string[];
    addItem: (data: Product | string) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    addDish: (data: string) => boolean;
    getItems: () => number;
}

const useCart = create(
    persist<UseCartStore>((set, get) => ({
        items: [],
        notAvailableItems: [],
        dishes: [],
        addItem: (data: any) => {
            const currentItems = get().items;
            const currentItemsNotInStock = get().notAvailableItems;
            // % is for the names of dishes (deleted feature)
            // if (data.toString().includes("Item out of stock:") || data.toString().includes("%")) {
            if (data.toString().includes("Item out of stock:")) {
                // set({ items: [...get().items, data] });
                // console.log("out of stock item: ", data);

                const existingItemNotInstock = currentItemsNotInStock.find((item) => item === data);

                if (existingItemNotInstock) {
                    return toast("Item already in cart.");
                }
                set({ notAvailableItems: [...get().notAvailableItems, data] })
            }
            else {
                const existingItem = currentItems.find((item) => item.id === data.id);

                if (existingItem) {
                    return toast("Item already in cart.");
                }
                // console.log("in stock: ", data);
                set({ items: [...get().items, data] });
            }
            // toast.success("Item added to cart");
        },
        getItems: () => {
            // console.log("ietms none: ", get().notAvailableItems.length)
            return get().notAvailableItems.length;
        },
        addDish: (data: any) => {
            if (get().notAvailableItems.length == 1) {
                set({ dishes: [] });
            }
            const currentDish = get().dishes;
            const existingDish = currentDish.find((dish) => dish === data);

            if (existingDish) {
                toast.error("Dish ingredients already in cart")
                return false
            }
            set({ dishes: [...get().dishes, data] });
            toast.success("Dish ingredients added to cart");
            return true;
        },

        removeItem: (id: string) => {
            set({
                items: [...get().items.filter((item) => {
                    return item.id !== id;
                })]
            });

            set({
                notAvailableItems: [...get().notAvailableItems.filter((item) => {
                    item !== id
                    console.log("not_available_cart_item id: ", item)
                })]
            })
            toast.success("Item removed from the cart");
        },
        removeAll: () => set({ items: [], notAvailableItems: [], dishes: [] }),
    }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage)

        })
)

export default useCart;