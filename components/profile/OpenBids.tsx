"use client";

import { Suspense } from "react";

import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { FetchCollection } from "@/Hooks/Hooks";
import { columns } from "../columns";

const OpenBids = ({ userId }: { userId: string }) => {
  const { data, loading } = FetchCollection("items", "Open", "bidding");
  const currentDate = new Date();

  // Filter the data to get only items that have not expired
  const NonExpiredItems = data.filter((item: itemProps) => {
    const expiryDate = new Date(item.expiryDate);
    return expiryDate > currentDate; // Compare expiryDate with current date
  });

  const open = NonExpiredItems.filter(
    (item: itemProps) => item.userId === userId
  );

  return (
    <div className="px-4 mt-4">
      {loading ? (
        <ItemsSkeleton />
      ) : (
        <>
          <h3 className="font-bold text-lg">Items Open For Bidding</h3>
          <DataTable columns={columns} data={open} filterKey={"Name"} />
        </>
      )}
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
