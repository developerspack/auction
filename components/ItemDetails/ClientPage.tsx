"use client";

import { FetchDocument } from "@/Hooks/Hooks";
import ItemDetails from "./ItemDetails";

const ClientPage = ({ id }: { id: string }) => {
  const { document } = FetchDocument("items", id);

  return (
    <div className="py-6 mb-20 p-5 lg:mb-10 bg-stone-900/10 dark:bg-stone-50/10 mt-6">
      {/* product card */}
      <div className="mt-6 rounded-lg mb-24 md:mb-12 flex">
        <ItemDetails {...document} />
      </div>
    </div>
  );
};

export default ClientPage;
