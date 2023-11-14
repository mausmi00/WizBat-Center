import { ConversationChain, ConversationalRetrievalQAChain } from "langchain/chains";
import { NextResponse } from "next/server";
import MemoryChain from "./memoryChain";
import exportDataAsCSV from "../../export/exportFile";

const getAiResponse = async (chain: ConversationalRetrievalQAChain, input: string) => {
    try {
        console.log("chain 2: ", chain)
        let response = await chain.call({
            question: `${input}. Act as an assistant named Robin and answer question based on the provided context, keep your answers short and precise. If questions asked are not in context make up an answer. Don't break character at any point. Also respond with easily readable text, if necessary, format the text to pointers before responding. Don't answer in long paragraphs`
        });
        return response.text;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;
