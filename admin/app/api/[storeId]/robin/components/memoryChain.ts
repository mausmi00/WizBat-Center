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

    // // memory
    // let memory = new BufferMemory({
    //     memoryKey: "chat_history",
    //     returnMessages: true,
    //     // humanPrefix: "You are a store owner and you have the data provided in the csv file. Keep your responses short."
    //     // humanPrefix:
    //     //   "You are a good assistant that answers question based on the document info you have. If you don't have any information just say I don't know. Answer question with the same language of the question",
    //     // inputKey: "question", // The key for the input to the chain
    //     // outputKey: "text",
    // });

    // creating model
    const model = new ChatOpenAI({
        temperature: 1,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: "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"
    });

    //initializing chain
    // globalThis.CSV_CHAIN = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
    //     memory
    // });

    let chatPrompt = null;

    chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "Please provide a precise list of ingredients needed to make a particular dish. Separate each ingredient with a comma. For example: 'ingredient 1, ingredient 2, ingredient 3, ...' Thank you!"
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    globalThis.CSV_CHAIN = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorstore.asRetriever(),
        {
            memory: new BufferMemory({ returnMessages: true, memoryKey: "chat_history" }),
        }
    )

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

    // console.log("chain: ", globalThis.CHAIN)
    // const result = await chain.call({
    //     question: "how many rows of data do I have?"
    // });
    // console.log(result);
    // console.log("globalThis.CSV_CHAIN in memory chain: ", globalThis.CSV_CHAIN)
}

export default MemoryChain;