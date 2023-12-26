"use client";

import { Suspense } from "react";

import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./Columns";
import { FetchCollection } from "@/Hooks/Hooks";
import { useUserStore } from "@/store/user";
import Heading from "@/components/heading";

const ItemsClient = () => {
  const { user } = useUserStore();

  const { data } = FetchCollection("items", user.id, "userId");

  return (
    <div className="px-4">
      <div className="flex items-center justify-between pb-8">
        <Heading title={"View Items"} description={"View and Edit Items"} />
      </div>

      <Suspense fallback={<ItemsSkeleton />}>
        <DataTable columns={columns} data={data} filterKey={"Name"} />
      </Suspense>
    </div>
  );
};

export default ItemsClient;

const ItemsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
    </div>
  );
};
