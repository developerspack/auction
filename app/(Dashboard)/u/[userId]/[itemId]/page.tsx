import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import AddEditClient from "@/app/(Dashboard)/_components/NewItem/AddEditClient";

interface ItemPageProps {
  params: {
    itemId: string;
  };
}

export async function generateMetadata({ params }: ItemPageProps) {
  let Name = "";
  const docRef = doc(db, "items", params.itemId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const obj = {
      id: params.itemId,
      ...docSnap.data(),
    };
    // @ts-ignore
    Name = obj.Name;
  }

  return {
    title: Name === "" ? "Create Item" : `Edit: ${Name}`,
  };
}

export default function AddEditItem({ params }: ItemPageProps) {
  return <AddEditClient id={params.itemId} />;
}
