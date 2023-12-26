"use client";

import { Suspense } from "react";

import { FetchCollection } from "@/Hooks/Hooks";
import { ItemCard } from "../../_components/Items/ItemCard";
import { ResultsSkeleton } from "../../_components/Items/Item";

const SearchClient = ({ query }: { query?: string }) => {
  const { data } = FetchCollection("items", "Open", "bidding");

  const FilteredItems = data.filter((item: itemProps) =>
    item.Name.toLowerCase().includes(query!.toLowerCase())
  );

  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <div className="container">
        <h2 className="text-lg font-semibold mb-4">
          Results for term &quot;{query}&quot;
        </h2>
        {FilteredItems.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No results found. Try searching for something else
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
          {FilteredItems.map((result: itemProps) => (
            <ItemCard data={result} key={result.id} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default SearchClient;
