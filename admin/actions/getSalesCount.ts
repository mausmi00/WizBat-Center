import prismadb from "@/lib/prismadb";

const getSalesCount = async (storeId: string) => {
    const salesCount = await prismadb.orderPlaced.count({
        where: {
            storeId,
            isPaid: true,
        },
    });
    return salesCount
}

export default getSalesCount;