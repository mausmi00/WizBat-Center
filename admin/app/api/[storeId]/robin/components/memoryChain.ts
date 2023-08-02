import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ConversationChain, ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
} from "langchain/prompts";



declare global {
    var CHAIN: any | null;
    var CSV_CHAIN: any | null;
}

const MemoryChain = async () => {
    console.log("initalized!!!")
    // Load data
    let loader = new CSVLoader("./data/storeInfo.csv/");
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
        temperature: 1,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: "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"
    });

    //initializing chain
    globalThis.CSV_CHAIN = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
        memory
    });

    let chatPrompt = null;

    chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "Please provide a precise list of ingredients needed to make a particular dish. Separate each ingredient with a comma. For example: 'ingredient 1, ingredient 2, ingredient 3, ...' Thank you!"
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    globalThis.CHAIN = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
        prompt: chatPrompt,
        llm: model,
    });

    // console.log("chain: ", globalThis.CHAIN)
    // const result = await chain.call({
    //     question: "how many rows of data do I have?"
    // });
    // console.log(result);
}

export default MemoryChain;