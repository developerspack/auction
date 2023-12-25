import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import Modal from "../Modal";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useUserStore } from "@/store/user";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BidModalProps {
  open: boolean;
  setOpen?: (value: boolean) => void;
  id: string;
  name: string;
  startingPrice: number;
  email: string;
  userName: string;
}

// form velidation
const formSchema = z.object({
  bid: z.coerce.number().default(0),
});

const BidModal = ({
  id,
  name,
  startingPrice,
  email,
  open,
  setOpen,
  userName,
}: BidModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {}, [userName]);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: { bid: number }) => {
    if (values.bid < startingPrice) {
      toast(
        `Ksh.${values.bid} is < Ksh.${startingPrice} the Starting Price. Please try again`
      );
    } else {
      setIsLoading(true);
      const notification = toast.loading("Sending Bid...");
      const message = `${user.Name} have bid Ksh.${values.bid} for ${name}`;
      const subject = `A Bid for ${name}`;
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ email, message, subject }),
      });
      try {
        await addDoc(collection(db, "bids"), {
          bid: values.bid,
          userId: user.id,
          ItemId: id,
          createdAt: Timestamp.now().toDate(),
        });
        toast.success("Bid Sent Successfully", {
          id: notification,
        });
      } catch (error) {
        setIsLoading(false);
        toast.error((error as Error).message, {
          id: notification,
        });
      }
      setIsLoading(false);
      setOpen && setOpen(false)!;
    }
  };
  return (
    <Modal setOpen={setOpen} open={open}>
      <DialogHeader>
        <DialogTitle className="line-clamp-1">Bidding for {name}</DialogTitle>
        <DialogDescription>
          After Bidding the Auctioneer will be notified. Click Bid when
          you&apos;re done.
        </DialogDescription>
        <span className="text-blue-500">
          N/B: Bid More than the starting price: Ksh.{startingPrice}
        </span>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            // @ts-ignore
            onSubmit
          )}
        >
          <FormField
            control={form.control}
            name="bid"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-center">Your Bid</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Your Bid"
                    className="col-span-3"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-2">
            <Button type="submit" disabled={isLoading}>
              Bid
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default BidModal;
