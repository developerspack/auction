"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  setOpen?: (value: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, setOpen, open }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Set the initial state on the client side
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
