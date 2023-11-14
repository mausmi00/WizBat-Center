import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextResponse } from "next/server";



declare global {
    var CHAIN: any | null;
    var CSV_CHAIN: any | null;
}

const MemoryChain = async () => {
    // console.log("initalized!!!")
    try {
        // Load data
        let loader = new CSVLoader(globalThis.file_path);
        let docs = await loader.load();

        // Split data
        let textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 200,
            chunkOverlap: 0,
        });

        let splitDocs = await textSplitter.splitDocuments(docs);

        // Embed and store in vector store
        let embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
        });

        let vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

        // creating model
        const model = new ChatOpenAI({
            temperature: 1,
            modelName: "gpt-3.5-turbo",
            openAIApiKey: process.env.OPENAI_API_KEY,
        });

        let retriever = vectorstore.asRetriever()
        retriever.k = 1000
        globalThis.CSV_CHAIN = ConversationalRetrievalQAChain.fromLLM(
            model,
            retriever,
            {
                memory: new BufferMemory({ returnMessages: true, memoryKey: "chat_history" })
            },
        )
        // globalThis.CSV_CHAIN.k = 500

        // const toolkit = new VectorStoreToolkit(vectorStoreInfo, model); 
        // const agent = createVectorStoreAgent(model, toolkit);

        // await globalThis.CSV_CHAIN.call({
        //     // question: updated_input,
        //     question: "You are a store owner and you have the data provided in the csv file. Keep your responses short."
        // }).then(() => {
        //     return globalThis.CSV_CHAIN
        // })

        // memory = new BufferMemory({
        //     memoryKey: "chat_history",
        //     returnMessages: true,
        // })

        // globalThis.CHAIN = new ConversationChain({
        //     memory: new BufferMemory({ returnMessages: true, memoryKey: "chat_history" }),
        //     prompt: chatPrompt,
        //     llm: model,
        // });

        // const first_call = await globalThis.CHAIN.call({
        //     question: chatPrompt,
        // });
        // let result = await globalThis.CSV_CHAIN.call({
        //     question: "What is the most popular product we have?",
        //     prompt: "According to the has Bought values, the most popular product we have is {response}"
        // });

        // result = await globalThis.CSV_CHAIN.invoke({
        //     question: "What is the most popular product we have?",
        //     prompt: "According to the has Bought values, the most popular product we have is {response}"
        // });

        // console.log("chain: ", globalThis.CSV_CHAIN)
        // let result = await globalThis.CSV_CHAIN.call(
        //     {
        //         question: "how many rows of data do I have?"
        //     }
        // );
        // console.log(result);
        // result = await globalThis.CSV_CHAIN.call(
        //     {
        //         question: "show me all the data you have"
        //     }
        // );
        // console.log(result);
        // result = await globalThis.CSV_CHAIN.call({
        //     question: "display the data"
        // });
        // console.log(result);
        // console.log("globalThis.CSV_CHAIN in memory chain: ", globalThis.CSV_CHAIN)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}

export default MemoryChain;