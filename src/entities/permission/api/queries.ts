import type { IPaginateParam } from "@/shared/types/params";
import { queryOptions } from "@tanstack/react-query";
import { findMany } from "./find-many";

export const permissionQueries = {
  findMany: (params: IPaginateParam) =>
    queryOptions({
      queryKey: ["permissions", params],
      queryFn: () => findMany(params),
    }),
};
