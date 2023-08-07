import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";
import MemoryChain from "./memoryChain";

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
        console.log("input: ", input);
        // console.log("response: ", response.response)
        return response.response;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;
