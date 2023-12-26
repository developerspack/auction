"use client";

import { Suspense } from "react";

import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { FetchCollection } from "@/Hooks/Hooks";
import { columns } from "../columns";

const OpenBids = ({ userId }: { userId: string }) => {
  const { data } = FetchCollection("items", "Open", "bidding");
  const open = data.filter((item: itemProps) => item.userId === userId);

  return (
    <div className="px-4 mt-4">
      <h3 className="font-bold text-lg">Items Open For Bidding</h3>
      <Suspense fallback={<ItemsSkeleton />}>
        <DataTable columns={columns} data={open} filterKey={"Name"} />
      </Suspense>
    </div>
  );
};

export default OpenBids;

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
