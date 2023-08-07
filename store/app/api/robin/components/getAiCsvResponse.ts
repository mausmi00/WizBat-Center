import { ConversationChain, ConversationalRetrievalQAChain } from "langchain/chains";
import { NextResponse } from "next/server";
import getProduct from "@/actions/getProduct";
import { Product } from "@/types";

const getAiCsvResponse = async (chain: ConversationalRetrievalQAChain, input: string) => {
    console.log("in get csv file")
    // const cart = getCart();
    // if (globalThis.CHAIN === undefined) {
    //     MemoryChain();
    // }
    // console.log("chain in get resp: ", chain);
    // console.log("input: ", input)
    const updated_input = `do I have ${input} in store. Reply with only its productId of the product is in store, else say "false" all in lowercase. Say false even if the product doesn't exist in the store or for any other related matter say "False".`
    try {
        const response = await chain.call({
            question: updated_input,
        });
        console.log("updated input: ", updated_input)
        console.log("csv response: ", response.text)
        // console.log("chain: ", chain)
        // console.log("response: ", response.response)
        // if (globalThis.ingredients == null) {
        //     globalThis.ingredients = [];
        // }
        // globalThis.ingredients.push(`%${input}%`)
        // for (let ingredient of response.response) {
        //     globalThis.ingredients?.push(ingredient);
        // }
        // if exists, add item to checkout else let the user know that the item doesnt exist (or add a red banner that states that the item doesn't exist)
        // if (globalThis.ingredientsInStore?.length == 0) {
        //     globalThis.ingredientsInStore = [];
        // }

        // if (globalThis.ingredientsNotInStore?.length == 0) {
        //     globalThis.ingredientsNotInStore = [];
        // }

        if (response.text == "false" || response.text == "False") {
            globalThis.ingredientsNotInStore?.push(input)
            console.log("added2 ", globalThis.ingredientsNotInStore)

        } else {
            const product = await getProduct(response.text);
            // cart.addItem(product);
            globalThis.ingredientsInStore?.push(product)
            console.log("added1 ", globalThis.ingredientsInStore)
        }

        return response.text;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiCsvResponse;