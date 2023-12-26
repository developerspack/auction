"use client";

import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosRemoveCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FetchDocument } from "@/Hooks/Hooks";
import { useUserStore } from "@/store/user";
import { db } from "@/lib/firebase";

interface CellActionProps {
  data: bidProps;
}

const CellActions = ({ data }: CellActionProps) => {
  const { document } = FetchDocument("items", data.ItemId);
  const { user } = useUserStore();

  const HandleRemove = async () => {
    const notification = toast.loading("Removing Bid...");
    try {
      await deleteDoc(doc(db, "bids", data.id));
      toast.success("Bid Removed", {
        id: notification,
      });
    } catch (error) {
      toast.error((error as Error).message, {
        id: notification,
      });
    }
  };
  const HandleAccept = async () => {
    const notification = toast.loading("Accepting Bid...");
    try {
      await updateDoc(doc(db, "items", data.ItemId), {
        BidAccepted: true,
        bidding: "Closed",
      });
      await updateDoc(doc(db, "bids", data.id), {
        BidStatus: "Accepted",
      });
      toast.success("Bid Accepted", {
        id: notification,
      });
    } catch (error) {
      toast.error((error as Error).message, {
        id: notification,
      });
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <FiMoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.id === data.userId && (
          <DropdownMenuItem onClick={() => HandleRemove()}>
            <IoIosRemoveCircle className="h-4 w-4 mr-2 text-red-500" />
            Remove Bid
          </DropdownMenuItem>
        )}
        {user.id === document.userId && (
          <DropdownMenuItem onClick={() => HandleAccept()}>
            <TiTick className="h-4 w-4 mr-2 text-green-500" />
            Accept Bid
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
