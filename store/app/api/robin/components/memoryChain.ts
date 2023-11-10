import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ConversationChain, ConversationalRetrievalQAChain, LLMChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
} from "langchain/prompts";



declare global {
    var CHAIN: any | null;
    var CSV_CHAIN: any | null;
    var SECOND_AGENT_CHAIN: any | null;
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
    let memory = new BufferMemory({
        memoryKey: "chat_history",
        returnMessages: true,
    });

    const model = new ChatOpenAI({
        temperature: 0,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: "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",

    });

    //initializing chain
    globalThis.CSV_CHAIN = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
        memory
    });

    let chatPrompt = null;
    // let second_agent_chatPrompt = null;


    // "You have 2 modes, chat mode and ingredient provider mode. When the user talks with you about general things, be in chat mode and add prefix 'Chat Mode'. As soon as he tells you about a dish, you feel the need to go to ingredient mode. Add prefix 'Ingredient Mode' In this mode you  just list out ingredients that can be passed to a database (No special characters). Separate each ingredient with a comma without any other special characters. Follow the format: Ingredient Mode - Banana, apple, milk, turmeric")
    chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "You have 3 modes cart mode, chat mode, ingredient provider mode. When the user talks with you about general things, be in chat mode and add prefix 'Chat Mode:'.  As soon as he tells you to add the ingredients to the cart go to cart mode if they don't want to add to cart then go back to chat mode. Only go to cart mode if the ingredients have to be added else don't. Add prefix 'Cart Mode:'. As soon as he tells you about a dish, you feel the need to go to ingredient mode and end with the line 'Do you want to add these ingredients to the cart?' at the end. Add prefix 'Ingredient Mode:(name of the dish):' In this mode you just list out ingredients that can be passed to a database (No special characters). Separate each ingredient with a comma without any other special characters. Follow the format: Ingredient Mode: Banana Milkshake: Banana, apple, milk, turmeric."),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    // second_agent_chatPrompt = ChatPromptTemplate.fromPromptMessages([
    //     SystemMessagePromptTemplate.fromTemplate(
    //         "If provided with a list of ingredients return yes, else say no. Just respond with 1 word."),
    //     HumanMessagePromptTemplate.fromTemplate("{input}"),
    // ]);

    // const template = "Act like an agent that decides whether the given input is a list of food ingredients or not by replying 'Yes' or 'No'. Just respond with 'yes' or 'no'. Just 1 word."
    // const template = "Respond with yes if the provided input is a list of ingredients and no if its just a regular conversation. Just respond with 'yes' or 'no'"
    // const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
    // const humanTemplate = "{input}";
    // const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

    // second_agent_chatPrompt = ChatPromptTemplate.fromPromptMessages([systemMessagePrompt, humanMessagePrompt]);

    globalThis.CHAIN = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
        prompt: chatPrompt,
        llm: model,
    });

    // globalThis.SECOND_AGENT_CHAIN = new LLMChain({
    //     llm: model,
    //     prompt: second_agent_chatPrompt
    // });


    // console.log("chain: ", globalThis.CHAIN)
    // const result = await chain.call({
    //     question: "how many rows of data do I have?"
    // });
    // console.log(result);
}

export default MemoryChain;