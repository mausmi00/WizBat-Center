"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import ApiList from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

const ApiReference = () => {
  const params = useParams();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <Heading title="API" description="Public API URL" />
        <ApiAlert
          title="PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />
        <Separator />
        <Heading title="Placards API" description="API calls for Placards" />
        <ApiList entityName="placards" entityIdName="placardId" />
        <Separator />
        <Heading title="Products API" description="API calls for Products" />
        <ApiList entityName="products" entityIdName="productId" />
        <Separator />
        <Heading title="Categories API" description="API calls for Categories" />
        <ApiList entityName="categories" entityIdName="categoryId" />
        <Separator />
        {/* <Heading title="Sizes API" description="API calls for Sizes" />
        <ApiList entityName="sizes" entityIdName="sizeId" />
        <Separator />
        <Heading title="Colors API" description="API calls for Colors" />
        <ApiList entityName="colors" entityIdName="colorId" />
        <Separator /> */}
      </div>
    </div>
  );
};

export default ApiReference;
