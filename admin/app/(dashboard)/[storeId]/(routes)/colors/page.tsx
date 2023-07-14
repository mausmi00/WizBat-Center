import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ColorsClient } from "./components/color-client";
import { ColorsColumn } from "./components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: ColorsColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <ColorsClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default ColorsPage;
