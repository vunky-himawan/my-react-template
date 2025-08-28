import { SidebarProvider } from "@/app/providers/sidebar.provider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/shared/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { menuItems } from "../constants/menu/admin";
import { checkIsActive } from "../helpers/menu";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathName = useLocation().pathname;

  return (
    <SidebarProvider>
      <Sidebar variant="floating">
        <SidebarHeader>
          <h1 className="text-lg font-semibold">Authenticated Layout</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              if (item.children?.length) {
                return (
                  <SidebarMenuItem key={item.label}>
                    <Collapsible className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {item.icon}
                            {item.label}
                            <ChevronDown className="ml-auto" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.label}>
                                <SidebarMenuButton
                                  asChild
                                  isActive={checkIsActive(pathName, child)}
                                >
                                  <Link to={child.to?.toString()}>
                                    {child.icon}
                                    {child.label}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={checkIsActive(pathName, item)}>
                    <Link to={item.to?.toString()}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="w-full p-2">{children}</div>
    </SidebarProvider>
  );
};
