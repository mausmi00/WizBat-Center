import prismadb from "@/lib/prismadb";
import { auth, useUser } from "@clerk/nextjs";
import { id } from "date-fns/locale";
import { NextResponse } from "next/server"
<<<<<<< HEAD
import exportDataAsCSV from "../export/exportFile";
=======
>>>>>>> b61607790bc2f37d2fad78a73a6638caae1699ee

interface IParams {
    storeId: string
}

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const { message } = req;
        console.log("message: ", message)
        const { userId } = auth();
        console.log("hehe")
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
        console.log("conversation: ", conversation)

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
                            id: newConversation.id
                        }
                    }
                }
            });

            console.log("new message: ", newMessage)
            return NextResponse.json(newMessage)
        }

        const newMessage = await prismadb.message.create({
            data: {
                body: message,
                conversation: {
                    connect: {
                        id: conversation[0].id
                    }
                }
            }
        });
        console.log("message is:", newMessage)

        return NextResponse.json(newMessage)

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
                conversationId: convoMessages[0].id
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        
<<<<<<< HEAD
        exportDataAsCSV();
        
=======
>>>>>>> b61607790bc2f37d2fad78a73a6638caae1699ee
        return NextResponse.json(getMessages)

    } catch (error: any) {
        console.log(error, "ROBIN_GET_ERROR")
        return new NextResponse('Internal Error', { status: 500 })
    }

}