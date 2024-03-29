"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ItemCard, ResultCardSkeleton } from "./ItemCard";
import { FetchCollection } from "@/Hooks/Hooks";

export const Item = () => {
  const { data, loading } = FetchCollection("items", "Open", "bidding");
  const currentDate = new Date();

  // Filter the data to get only items that have not expired
  const NonExpiredItems = data.filter((item: itemProps) => {
    const expiryDate = new Date(item.expiryDate);
    return expiryDate > currentDate; // Compare expiryDate with current date
  });

  return (
    <>
      {loading ? (
        <ResultsSkeleton />
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">
            Items we think you will like
          </h2>
          {NonExpiredItems.length === 0 && (
            <div className="text-muted-foreground text-sm">No Items found.</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            {NonExpiredItems.map((result: itemProps) => (
              <ItemCard key={result.id} data={result} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export const ResultsSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-[290px] mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};
