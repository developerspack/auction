"use client";

import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiProductHuntFill, RiProductHuntLine } from "react-icons/ri";

import { NavItem, NavItemSkeleton } from "./nav-item";
import { useUserStore } from "@/store/user";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUserStore();

  const routes = [
    {
      label: "Profile",
      href: `/u/${user?.id}`,
      icon: CgProfile,
      active: FaUserCircle,
    },
    {
      label: "Create Item",
      href: `/u/${user?.id}/new`,
      icon: MdOutlineCreateNewFolder,
      active: MdCreateNewFolder,
    },
    {
      label: "View Item",
      href: `/u/${user?.id}/viewItems`,
      icon: RiProductHuntLine,
      active: RiProductHuntFill,
    },
  ];

  // if (!user?.id) {
  //   return (
  //     <ul className="space-y-2">
  //       {[...Array(4)].map((_, i) => (
  //         <NavItemSkeleton key={i} />
  //       ))}
  //     </ul>
  //   );
  // }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
