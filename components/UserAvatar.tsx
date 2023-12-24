"use client";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/user";

const UserAvatar = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const LogOut = () => {
    signOut(auth);
    setUser({
      isLoggedIn: false,
      id: "",
      email: "",
      Name: "",
      photo: "",
      createdAt: "",
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isLoggedIn: false,
        id: "",
        email: "",
        Name: "",
        photo: "",
        createdAt: "",
      })
    );
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/u/${user.id}`)}>
          My Profile
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={LogOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
