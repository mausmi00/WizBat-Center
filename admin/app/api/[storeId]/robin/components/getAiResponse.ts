import { ConversationChain, ConversationalRetrievalQAChain } from "langchain/chains";
import { NextResponse } from "next/server";
import MemoryChain from "./memoryChain";

const getAiResponse = async (chain: ConversationalRetrievalQAChain, input: string) => {
    // console.log("chain: ", chain)
    // if (globalThis.CHAIN === undefined) {
    //     MemoryChain();
    // }
    // console.log("chain in get resp: ", chain);
    // console.log("input: ", input)
    try {
        // const response = await chain.call({
        //     input: input,
        // });
        // const updated_input = `Act like a store owner and respond according to the data provided`
        let response = null
        response = await chain.call({
            // question: updated_input,
            question: `${input}. Answer question based on the provided context. Try to answer ther questions, keep your answers short and precise. You can guess the popularity of products by checking which one was bought most times`
        });
       
        console.log("responseeee: ", response)
        // console.log("chain: ", chain)
        console.log("input: ", input);
        // console.log("response: ", response.response)
        // return response.response;
        return response.text;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;
