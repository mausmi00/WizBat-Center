import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";
import { Product } from "@/types";
import AddIngredientsToCart from "./addIngredientsToCart";
import { useState } from "react";

declare global {
    var ingredientsInStore: Product[] | null | undefined;
    var ingredientsNotInStore: string[] | null | undefined
    var ingredientsAdded: boolean | null | undefined;
    var allIngredients: string[];
    var dishName: string;
}

// Helper function for delaying
function delay(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getAiResponse = async (chain: ConversationChain, input: string) => {
    try {

        let response = await chain.call({
            input: input,
        });
        if (response.response.includes("Ingredient Mode")) {
            // setIsLoading(true);
            response = response.response.split("Ingredient Mode:")[1];

            // Response if of format Ingredient Mode: Banana Milkshake: Banana, milk, ice cream, sugar, vanilla extract. Do you want to add these ingredients to the cart?
            // to remove "Ingredient Mode: "
            globalThis.dishName = response.split(":")[0];

            // to get the dishName
            response = response.split(":")[1];

            // to get the ingredients
            const lastIndex = response.lastIndexOf(':');
            if (lastIndex !== -1) {
                return response.slice(lastIndex + 1);
            }
            global.ingredientsAdded = false

            // to remove "do you want to add these to cart?"
            globalThis.allIngredients = response.split(".")[0].split(",");
        } else if (response.response.includes("Chat Mode")) {
            // response of format: "Chat Mode: Hey there! How can I assist you today?"
            response = response.response.split("Chat Mode: ")[1];
            global.ingredientsAdded = false;
        } else {

            // response of format: "Cart Mode: Banana Pre-Workout Milkshake: Banana, Greek yogurt, almond milk, spinach or kale, protein powder, chia seeds or flaxseeds, honey or maple syrup."
            response = response.response.split("Cart Mode: ")[1];
            globalThis.ingredientsInStore = [];
            globalThis.ingredientsNotInStore = [];
            global.ingredientsAdded = true;
            await AddIngredientsToCart(globalThis.allIngredients);
        }
        return response;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;