import type { ErrorResponse } from "@/app/error/types";
import { GET } from "@/shared/api/client";
import type { IPaginateParam } from "@/shared/types/params";
import { type AxiosResponse } from "axios";

export const findMany = async (params: IPaginateParam): Promise<AxiosResponse | ErrorResponse> => {
  const response = await GET("/permissions", { params });

  return response.data;
};
