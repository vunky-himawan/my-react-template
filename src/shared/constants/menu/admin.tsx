import type { TMenuItem } from "@/shared/types/menu";
import { Settings } from "lucide-react";

export const menuItems: TMenuItem[] = [
  {
    label: "Dashboard",
    icon: <Settings />,
    to: "/dashboard",
  },
  {
    label: "Roles",
    icon: <Settings />,
    to: "/roles",
  },
];
