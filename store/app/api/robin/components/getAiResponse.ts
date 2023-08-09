import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";
import MemoryChain from "./memoryChain";
import getAiCsvResponse from "./getAiCsvResponse";
import { Product } from "@/types";
import AddIngredientsToCart from "./addIngredientsToCart";

declare global {
    var ingredientsInStore: Product[] | null | undefined;
    var ingredientsNotInStore: string[] | null | undefined
}

const getAiResponse = async (chain: ConversationChain, input: string) => {
    try {
        const response = await chain.call({
            input: input,
        });
        let res = response.response.split(",");
        globalThis.ingredientsInStore = [];
        globalThis.ingredientsNotInStore = [];
        await AddIngredientsToCart(res);
        return response.response;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;