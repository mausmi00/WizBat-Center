import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ConversationChain, ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextResponse } from "next/server";



declare global {
    var CHAIN: any | null;
    var CSV_CHAIN: any | null;
}

const MemoryChain = async () => {
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
                memory: new BufferMemory({ returnMessages: true, memoryKey: "chat_history" }),
            },
        )
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}

export default MemoryChain;