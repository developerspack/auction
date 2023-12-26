"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { useAuctioneerSidebar } from "@/store/use-creator-sidebar";
import { useUserStore } from "@/store/user";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { user } = useUserStore();

  const router = useRouter();
  const { collapsed, onCollapse, onExpand } = useAuctioneerSidebar(
    (state) => state
  );
  const matches = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let auth = localStorage.getItem("auth");
      auth = auth
        ? JSON.parse(auth)
        : {
            isLoggedIn: false,
            id: "",
            email: "",
            Name: "",
            photo: "",
            createdAt: "",
          };
      // @ts-ignore
      if (!auth?.isLoggedIn) {
        router.push("/");
        toast.error("Sign In To Access The Page");
      }
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div
      className={cn(
        "flex-1 mt-24",
        collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
      )}
    >
      {children}
    </div>
  );
};
