import { GET } from "@/shared/api/client";
import type { Permission } from "../model";
import type { TSource } from "@/shared/types/pagination";
import { makeSource } from "@/shared/utils/pagination";
import type { TBaseQueryParams } from "@/shared/types/query-params";

export const findMany = async (params: TBaseQueryParams): Promise<TSource<Permission[]>> => {
  const response = await GET("/permissions", { params });

  const data = response.data;

  return makeSource<Permission[]>(data);
};
