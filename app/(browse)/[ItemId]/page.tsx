import { doc, getDoc } from "firebase/firestore";

import ClientPage from "@/components/ItemDetails/ClientPage";
import { db } from "@/lib/firebase";

export async function generateMetadata({
  params,
}: {
  params: {
    ItemId: string;
  };
}) {
  let Name = "";
  const docRef = doc(db, "items", params.ItemId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const obj = {
      id: params.ItemId,
      ...docSnap.data(),
    };
    // @ts-ignore
    Name = obj.Name;
  }

  return {
    title: Name,
  };
}

const ItemPage = ({
  params,
}: {
  params: {
    ItemId: string;
  };
}) => {
  return (
    <div className="container">
      <ClientPage id={params.ItemId} />
    </div>
  );
};

export default ItemPage;
