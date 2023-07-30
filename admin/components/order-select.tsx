import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export function OrderSelect() {
  const params = useParams();
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Orders" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col relative">
          <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
            <Link
              key="orders"
              href={`/${params.storeId}/orders`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary"
              )}
            >
              All orders
            </Link>
          </div>
          <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
            <Link
              key="drafts"
              href={`/${params.storeId}/orders/drafts`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary"
              )}
            >
              In process
            </Link>
          </div>
          <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
            <Link
              key="Sold"
              href={`/${params.storeId}/orders/sold`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary"
              )}
            >
              Sold
            </Link>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
