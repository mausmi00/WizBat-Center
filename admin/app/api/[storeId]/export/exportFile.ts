// Assuming you have already set up Prisma and imported the necessary modules

import prismadb from "@/lib/prismadb";

import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

async function exportDataAsCSV() {
    try {

        const billboards = await prismadb.billboard.findMany();

        const billboardHeader = [
            { id: "id", title: "Billboard id" },
            { id: "storeId", title: "Store id" },
            { id: "label", title: "Billboard label" },
            { id: "imageUrl", title: "Billboard imageURL" },
            { id: "createdAt", title: "Billboard createdAt" },
            { id: "updatedAt", title: "Billboard updatedAt" },
        ]
        const categoryHeader = [
            { id: "id", title: "CategoryId" },
            { id: "name", title: "Category Name" },
            { id: "createdAt", title: "Category createdAt" },
            { id: "updatedAt", title: "Category updatedAt" },
        ]
        const checkoutHeader = [
            { id: "id", title: " Checkout id" },
            { id: "storeId", title: "Checkout storeId" },
            { id: "isPaid", title: "Checkout status" },
            { id: "phone", title: "Checkout user phone" },
            { id: "address", title: "Checkout user address" },
            { id: "createdAt", title: "Checkout createdAt" },
            { id: "updatedAt", title: "Checkout updatedAt" },
        ]
        const colorHeader = [
            { id: "id", title: "Colors id" },
            { id: "storeId", title: "Colors StoreId" },
            { id: "name", title: "Color Name" },
            { id: "value", title: "Color hex value" },
            { id: "createdAt", title: "Color createdAt" },
            { id: "updatedAt", title: "Color updatedAt" },
        ]
        const sizeHeader = [
            { id: "id", title: "Size id" },
            { id: "storeId", title: "Size StoreId" },
            { id: "name", title: "Size Name" },
            { id: "value", title: "Size value" },
            { id: "createdAt", title: "Size createdAt" },
            { id: "updatedAt", title: "Size updatedAt" },
        ]
        const storeHeader = [
            { id: "id", title: "Store id" },
            { id: "name", title: "Store name" },
            { id: "userId", title: "Store Owner" },
            { id: "createdAt", title: "Store createdAt" },
            { id: "updatedAt", title: "Store updatedAt" },
        ]

        // Billboard
        let csvWriter = createObjectCsvWriter({
            path: "./data/billboard.csv",
            header: billboardHeader,
            append: false
        })

        await csvWriter.writeRecords(billboards);

        //Categories
        const categories = await prismadb.category.findMany();
        csvWriter = createObjectCsvWriter({
            path: "./data/category.csv",
            header: categoryHeader,
            append: false
        })

        await csvWriter.writeRecords(categories);


        //Checkout
        const checkout = await prismadb.order.findMany();
        csvWriter = createObjectCsvWriter({
            path: "./data/checkout.csv",
            header: checkoutHeader,
            append: false
        })
        await csvWriter.writeRecords(checkout);

        //Colors
        const colors = await prismadb.color.findMany();
        csvWriter = createObjectCsvWriter({
            path: "./data/color.csv",
            header: colorHeader,
            append: false
        })
        await csvWriter.writeRecords(colors);


        //Size
        const sizes = await prismadb.size.findMany();
        csvWriter = createObjectCsvWriter({
            path: "./data/size.csv",
            header: sizeHeader,
            append: false
        })
        await csvWriter.writeRecords(sizes);

        //Stores
        const stores = await prismadb.store.findMany();
        csvWriter = createObjectCsvWriter({
            path: "./data/store.csv",
            header: storeHeader,
            append: false
        })
        await csvWriter.writeRecords(stores);

        console.log('CSV files have been written.');

        // Step 4: Send CSV file to client (Not shown here, you'll need to implement the server response and client-side handling)
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

export default exportDataAsCSV;