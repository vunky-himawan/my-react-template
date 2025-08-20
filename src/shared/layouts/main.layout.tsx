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
import { isUrlActive } from "@/shared/utils/url";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, LayoutDashboard, Settings, Users } from "lucide-react";
import type { FC, PropsWithChildren, ReactNode } from "react";

type TMenuItem = {
  label: string;
  icon: ReactNode;
  to?: string;
  children?: TMenuItem[];
};

const menuItems: TMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    to: "/dashboard",
  },
  {
    label: "Users",
    icon: <Users />,
    children: [
      {
        label: "User List",
        icon: <Users />,
        to: "/users/list",
      },
      {
        label: "User Settings",
        icon: <Settings />,
        to: "/users/settings",
      },
    ],
  },
];

const checkIsActive = (href: string, item: TMenuItem, mainNav = false) => {
  if (!item.to) return false;
  return isUrlActive(href, item.to, mainNav);
};

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
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
                                  <Link to={child.to}>
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
                    <Link to={item.to}>
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
      {children}
    </SidebarProvider>
  );
};
