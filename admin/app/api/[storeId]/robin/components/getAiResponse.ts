import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";

const getAiResponse = async (chain: ConversationChain, input: string) => {
    try {
        const response = await chain.call({
            question: input,
        });
        return response;
    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiResponse;
