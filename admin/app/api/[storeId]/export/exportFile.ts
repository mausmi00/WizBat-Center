import { createObjectCsvWriter } from 'csv-writer';
import { PrismaClient } from "@prisma/client";
import path from 'path';
import os from 'os';
import fs from 'fs';


declare global {
    var file_path: string
}
const exportDataAsCSV = async () => {
    const prisma = new PrismaClient();
    console.log("export called!!!")
    try {

        const header = [
            // { id: "product_id", title: "Product id" },
            // { id: "product_storeId", title: "Product storeId" },
            // { id: "product_categoryId", title: "Product categoryId" },
            { id: "product_name", title: "Product name" },
            { id: "product_price", title: "Product price" },
            // { id: "product_isFeatured", title: "Product isFeatured" },
            // { id: "product_isArchived", title: "Product isArchived" },
            // { id: "product_sizeId", title: "Product sizeId" },
            // { id: "product_colorId", title: "Product colorId" },
            // { id: "product_createdAt", title: "Product createdAt" },
            // { id: "product_updatedAt", title: "Product updatedAt" },
            // { id: "category_id", title: "Category id" },
            // { id: "category_storeId", title: "Category StoreId" },
            // { id: "category_billboardId", title: "Category billboardId" },
            { id: "category_name", title: "Category Name" },
            // { id: "category_createdAt", title: "Category createdAt" },
            // { id: "category_updatedAt", title: "Category updatedAt" },
            // { id: "color_id", title: "Color id" },
            // { id: "color_storeId", title: "Color storeId" },
            // { id: "color_name", title: "Color name" },
            // { id: "color_value", title: "Color value" },
            // { id: "color_createdAt", title: "Color createdAt" },
            // { id: "color_updatedAt", title: "Color updatedAt" },
            // { id: "size_id", title: "Size id" },
            // { id: "size_storeId", title: "Size storeId" },
            // { id: "size_name", title: "Size name" },
            // { id: "size_value", title: "Size value" },
            // { id: "size_createdAt", title: "Size createdAt" },
            // { id: "size_updatedAt", title: "Size updatedAt" },
            // { id: "orderItem_id", title: "OrderItem id" },
            // { id: "orderItem_orderId", title: "OrderItem orderId" },
            // { id: "orderItem_productId", title: "OrderItem productId" },
            // { id: "order_id", title: "Order id" },
            // { id: "order_storeId", title: "Order storeId" },
            { id: "order_isPaid", title: "Has Bought" },
            // { id: "order_phone", title: "Order phone" },
            // { id: "order_address", title: "Order address" },
            // { id: "order_createdAt", title: "Order createdAt" },
            // { id: "order_updatedAt", title: "Order updatedAt" }
        ]

        const result: any[] = await prisma.$queryRaw`
        SELECT
        p.id AS product_id,
       -- p.storeId AS product_storeId,
        p.categoryId AS product_categoryId,
        p.name AS product_name,
        p.price AS product_price,
       -- p.isFeatured AS product_isFeatured,
       --- p.isArchived AS product_isArchived,
        -- p.sizeId AS product_sizeId,
        -- p.colorId AS product_colorId,
       -- p.createdAt AS product_createdAt,
       -- p.updatedAt AS product_updatedAt,

        c.id AS category_id,
        -- c.storeID AS category_storeId,
       -- c.billboardId AS category_billboardId,
        c.name AS category_name,
       -- c.createdAt AS category_createdAt,
        --c.updatedAt AS category_updatedAt,

        -- color.id AS color_id,
        -- color.storeId AS color_storeId,
        -- color.name AS color_name,
        -- color.value AS color_value,
        -- color.createdAt AS color_createdAt,
        -- color.updateAt AS color_updatedAt,

        -- s.id AS size_id,
        -- s.storeId AS size_storeId,
        -- s.name AS size_name,
        -- s.value AS size_value,
        -- s.createdAt AS size_createdAt,
        -- s.updateAt AS size_updatedAt,

        oi.id AS orderItem_id,
        oi.orderId AS orderItem_orderId,
        oi.productID AS orderItem_productId,

        op.id AS order_id,
        -- op.storeId AS order_storeId,
        op.isPaid AS order_isPaid,
       -- op.phone AS order_phone,
      --  op.address AS order_address,
        op.createdAt AS order_createdAt
       -- op.updatedAt AS order_updatedAt

         FROM Product p
left join Category c on c.id = p.categoryId
left join OrderItem oi on oi.productId = p.id
left join OrderPlaced op on oi.orderId = op.id;`;

        // console.log("Result :", result);
        // getting the absolute path
        // const absolutePath = path.join(__dirname, 'storeInfo.csv');
        // console.log(__dirname)
        const tempDir = os.tmpdir();
        globalThis.file_path = path.join(tempDir, 'storeInfo.csv');
        const csvWriter = createObjectCsvWriter({
            path: file_path,
            header: header,
            append: false
        })

        await csvWriter.writeRecords(result)
            .then(() => console.log('CSV file successfully written'))
            .catch((error) => console.error('Error writing CSV file:', error));

        console.log('CSV files have been written.');
        
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

export default exportDataAsCSV;