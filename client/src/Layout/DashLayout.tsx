import { Outlet } from "react-router-dom";
import SidebarDash from "@/components/DashboardComponents/SidebarDash";
import {
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import HeaderDash from "@/components/DashboardComponents/HeaderDash";

function DashLayout() {
  return (
    <SidebarProvider>
      <main className="flex h-screen w-full">
        <SidebarDash />

        <SidebarInset className="flex-1">
          <HeaderDash />

          <div className="flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}

export default DashLayout;
