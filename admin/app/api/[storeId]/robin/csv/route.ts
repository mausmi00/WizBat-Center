import prismadb from "@/lib/prismadb";
import exportDataAsCSV from "../../export/exportFile";
import { NextResponse } from "next/server";
import MemoryChain from "../components/memoryChain";

interface IParams {
    storeId: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
    const { storeId } = params;
    
    try {
        exportDataAsCSV().then(() => {
            MemoryChain();
        });

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

        let getMessages = null
        // if (convoMessages.length != 0) {
        getMessages = await prismadb?.message.findMany({
            where: {
                conversationId: convoMessages[0]?.id
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