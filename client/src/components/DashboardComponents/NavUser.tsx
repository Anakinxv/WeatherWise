import React, { useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ChevronDown, Settings, User, LogOut } from "@geist-ui/icons";
import { NavLink } from "react-router-dom";
import { useAppStore } from "@/store/useAppStores";
import ViewProfile from "@/components/DashboardComponents/ViewProfile";
import { Button } from "../ui/button";

function NavUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const { isMobile, state } = useSidebar();

  const isCollapsed = state === "collapsed";

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  const userButton = (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
        <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
          {userInitials}
        </AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate text-sm font-medium">
            {user?.name || "Usuario"}
          </span>
          <span className="truncate text-xs font-extralight">
            {user?.email || "usuario@example.com"}
          </span>
        </div>
      )}
      {!isCollapsed && <ChevronDown className="ml-auto size-4 text-gray-400" />}
    </SidebarMenuButton>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>{userButton}</DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent
                className="text-sm"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <p>{"Mi Perfil"}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenuTrigger asChild>{userButton}</DropdownMenuTrigger>
          )}

          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] border-[var(--sidebar-border)] min-w-56 rounded-lg bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] shadow-lg py-2 px-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User Avatar"
                  />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-sm font-medium">
                    {user?.name || "Usuario"}
                  </span>
                  <span className="truncate text-xs font-extralight">
                    {user?.email || "usuario@example.com"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-2 border-t border-[var(--sidebar-border)]" />

            <DropdownMenuGroup className="px-1 flex flex-col gap-1">
              <DropdownMenuItem asChild onSelect={() => setDropdownOpen(false)}>
                <ViewProfile />
              </DropdownMenuItem>
              <DropdownMenuItem asChild onSelect={() => setDropdownOpen(false)}>
                <NavLink
                  to="/dashboard/settings"
                  className="flex w-full justify-start items-center gap-2 px-2 py-1.5 text-sm font-normal text-[var(--sidebar-secondary)] hover:bg-[var(--sidebar-hover-bg)] rounded-md"
                >
                  <Settings className="size-4" />
                  Preferencias
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2 border-t border-[var(--sidebar-border)]" />

            <DropdownMenuItem
              className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
            >
              <LogOut className="size-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavUser;
