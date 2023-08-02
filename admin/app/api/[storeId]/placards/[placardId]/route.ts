import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    { params }: { params: { placardId: string } }) {
    try {

        if (!params.placardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.placardId,
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: Request,
    { params }: { params: { storeId: string, placardId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!params.placardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.placardId
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: Request,
    { params }: { params: { storeId: string, placardId: string } }) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.placardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.placardId,
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
