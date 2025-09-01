import { GET } from "@/shared/api/client";
import type { IPaginateParam } from "@/shared/types/params";
import type { Permission } from "../model";
import type { TSource } from "@/shared/types/pagination";
import { makeSource } from "@/shared/utils/pagination";

export const findMany = async (params: IPaginateParam): Promise<TSource<Permission[]>> => {
  const response = await GET("/permissions", { params });

  const data = response.data;

  return makeSource<Permission[]>(data);
};
