import type { TMenuItem } from "@/shared/types/menu";
import { Settings, UserLock } from "lucide-react";

export const ADMIN_MENU_ITEMS: TMenuItem[] = [
  {
    label: "Dashboard",
    icon: <Settings />,
    to: "/dashboard",
  },
  {
    label: "Permissions",
    icon: <UserLock />,
    to: "/permissions",
  },
  {
    label: "Roles",
    icon: <Settings />,
    to: "/roles",
  },
];
