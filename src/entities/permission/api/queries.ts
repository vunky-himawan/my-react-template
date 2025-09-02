import { queryOptions } from "@tanstack/react-query";
import { findMany } from "./find-many";
import type { TBaseQueryParams } from "@/shared/types/query-params";

export const permissionQueries = {
  findMany: (params: TBaseQueryParams) =>
    queryOptions({
      queryKey: ["permissions", params],
      queryFn: () => findMany(params),
    }),
};
