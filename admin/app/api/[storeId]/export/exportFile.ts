// Assuming you have already set up Prisma and imported the necessary modules

import prismadb from "@/lib/prismadb";

import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

async function exportDataAsCSV() {
    try {
        // Step 1: Fetch data using Prisma
        const billboards = await prismadb.billboard.findMany();

        // // Step 2: Convert data to CSV format
        const csvWriter = createObjectCsvWriter({
            path: "output.csv",
            header: [
                { id: "id", title: "BillboardId" },
                { id: "storeId", title: "StoreId" },
                { id: "label", title: "Billboard label" },
                { id: "imageUrl", title: "Billboard imageURL" },
                { id: "createdAt", title: "Billboard createdAt" },
                { id: "updatedAt", title: "UpdatedAt" },
                { id: "id", title: "CategoryId" },
                { id: "name", title: "Category Name" },
                { id: "createdAt", title: "Category createdAt" },
                { id: "updatedAt", title: "Category updatedAt" },
            ]
        });
        await csvWriter.writeRecords(billboards);

        const categories = await prismadb.category.findMany();
        console.log("categories: ", billboards);
        await csvWriter.writeRecords(categories);
        const checkoutPaid = await prismadb.order.findMany({
            where: {
                isPaid: true
            }
        });
        const checkoutNotPaid = await prismadb.order.findMany({
            where: {
                isPaid: false
            }
        });
        const colors = await prismadb.color.findMany();
        const sizes = await prismadb.size.findMany();
        const stores = await prismadb.store.findMany();
        console.log(categories);
        // const combinedData = [];
        // combinedData.push(billboards);
        // combinedData.push(categories);
        // combinedData.push(checkoutPaid);
        // combinedData.push(checkoutNotPaid);
        // combinedData.push(colors);
        // combinedData.push(sizes);
        // combinedData.push(stores);
        // console.log("combined data: ", combinedData)

        // Step 3: Create CSV file

        console.log('CSV file has been written.');

        // Step 4: Send CSV file to client (Not shown here, you'll need to implement the server response and client-side handling)
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

export default exportDataAsCSV;