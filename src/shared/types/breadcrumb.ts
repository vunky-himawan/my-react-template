import type { FileRoutesByFullPath } from "@/app/routeTree.gen";
import type { FileRoutesByPath } from "@tanstack/react-router";

export type TBreadcrumbItem = {
  label: string;
  path:
    | FileRoutesByFullPath[keyof FileRoutesByFullPath]["fullPath"]
    | FileRoutesByPath[keyof FileRoutesByPath]["path"];
};
