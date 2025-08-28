import { GET } from "@/shared/api/client";

export const getRoles = async (page: number, limit: number) => {
  const response = await GET("/roles", { params: { page, limit } });

  return response.data;
};
