import { queryOptions } from "@tanstack/react-query";
import { findMany } from "./find-many";
import type { TBaseQueryParams } from "@/shared/types/query-params";
import { find } from "./find";

export const permissionQueries = {
  findMany: (params: TBaseQueryParams, options?: { enabled?: boolean }) =>
    queryOptions({
      queryKey: permissionQueryKeys.list(params),
      queryFn: () => findMany(params),
      enabled: options?.enabled,
    }),
  find: (id: number) =>
    queryOptions({
      queryKey: permissionQueryKeys.detail(id),
      queryFn: () => find(id),
    }),
};

export const permissionQueryKeys = {
  all: ["permissions"] as const,
  lists: () => [...permissionQueryKeys.all, "list"] as const,
  list: (params: TBaseQueryParams) => [...permissionQueryKeys.lists(), params] as const,
  details: () => [...permissionQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...permissionQueryKeys.details(), id] as const,
};
