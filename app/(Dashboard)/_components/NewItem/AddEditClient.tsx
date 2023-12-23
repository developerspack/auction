"use client";

import { FetchDocument } from "@/Hooks/Hooks";
import AddEditForm from "./AddEditForm";

interface AddEditClientProps {
  id: string;
}

const AddEditClient = ({ id }: AddEditClientProps) => {
  const { document } = FetchDocument("items", id);

  return <AddEditForm initialData={document} id={id} />;
};

export default AddEditClient;
