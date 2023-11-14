import { ConversationChain } from "langchain/chains";
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
    var SECOND_AGENT_CHAIN: any | null;
}

const MemoryChain = async () => {
    
    const model = new ChatOpenAI({
        temperature: 0,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: process.env.OPENAI_API_KEY,

    });

    let chatPrompt = null;


    // "You have 2 modes, chat mode and ingredient provider mode. When the user talks with you about general things, be in chat mode and add prefix 'Chat Mode'. As soon as he tells you about a dish, you feel the need to go to ingredient mode. Add prefix 'Ingredient Mode' In this mode you  just list out ingredients that can be passed to a database (No special characters). Separate each ingredient with a comma without any other special characters. Follow the format: Ingredient Mode - Banana, apple, milk, turmeric")
    chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "You have 3 modes cart mode, chat mode, ingredient provider mode. When the user talks with you about general things, be in chat mode and add prefix 'Chat Mode:'.  As soon as he tells you to add the ingredients to the cart go to cart mode if they don't want to add to cart then go back to chat mode. Only go to cart mode if the ingredients have to be added else don't. Add prefix 'Cart Mode:'. As soon as he tells you about a dish, you feel the need to go to ingredient mode and end with the line 'Do you want to add these ingredients to the cart?' at the end. Add prefix 'Ingredient Mode:(name of the dish):' In this mode you just list out ingredients that can be passed to a database (No special characters). Separate each ingredient with a comma without any other special characters. Follow the format: Ingredient Mode: Banana Milkshake: Banana, apple, milk, turmeric."),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    globalThis.CHAIN = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
        prompt: chatPrompt,
        llm: model,
    });
}

export default MemoryChain;