"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { ItemCard, ResultCardSkeleton } from "./ItemCard";
import { FetchCollection } from "@/Hooks/Hooks";

export const Item = async () => {
  const { data } = FetchCollection("items", "Open", "bidding");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Items we think you&apos;ll like
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No Items found.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
        {data.map((result: itemProps) => (
          <ItemCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
