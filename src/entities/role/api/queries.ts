import type { TBaseQueryParams } from "@/shared/types/query-params";
import { queryOptions } from "@tanstack/react-query";
import { getRole, getRoles } from "./requests";

export const roleQueries = {
  list: (params: TBaseQueryParams) =>
    queryOptions({
      queryKey: roleQueryKeys.list(params ?? {}),
      queryFn: () => getRoles(params),
    }),
  detail: (id?: number) =>
    queryOptions({
      queryKey: roleQueryKeys.details(id ?? 0),
      queryFn: () => getRole(id!),
      enabled: !!id,
    }),
};

export const roleQueryKeys = {
  all: ["roles"],
  list: (params: TBaseQueryParams) => [...roleQueryKeys.all, params],
  details: (id: number) => [...roleQueryKeys.all, "detail", id],
};
