import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function OrderSelect() {
  const params = useParams();

  const pathname = usePathname();
  const index = pathname.lastIndexOf("/");
  const lastName = pathname.slice(index + 1);

  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Orders" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col relative">
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "orders" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="orders"
              href={`/${params.storeId}/orders`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              All orders
            </Link>
          </div>
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "drafts" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="drafts"
              href={`/${params.storeId}/orders/drafts`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              In process
            </Link>
          </div>
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "sold" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="Sold"
              href={`/${params.storeId}/orders/sold`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Sold
            </Link>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
