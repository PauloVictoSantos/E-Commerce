"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./colums";
import { DataTable } from "@/components/data-table";
import { ApiList } from "@/components/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/create`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>

      <Separator />
      <DataTable serchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entitiyName="products" entitiyIdName="productId" />
    </>
  );
};
