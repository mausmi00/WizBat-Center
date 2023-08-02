import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import exportDataAsCSV from "../export/exportFile";
import getAiResponse from "./components/getAiResponse";

interface IParams {
    storeId: string
}

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const { message } = req;
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!message) {
            return new NextResponse("Message is required", { status: 400 })
        }

        let conversation = await prismadb.conversation.findMany({
            where: {
                userId
            }
        });
        console.log("conversation: ", conversation);

        if (conversation.length == 0) {
            const newConversation = await prismadb.conversation.create({
                data: {
                    userId
                }
            })
            console.log("new conversation: ", newConversation)

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
            console.log("reponse getAi: ", response)
            const messageResponse = await prismadb.message.create({
                data: {
                    body: response.text,
                    isAi: true,
                    conversation: {
                        connect: {
                            id: newConversation?.id
                        }
                    }
                }
            });

            return NextResponse.json([newMessage, messageResponse])
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
        console.log("reponse getAi: ", response)
        const messageResponse = await prismadb.message.create({
            data: {
                body: response.text,
                isAi: true,
                conversation: {
                    connect: {
                        id: conversation[0]?.id
                    }
                }
            }
        });
        console.log("message: ", messageResponse)

        return NextResponse.json([newMessage, messageResponse])

    } catch (error: any) {
        console.log(error, "ROBIN_MESSAGE_CREATION_ERROR")
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET(request: Request, { params }: { params: IParams }) {
    const { storeId } = params;
    // const {user} = useUser();
    // console.log("user image: ", user?.imageUrl);
    try {
        const storeOwner = await prismadb.store.findUnique({
            where: {
                id: storeId,
            },
        });

        const convoMessages = await prismadb.conversation.findMany({
            where: {
                userId: storeOwner?.userId,
            },
            include: {
                messages: true,
            },
        });

        const getMessages = await prisma?.message.findMany({
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

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const { storeId } = params;

    try {
        const storeOwner = await prismadb.store.findUnique({
            where: {
                id: storeId,
            },
        });
        const convoMessages = await prismadb.conversation.findMany({
            where: {
                userId: storeOwner?.userId,
            },
            include: {
                messages: true,
            },
        });

        const getMessages = await prisma?.message.deleteMany({
            where: {
                conversationId: convoMessages[0]?.id
            }
        });

        const deleteConvo = await prisma?.conversation.deleteMany({
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