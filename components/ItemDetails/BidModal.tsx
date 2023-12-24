import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

interface BidModalProps {
  open: boolean;
  setOpen?: (value: boolean) => void;
  id: string;
  name: string;
  startingPrice: number;
}

// form velidation
const formSchema = z.object({
  bid: z.number().default(0),
});

const BidModal = ({
  id,
  name,
  startingPrice,
  open,
  setOpen,
}: BidModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Modal setOpen={setOpen} open={open}>
      <DialogHeader>
        <DialogTitle className="line-clamp-1">Bidding for {name}</DialogTitle>
        <DialogDescription>
          After Bidding the Auctioneer will be notified. Click Bid when you're
          done.
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
