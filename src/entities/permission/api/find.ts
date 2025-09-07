import { GET } from "@/shared/api/client";
import type { Permission } from "../model";

export const find = async (id: number): Promise<Permission> => {
  const response = await GET(`/permissions/${id}`);

  const data = response.data.data;

  return data;
};
