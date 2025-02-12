"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useGetAuthMe } from "@/hooks/data/use-get-auth-me";
import { useAuth, useUser } from "@clerk/nextjs";
import { getNameInitials } from "@/utils/get-initial-name";
import { toast } from "../ui/toast/main";
import { useLogout } from "@/hooks/data/use-logout";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { data } = useGetAuthMe();

  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    const results = await Promise.allSettled([signOut(), logout()]);

    const failed = results.filter((result) => result.status === "rejected");

    if (failed.length > 0) {
      toast({
        title: "Failed to logout completely, please try again",
        type: "error",
      });
      return;
    }

    toast({
      title: "Logged out successfully",
      type: "success",
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={data?.profilePicture || user?.imageUrl || undefined} />
                <AvatarFallback className="rounded-lg">
                  {getNameInitials(data?.name || user?.fullName || undefined)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data?.name || user?.fullName}</span>
                <span className="truncate text-xs">
                  {data?.email || user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data?.profilePicture || user?.imageUrl || undefined} />
                  <AvatarFallback className="rounded-lg">
                    {getNameInitials(data?.name || user?.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data?.name || user?.fullName}</span>
                  <span className="truncate text-xs">
                    {data?.email || user?.emailAddresses[0]?.emailAddress}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings/account">
                  <BadgeCheck />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile">
                  <User />
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
