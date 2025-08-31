import { SidebarProvider } from "@/app/providers/sidebar.provider";
import { SidebarWidget } from "@/widgets/sidebar";
import type { FC, PropsWithChildren } from "react";
import { ADMIN_MENU_ITEMS } from "../constants/menu/admin";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarWidget
        menuItems={ADMIN_MENU_ITEMS}
        header={<h1 className="text-lg font-bold">Admin Panel</h1>}
      />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};
