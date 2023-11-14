import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import getAiResponse from "./components/getAiResponse";
import MemoryChain from "./components/memoryChain";

declare global {
    var userId: string | null | undefined;
}

export async function POST(request: Request) {
    try {

        if (globalThis.CHAIN == null) {
            MemoryChain()
        }
        const req = await request.json();
        const { message } = req;
        // const { userId } = auth();
        // if (!userId) {
        //     return new NextResponse("Unauthenticated", { status: 403 });
        // }
        if (!message) {
            return new NextResponse("Message is required", { status: 400 })
        }

        if (globalThis.userId == null) {
            globalThis.userId = Math.random().toString();
        }


        let conversation = await prismadb.conversation.findMany({
            where: {
                userId: globalThis.userId
            }
        });
        // console.log("conversation: ", conversation);

        if (conversation.length == 0) {
            const newConversation = await prismadb.conversation.create({
                data: {
                    userId: globalThis.userId
                }
            })
            // console.log("new conversation: ", newConversation)

            const newMessage = await prismadb.message.create({
                data: {
                    body: message,
                    conversation: {
                        connect: {
                            id: newConversation?.id
                        }
                    }
                }
            });

            const response = await getAiResponse(globalThis.CHAIN, message);
            console.log("reponse getAi1: ", response)
            const messageResponse = await prismadb.message.create({
                data: {
                    body: response,
                    isAi: true,
                    conversation: {
                        connect: {
                            id: newConversation?.id
                        }
                    }
                }
            });

            return NextResponse.json([newMessage, messageResponse, globalThis.ingredientsInStore, globalThis.ingredientsNotInStore, globalThis.ingredientsAdded, globalThis.dishName])
        }

        const newMessage = await prismadb.message.create({
            data: {
                body: message,
                conversation: {
                    connect: {
                        id: conversation[0]?.id
                    }
                }
            }
        });

        const response = await getAiResponse(globalThis.CHAIN, message);
        console.log("reponse getAi2: ", response)
        const messageResponse = await prismadb.message.create({
            data: {
                body: response,
                isAi: true,
                conversation: {
                    connect: {
                        id: conversation[0]?.id
                    }
                }
            }
        });

        return NextResponse.json([newMessage, messageResponse, globalThis.ingredientsInStore, globalThis.ingredientsNotInStore, globalThis.ingredientsAdded, globalThis.dishName])

    } catch (error: any) {
        console.log(error, "ROBIN_MESSAGE_CREATION_ERROR")
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET(request: Request) {
    // const {user} = useUser();
    // console.log("user image: ", user?.imageUrl);
    try {
        if (globalThis.userId === null) {
            return new NextResponse("No user id", { status: 400 })
        }

        const convoMessages = await prismadb.conversation.findMany({
            where: {
                userId: globalThis.userId
            },
            include: {
                messages: true,
            },
        });

        const getMessages = await prismadb?.message.findMany({
            where: {
                conversationId: convoMessages[0]?.id,
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return NextResponse.json(getMessages)

    } catch (error: any) {
        console.log(error, "ROBIN_GET_ERROR")
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(request: Request) {


    try {

        if (globalThis.userId === null) {
            return new NextResponse("No user id", { status: 400 })
        }

        const convoMessages = await prismadb.conversation.findMany({
            where: {
                userId: globalThis.userId
            },
            include: {
                messages: true,
            },
        });

        const getMessages = await prismadb?.message.deleteMany({
            where: {
                conversationId: convoMessages[0]?.id
            }
        });

        const deleteConvo = await prismadb?.conversation.deleteMany({
            where: {
                id: convoMessages[0]?.id
            }
        })

        return NextResponse.json(deleteConvo)

    } catch (error) {
        console.log('[ROBIN_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}