import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import MemoryChain from "../components/memoryChain";

export async function GET(request: Request) {

    MemoryChain();

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