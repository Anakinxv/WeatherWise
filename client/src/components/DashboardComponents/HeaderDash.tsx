import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeButton from "@/components/commonComponents.tsx/ThemeButton";

function HeaderDash() {
  const [section, setSection] = useState("");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full">
        <Breadcrumb className="text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <SidebarTrigger className="text-muted-foreground hover:text-foreground"></SidebarTrigger>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="mx-2">|</BreadcrumbSeparator>

            <BreadcrumbPage>Dashboard</BreadcrumbPage>
            <BreadcrumbSeparator className="mx-2"></BreadcrumbSeparator>

            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-foreground">
                    {section || "Inicio"}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="w-48 flex flex-col space-y-1 rounded-lg bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] shadow-lg py-2 px-2"
                >
                  {[
                    { to: "/dashboard", label: "Inicio" },
                    { to: "/dashboard/search", label: "Buscar" },
                    { to: "/dashboard/favorites", label: "Favoritos" },
                    { to: "/dashboard/history", label: "Historial" },
                  ].map((item) => (
                    <NavLink
                      onClick={() => setSection(item.label)}
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-2 text-sm font-normal text-[var(--sidebar-secondary)] hover:bg-[var(--sidebar-hover-bg)] px-2 py-1 rounded-md"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            <BreadcrumbItem></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ThemeButton></ThemeButton>
      </div>
    </header>
  );
}

export default HeaderDash;
