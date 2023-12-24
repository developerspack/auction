"use client";

import { Suspense } from "react";

import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./Columns";
import { FetchCollection } from "@/Hooks/Hooks";
import { useUserStore } from "@/store/user";

const ItemsClient = () => {
  const { user } = useUserStore();

  const { data } = FetchCollection("items", user.id, true, "userId");

  return (
    <div className="h-full w-full">
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
