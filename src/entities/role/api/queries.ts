import { queryOptions } from "@tanstack/react-query";
import { getRoles } from "./get-roles";

export const roleQueries = {
  paginate: (page: number, limit: number) =>
    queryOptions({
      queryKey: ["roles", { page, limit }],
      queryFn: () => getRoles(page, limit),
    }),
  detail: (id: number) => ["roles", id],
};
