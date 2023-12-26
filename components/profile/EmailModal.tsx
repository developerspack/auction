"use client";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Modal from "../Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EmailModalProps {
  open: boolean;
  setOpen?: (value: boolean) => void;
  userName: string;
  email: string;
}
const formSchema = z.object({
  subject: z.string().min(1),
  message: z.string().min(1),
});

const EmailModal = ({ email, userName, open, setOpen }: EmailModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: { message: string; subject: string }) => {
    setIsLoading(true);
    const notification = toast.loading("Sending email...");
    try {
      const message = values.message;
      const subject = values.subject;
      if (email) {
        await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify({ email, message, subject }),
        });
      }
      toast.success("Email Sent", {
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
  };

  return (
    <Modal setOpen={setOpen} open={open}>
      <DialogHeader>
        <DialogTitle className="line-clamp-1">
          Send Email to {userName}
        </DialogTitle>
      </DialogHeader>
      <div className="z-10">
        <Form {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(
              // @ts-ignore
              onSubmit
            )}
          >
            <div className="mb-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-6">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your Message" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primaryGreen hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            >
              Send Mail
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EmailModal;
