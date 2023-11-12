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
            question: `${input}. Act as an assistant to a store owner and answer question based on the provided context, keep your answers short and precise. If questions asked are not in context make up an answer. Don't break character at any point. Also respond with easily readable text`
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
