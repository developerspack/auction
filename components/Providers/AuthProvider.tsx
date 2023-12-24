"use client";

import { useUserStore } from "@/store/user";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user } = useUserStore();
  useEffect(() => {
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
    //@ts-ignore
    setUser(auth);
    // console.log(user);
    // console.log(auth);
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
