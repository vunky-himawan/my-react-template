import type { FileRoutesByFullPath } from "@/app/routeTree.gen";
import type { FileRoutesByPath } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type TMenuItem = {
  label: string;
  icon: ReactNode;
  to?:
    | FileRoutesByFullPath[keyof FileRoutesByFullPath]["fullPath"]
    | FileRoutesByPath[keyof FileRoutesByPath]["path"];
  children?: TMenuItem[];
};
