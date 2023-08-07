import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";
import MemoryChain from "./memoryChain";
import getAiCsvResponse from "./getAiCsvResponse";
import { Product } from "@/types";

declare global {
    var ingredientsInStore: Product[] | null | undefined;
    var ingredientsNotInStore: string[] | null | undefined
}

const getAiResponse = async (chain: ConversationChain, input: string) => {
    // if (globalThis.CHAIN === undefined) {
    //     MemoryChain();
    // }
    // console.log("chain in get resp: ", chain);
    // console.log("input: ", input)
    try {
        const response = await chain.call({
            input: input,
        });
        // console.log("chain: ", chain)
        // console.log("input: ", input);
        // console.log("response: ", response.response)
        // if (globalThis.ingredients == null) {
        //     globalThis.ingredients = [];
        // }
        // globalThis.ingredients.push(`%${input}%`)
        let res = response.response.split(",");
        globalThis.ingredientsInStore = [];
        globalThis.ingredientsNotInStore = [];
        for (let ingredient of res) {
            // globalThis.ingredients?.push(ingredient);
            await getAiCsvResponse(globalThis.CSV_CHAIN, ingredient);
        }
        console.log("after process1: ", globalThis.ingredientsInStore)

        console.log("after process2: ", globalThis.ingredientsNotInStore)
        return response.response;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;