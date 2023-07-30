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

export function ProductSelect() {
  const params = useParams();
  const pathname = usePathname();
  const index = pathname.lastIndexOf('/');
  const lastName = pathname.slice(index + 1);

  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Products" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col relative">
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "products" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="products"
              href={`/${params.storeId}/products`}
              className="text-sm font-medium transition-colors hover:text-primary"
              
            >
              All Products
            </Link>
          </div>
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "categories" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="categories"
              href={`/${params.storeId}/categories`}
              className="text-sm font-medium transition-colors hover:text-primary"
             
            >
              Categories
            </Link>
          </div>
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "sizes" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="sizes"
              href={`/${params.storeId}/sizes`}
              className="text-sm font-medium transition-colors hover:text-primary"
             
            >
              Sizes
            </Link>
          </div>
          <div
            className={cn(
              "hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm",
              lastName === "colors" ? "bg-[#0c2632] w-full" : null
            )}
          >
            <Link
              key="colors"
              href={`/${params.storeId}/colors`}
              className="text-sm font-medium transition-colors hover:text-primary"
              
            >
              Colors
            </Link>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
