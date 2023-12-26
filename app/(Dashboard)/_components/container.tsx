"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useAuctioneerSidebar } from "@/store/use-creator-sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
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

  // useEffect(() => {

  // }, []);

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
