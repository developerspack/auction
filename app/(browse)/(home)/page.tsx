import { Suspense } from "react";

import { Item, ResultsSkeleton } from "../_components/Items/Item";

const HomePage = () => {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Item />
      </Suspense>
    </div>
  );
};

export default HomePage;
