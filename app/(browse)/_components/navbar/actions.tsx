"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { MdDashboard } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { ThemeDropDown } from "@/components/theme/ThemeDropDown";
import UserAvatar from "@/components/UserAvatar";
import { Hint } from "@/components/hint";

export const Actions = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!session && (
        <Button size="sm" variant="primary" onClick={() => signIn("google")}>
          Login
        </Button>
      )}
      {session && (
        <div className="flex items-center gap-x-4">
          <Hint label="Auctioneer's Dashboard">
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
              asChild
            >
              <Link href={`/u/${session.user.id}`}>
                <MdDashboard className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </Button>
          </Hint>
          <UserAvatar />
        </div>
      )}
      <ThemeDropDown />
    </div>
  );
};
