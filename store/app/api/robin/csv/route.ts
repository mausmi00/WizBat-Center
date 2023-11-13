import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import MemoryChain from "../components/memoryChain";
import exportDataAsCSV from "../../export/exportFile";

export async function GET(request: Request) {

    MemoryChain();
    // const {user} = useUser();
    // console.log("user image: ", user?.imageUrl);
    try {
        if (globalThis.userId === null) {
            return new NextResponse("No user id", { status: 400 })
        }
        // const storeOwner = await prismadb.store.findUnique({
        //     where: {
        //         id: storeId,
        //     },
        // });

        const convoMessages = await prismadb.conversation.findMany({
            where: {
                userId: globalThis.userId
            },
            include: {
                messages: true,
            },
        });

        let getMessages = null;
        if (convoMessages != null) {
            getMessages = await prisma?.message.findMany({
                where: {
                    conversationId: convoMessages[0]?.id
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })
        }

        // exportDataAsCSV();

        return NextResponse.json(getMessages)

    } catch (error: any) {
        console.log(error, "ROBIN_GET_ERROR")
        return new NextResponse('Internal Error', { status: 500 })
    }
}