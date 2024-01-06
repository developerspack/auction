"use client";

import { useState } from "react";
import { SiMinutemailer } from "react-icons/si";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosRemoveCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
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
import EmailModal from "../profile/EmailModal";

interface CellActionProps {
  data: bidProps;
}

const CellActions = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState(false);
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
        expiryDate: Timestamp.now().toDate().toString(),
      });
      await updateDoc(doc(db, "bids", data.id), {
        BidStatus: "Accepted",
      });

      const message = `${user.Name} have Accepted you bid for ${document.Name}`;
      const subject = `Accepting Bid for ${document.Name}`;
      const email = data.userEmail;
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ email, message, subject }),
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
    <>
      <EmailModal
        setOpen={setOpen}
        open={open}
        email={data.userEmail}
        userName={data.userName}
      />
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
            <>
              <DropdownMenuItem onClick={() => HandleAccept()}>
                <TiTick className="h-4 w-4 mr-2 text-green-500" />
                Accept Bid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <SiMinutemailer className="h-4 w-4 mr-2 text-blue-500" />
                Email {data.userName}
              </DropdownMenuItem>
            </>
          )}
          {user.id !== document.userId && user.id !== data.userId && (
            <DropdownMenuItem>No Actions Available</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
