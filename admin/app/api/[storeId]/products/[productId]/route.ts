import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    { params }: { params: { productId: string } }) {
    try {
        if (!params.productId) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request,
    { params }: { params: { storeId: string, productId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, price, categoryId, images, isFeatured, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 })
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
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

        if (isFeatured == true && isArchived == true) {
            return new NextResponse("Product can't be both featured and archived", { status: 400 })
        }

        await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                categoryId,
                images: {
                    deleteMany: {},
                },
                isFeatured,
                isArchived
            }
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: Request,
    { params }: { params: { storeId: string, productID: string } }) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.productID) {
            return new NextResponse("Product ID is required", { status: 400 });
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productID,
            }
        });

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
