"use client";

import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { RiProductHuntFill, RiProductHuntLine } from "react-icons/ri";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const routes = [
    {
      label: "Profile",
      href: `/u/${session?.user?.id}`,
      icon: CgProfile,
      active: FaUserCircle,
    },
    {
      label: "Create Item",
      href: `/u/${session?.user?.id}/new`,
      icon: MdOutlineCreateNewFolder,
      active: MdCreateNewFolder,
    },
    {
      label: "View Item",
      href: `/u/${session?.user?.id}/viewItems`,
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
