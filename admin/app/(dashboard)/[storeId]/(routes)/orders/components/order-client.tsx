"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  header: string;
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data, header }) => {
  return (
    <>
      <Heading
        title={`${header} (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};
