"use client";

import { FetchCollection } from "@/Hooks/Hooks";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "@/components/ItemDetails/Column";

const Bids = ({ id, name }: { id: string; name: string }) => {
  const { data } = FetchCollection("bids", id, "ItemId");
  const SortedData = data.sort(
    (a: bidProps, b: any | number | bigint) => b.bid - a.bid
  );
  return (
    <div className="p-5 mb-10 bg-stone-900/10 dark:bg-stone-50/10 mt-6 rounded-md shadow-xl">
      <h3 className="font-bold text-lg">Bids for {name}</h3>
      <DataTable columns={columns} data={SortedData} filterKey={"userName"} />
    </div>
  );
};

export default Bids;
