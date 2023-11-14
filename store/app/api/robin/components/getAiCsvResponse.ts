import { ConversationalRetrievalQAChain } from "langchain/chains";
import { NextResponse } from "next/server";

const getAiCsvResponse = async (chain: ConversationalRetrievalQAChain, input: string[]) => {
    try {
        const updated_input = `Response should be an array of elements with the 1st element being a list of productIds of ${input} if they are found in the store (if no products are found let the element be null) and the 2nd element being a list of products that are not found. The response should always be an array as described.`
        const response = await chain.call({
            question: updated_input
        });
        
        const allIngredients = response.text;
        
        const found = allIngredients[0];
        const notFound = allIngredients[1];

        for (let f of found) {
            globalThis.ingredientsInStore?.push(f)
            console.log("added1 ", globalThis.ingredientsInStore)
        }

        globalThis.ingredientsNotInStore = notFound;
        return response;

    } catch (error: any) {
        console.log(error, 'ERROR_AI_RESPONSE');
        return new NextResponse('Internal Error', { status: 500 });
    }
};

export default getAiCsvResponse;