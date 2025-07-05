import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Home, Search, Star, Clock } from "@geist-ui/icons";

import { NavLink } from "react-router-dom";
import NavUser from "./NavUser";
import { motion } from "framer-motion";
import logo from "@/assets/lgo.png";

function SidebarDash() {
  const { state } = useSidebar();

  const data = {
    items: [
      {
        label: "Inicio",
        icon: Home,
        link: "/dashboard",
      },
      {
        label: "Buscar",
        icon: Search,
        link: "/dashboard/search",
      },
      {
        label: "Favoritos",
        icon: Star,
        link: "/dashboard/favorites",
      },
      {
        label: "Historial",
        icon: Clock,
        link: "/dashboard/history",
      },
    ],
  };

  const isCollapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <Sidebar
        className="h-full bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] flex flex-col justify-between transition-all duration-300"
        collapsible="icon"
      >
        {/* Header */}
        <SidebarHeader
          className={`flex items-center justify-center transition-all duration-300 ${
            isCollapsed ? "p-2" : "p-8"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <img
              src={logo}
              alt="Logo"
              className={`object-contain drop-shadow-sm transition-all duration-300 ${
                isCollapsed ? "w-20 h-12" : "w-32 h-28"
              }`}
            />
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="h-1 w-16 bg-gradient-to-r from-primary/30 to-primary/60 rounded-full"
              />
            )}
          </div>
        </SidebarHeader>

        {/* Sidebar Menu */}
        <SidebarGroup
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "px-1 py-0" : "px-4"
          }`}
        >
          <SidebarGroupContent className="py-6">
            <SidebarMenu className="space-y-2">
              {data.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <NavLink to={item.link} end={item.link === "/dashboard"}>
                    {({ isActive }: { isActive: boolean }) => (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className={`flex items-center rounded-lg transition-all duration-300 cursor-pointer
                              ${
                                isCollapsed
                                  ? "gap-0 px-2 py-3 justify-center w-10 h-10"
                                  : "gap-3 px-4 py-3"
                              }
                              ${
                                isActive
                                  ? "bg-[#3b82f6] text-[var(--sidebar-bg)]"
                                  : "text-[var(--sidebar-secondary)] hover:bg-[var(--sidebar-hover-bg)]"
                              }
                            `}
                          >
                            <item.icon
                              className={`cursor-pointer flex-shrink-0 transition-all duration-300
                              ${isCollapsed ? "w-4 h-4" : "w-5 h-5"}
                              ${isActive ? "stroke-2" : "stroke-1"}`}
                            />
                            {/* Texto que se oculta cuando está colapsado */}
                            <span
                              className={`cursor-pointer text-sm transition-all duration-300 whitespace-nowrap
                              ${isActive ? "font-semibold" : "font-normal"}
                              ${
                                isCollapsed
                                  ? "opacity-0 w-0 overflow-hidden"
                                  : "opacity-100"
                              }`}
                            >
                              {item.label}
                            </span>
                          </motion.div>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right" sideOffset={10}>
                            {item.label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <SidebarFooter
          className={`flex flex-col gap-3 transition-all duration-300 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <NavUser />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}

export default SidebarDash;
