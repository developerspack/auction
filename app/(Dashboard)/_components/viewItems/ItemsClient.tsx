"use client";

import { Suspense } from "react";
import { useSession } from "next-auth/react";

import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./Columns";
import { FetchCollection } from "@/Hooks/Hooks";

const ItemsClient = () => {
  const { data: session } = useSession();
  const { data } = FetchCollection("items", session?.user.id!, true, "userId");

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
