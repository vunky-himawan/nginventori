"use client";

import { LayoutDashboard, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavUser } from "./nav-user";
import Image from "next/image";
import Link from "next/link";
import { TMenu, TNavbarMenu } from "@/app/_components/types/navbar-types";
import { usePathname } from "next/navigation";

const NavBarMenus: TNavbarMenu[] = [
  {
    label: "General",
    menus: [
      {
        icon: <LayoutDashboard />,
        label: "Dashboard Superadmin",
        path: "/dashboard/superadmin",
        permissions: [],
      },
      {
        icon: <LayoutDashboard />,
        label: "Dashboard Admin",
        path: "/dashboard/admin",
        permissions: [],
      },
      {
        icon: <Settings />,
        label: "Roles",
        path: "/roles",
        permissions: [],
      },
    ],
  },
];
const checkIsActive = (href: string, item: TMenu, mainNav = false) => {
  return (
    href === item.path ||
    href.split("?")[0] === item.path ||
    (mainNav && href.split("/")[1] !== "" && href.split("/")[1] === item.path.split("/")[1])
  );
};

export function AppSidebar() {
  const pathName = usePathname();

  /* TODO: Add filter menu by user permissions */

  return (
    <Sidebar collapsible="icon" variant="floating" aria-label="Main Sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"}>
              <Image src={"/NGIN.svg"} alt="NGIN" width={40} height={40} className="rounded-lg" />
              <h1 className="text-xl font-bold text-black">Inventory</h1>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {NavBarMenus.map((menu: TNavbarMenu) =>
          menu.label ? (
            <SidebarGroup key={menu.label}>
              <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                {menu.menus.map((menuItem: TMenu) => (
                  <SidebarMenu key={menuItem.label}>
                    <SidebarMenuItem>
                      <Link href={menuItem.path}>
                        <SidebarMenuButton
                          isActive={checkIsActive(pathName, menuItem)}
                          tooltip={menuItem.label}
                          aria-label={menuItem.label}
                          className="data-[active=true]:bg-[#FCF3FA] data-[active=true]:font-semibold"
                        >
                          {menuItem.icon}
                          <span>{menuItem.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  </SidebarMenu>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          ) : (
            <SidebarGroupContent key={menu.label}>
              {menu.menus.map((menuItem: TMenu) => (
                <SidebarMenu key={menuItem.label}>
                  <SidebarMenuItem>
                    <Link href={menuItem.path}>
                      <SidebarMenuButton
                        size={"lg"}
                        aria-label={menuItem.label}
                        isActive={checkIsActive(pathName, menuItem)}
                        className="data-[active=true]:bg-[#FCF3FA] data-[active=true]:font-semibold"
                      >
                        {menuItem.icon}
                        <span>{menuItem.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          ),
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
