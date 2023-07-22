import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";


const csvLoader = async () => {
    // Load data
    let loader = new CSVLoader("./data/checkout.csv/");
    let docs = await loader.load();

    // Split data
    let textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 0,
    });

    let splitDocs = await textSplitter.splitDocuments(docs);

    // Embed and store in vector store
    let embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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"
    });

    let vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

    // memory
    const memory = new BufferMemory({
        memoryKey: "chat_history",
        returnMessages: true,
    });

    // creating model
    const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        openAIApiKey: "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"
    });

    //initializing chain
    const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
        memory
    });


    const result = await chain.call({
        question: "how many rows of data do I have?"
    });
    console.log(result);
}

export default csvLoader;