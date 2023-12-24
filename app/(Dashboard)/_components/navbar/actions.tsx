"use client";

import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { ThemeDropDown } from "@/components/theme/ThemeDropDown";
import UserAvatar from "@/components/UserAvatar";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">
          <FiLogOut className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserAvatar />
      <ThemeDropDown />
    </div>
  );
};
