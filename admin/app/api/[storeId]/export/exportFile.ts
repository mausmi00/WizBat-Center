// Assuming you have already set up Prisma and imported the necessary modules

import prismadb from "@/lib/prismadb";

import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import csvLoader from "../robin/components/csvLoader";
import { Prisma, PrismaClient } from "@prisma/client";

async function exportDataAsCSV() {
    const prisma = new PrismaClient();
    try {

        // const billboards = await prismadb.billboard.findMany();

        // const billboardHeader = [
        //     { id: "id", title: "Billboard id" },
        //     { id: "storeId", title: "Store id" },
        //     { id: "label", title: "Billboard label" },
        //     { id: "imageUrl", title: "Billboard imageURL" },
        //     { id: "createdAt", title: "Billboard createdAt" },
        //     { id: "updatedAt", title: "Billboard updatedAt" },
        //     { id: "id", title: "Store id" },
        //     { id: "name", title: "Store name" },
        //     { id: "userId", title: "Store Owner" },
        //     { id: "createdAt", title: "Store createdAt" },
        //     { id: "updatedAt", title: "Store updatedAt" },
        // ]
        // const billboardHeader = [
        //     "billboardId", "Store id", "buill label", "bill imageUrl", "bill createdAt", "bill updatedAt", "store id",
        //     "store name", "store owner", "store createdAt", "store updatedAt"
        // ]
        // const categoryHeader = [
        //     { id: "id", title: "CategoryId" },
        //     { id: "name", title: "Category Name" },
        //     { id: "createdAt", title: "Category createdAt" },
        //     { id: "updatedAt", title: "Category updatedAt" },
        // ]
        // const checkoutHeader = [
        //     { id: "id", title: " Checkout id" },
        //     { id: "storeId", title: "Checkout storeId" },
        //     { id: "isPaid", title: "Checkout status" },
        //     { id: "phone", title: "Checkout user phone" },
        //     { id: "address", title: "Checkout user address" },
        //     { id: "createdAt", title: "Checkout createdAt" },
        //     { id: "updatedAt", title: "Checkout updatedAt" },
        // ]
        // const colorHeader = [
        //     { id: "id", title: "Colors id" },
        //     { id: "storeId", title: "Colors StoreId" },
        //     { id: "name", title: "Color Name" },
        //     { id: "value", title: "Color hex value" },
        //     { id: "createdAt", title: "Color createdAt" },
        //     { id: "updatedAt", title: "Color updatedAt" },
        // ]
        // const sizeHeader = [
        //     { id: "id", title: "Size id" },
        //     { id: "storeId", title: "Size StoreId" },
        //     { id: "name", title: "Size Name" },
        //     { id: "value", title: "Size value" },
        //     { id: "createdAt", title: "Size createdAt" },
        //     { id: "updatedAt", title: "Size updatedAt" },
        // ]
        // const storeHeader = [
        //     { id: "id", title: "Store id" },
        //     { id: "name", title: "Store name" },
        //     { id: "userId", title: "Store Owner" },
        //     { id: "createdAt", title: "Store createdAt" },
        //     { id: "updatedAt", title: "Store updatedAt" },
        //     { id: "billboard.id", title: "Billboard id" },
        //     { id: "label", title: "Billboard label" },
        //     { id: "imageUrl", title: "Billboard imageURL" },
        //     { id: "createdAt", title: "Billboard createdAt" },
        //     { id: "updatedAt", title: "Billboard updatedAt" },
        // ]

        // let billboards = await prismadb.billboard.findMany({
        //     include: {
        //         store: {
        //             select: {
        //                 store_id: true,
        //                 store_name: true,
        //                 userId: true,
        //                 store_updatedAt: true,
        //                 store_createdAt: true
        //             }
        //         }
        //     }
        // });

        // // console.log("billboadr after map: ", billboards)

        // // Billboard
        // const billboardHeader = [
        //     { id: "billboard_id", title: "Billboard id" },
        //     { id: "storeId", title: "Store id" },
        //     { id: "billboard_label", title: "Billboard label" },
        //     { id: "billboard_imageUrl", title: "Billboard imageURL" },
        //     { id: "billboard_createdAt", title: "Billboard createdAt" },
        //     { id: "billboard_updatedAt", title: "Billboard updatedAt" },
        //     { id: "store_id", title: "Store id" },
        //     { id: "store_name", title: "Store name" },
        //     { id: "userId", title: "Store Owner" },
        //     { id: "store_createdAt", title: "Store createdAt" },
        //     { id: "store_updatedAt", title: "Store updatedAt" },
        // ]

        // let csvWriter = createObjectCsvWriter({
        //     path: "./data/billboard.csv",
        //     header: billboardHeader,
        //     append: false
        // })
        // // console.log("billboards: ", billboards)

        // await csvWriter.writeRecords(billboards);

        // //Categories
        // const categories = await prismadb.category.findMany();
        // csvWriter = createObjectCsvWriter({
        //     path: "./data/category.csv",
        //     header: categoryHeader,
        //     append: false
        // })

        // await csvWriter.writeRecords(categories);


        // //Checkout
        // const checkout = await prismadb.order.findMany();
        // csvWriter = createObjectCsvWriter({
        //     path: "./data/checkout.csv",
        //     header: checkoutHeader,
        //     append: false
        // })
        // await csvWriter.writeRecords(checkout);

        // //Colors
        // const colors = await prismadb.color.findMany();
        // csvWriter = createObjectCsvWriter({
        //     path: "./data/color.csv",
        //     header: colorHeader,
        //     append: false
        // })
        // await csvWriter.writeRecords(colors);


        // //Size
        // const sizes = await prismadb.size.findMany();
        // csvWriter = createObjectCsvWriter({
        //     path: "./data/size.csv",
        //     header: sizeHeader,
        //     append: false
        // })
        // await csvWriter.writeRecords(sizes);

        // //Stores
        // // const stores = await prismadb.store.findMany();
        // csvWriter = createObjectCsvWriter({
        //     path: "./data/store.csv",
        //     header: storeHeader,
        //     append: true
        // })

        // const stores = await prismadb.store.findMany({
        //     join: {
        //         billboard: true,
        //         categories: true,
        //         sizes: true,
        //         colors: true,
        //         products: true,
        //         orders: {
        //             include: {
        //                 orderItems: true
        //             }                   
        //         }
        //     }
        // });
        // const storeLength = stores.length;
        // const combinedObj = []
        // for (let i = 0; i < storeLength; i++) {
        //     const comb = [];
        //     const billboardLength = stores[i].billboard.length
        //     comb.push(stores[i].id, stores[i].name, stores[i].userId, stores[i].createdAt, stores[i].updatedAt);
        //     for (let j = 0; j < billboardLength; j++) {
        //         comb.push(stores[i].billboard[i]?.id, stores[i].billboard[i]?.label, stores[i].billboard[i]?.imageUrl, stores[i].billboard[i]?.createdAt, stores[i].billboard[i]?.updatedAt)
        //     }
        //     combinedObj.push(comb)
        // }

        // console.log("comb: ", combinedObj)
        // await csvWriter.writeRecords(combinedObj);

        // console.log("storesss: ", stores)

        const header = [
            { id: "id", title: "Billboard id" },
            { id: "storeId", title: "Store id" },
            { id: "label", title: "Billboard label" },
            { id: "imageUrl", title: "Billboard imageURL" },
            { id: "createdAt", title: "Billboard createdAt" },
            { id: "updatedAt", title: "Billboard updatedAt" },
            { id: "id", title: "Store id" },
            { id: "name", title: "Store name" },
            { id: "userId", title: "Store Owner" },
            { id: "createdAt", title: "Store createdAt" },
            { id: "updatedAt", title: "Store updatedAt" },
        ]

        const result = await prisma.$queryRaw`
        SELECT 
        s.id AS store_id,
        s.name AS store_name,
        s.userId AS store_userId,
        s.createdAt AS store_createdAt,
        s.updatedAt AS store_updatedAt,

        b.id AS billboard_id,
        b.storeId AS billboard_storeID,
        b.label AS billboard_label,
        b.imageUrl AS billboard_imageUrl,
        b.createdAt AS billboard_createdAt,
        b.updatedAt AS billboard_updatedAt,

        c.id AS category_id,
        c.storeID AS category_storeId,
        c.billboardId AS category_billboardId,
        c.name AS category_name,
        c.createdAt AS category_createdAt,
        c.updatedAt AS category_updatedAt,

        size.id AS size_id,
        size.storeId AS size_storeId,
        size.name AS size_name,
        size.value AS size_value,
        size.createdAt AS size_createdAt,
        size.updateAt AS size_updatedAt,

        color.id AS color_id,
        color.storeId AS color_storeId,
        color.name AS color_name,
        color.value AS color_value,
        color.createdAt AS color_createdAt,
        color.updateAt AS color_updatedAt,

        p.id AS product_id,
        p.storeId AS product_storeId,
        p.categoryId AS product_categoryId,
        p.name AS product_name,
        p.price AS product_price,
        p.isFeatured AS product_isFeatured,
        p.isArchived AS product_isArchived,
        p.sizeId AS product_sizeId,
        p.colorId AS product_colorId,
        p.createdAt AS product_createdAt,
        p.updatedAt AS product_updatedAt,

        o.id AS order_id,
        o.storeId AS order_storeId,
        o.isPaid AS order_isPaid,
        o.phone AS order_phone,
        o.address AS order_address,
        o.createdAt AS order_createdAt,
        o.updatedAt AS order_updatedAt,

        orderItem.id AS orderItem_id,
        orderItem.orderId AS orderItem_orderId,
        orderItem.productID AS orderItem_productId

         FROM Store s LEFT Join Billboard b ON s.id = b.storeId 
        LEFT Join Category c ON s.id = c.storeId 
        LEFT Join Size size ON s.id = size.storeId 
        LEFT Join Color color ON s.id = color.storeId
        LEFT Join Product p ON s.id = p.storeID
        LEFT Join Order o ON s.id = o.storeId
        LEFT JOIN OrderItem orderItem o.orderId = orderItem.orderId`;

        console.log("Result :", result);
        // const csvWriter = createObjectCsvWriter({
        //     path: "./data/category.csv",
        //     header: header,
        //     append: false
        // })

        // await csvWriter.writeRecords(result);

        csvLoader();

        console.log('CSV files have been written.');

        // Step 4: Send CSV file to client (Not shown here, you'll need to implement the server response and client-side handling)
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

export default exportDataAsCSV;