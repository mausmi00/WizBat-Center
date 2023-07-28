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

export function ProductSelect() {
  const params = useParams();
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Products" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col relative">
          <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
            <Link
              key="products"
              href={`/${params.storeId}/products`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary"
              )}
            >
              All Products
            </Link>
          </div>
          <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
            <Link
              key="sizes"
              href={`/${params.storeId}/sizes`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary"
              )}
            >
              Sizes
            </Link>
          </div>
          <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
            <Link
              key="colors"
              href={`/${params.storeId}/colors`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary"
              )}
            >
              Colors
            </Link>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
