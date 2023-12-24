"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const UserAvatar = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const LogOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session && (
          <Button variant="outline" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={session.user.image!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/u/${session?.user.id}`)}>
          My Profile
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={LogOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
