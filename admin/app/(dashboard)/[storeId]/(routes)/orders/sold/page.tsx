import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "../components/columns";
import { OrderClient } from "../components/order-client";

const SoldPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.orderPlaced.findMany({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrder: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <OrderClient header="Orders Sold" data={formattedOrder} />
      </div>
    </div>
  );
};

export default SoldPage;
