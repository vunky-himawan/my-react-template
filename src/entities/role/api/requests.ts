import { DELETE, GET, POST, PUT } from "@/shared/api/client";
import type { TSource } from "@/shared/types/pagination";
import type { TBaseQueryParams } from "@/shared/types/query-params";
import { makeSource } from "@/shared/utils/pagination";
import type { Role, TCreateOrUpdateRole } from "../model";

export const createRole = async (payload: TCreateOrUpdateRole) => {
  const response = await POST("/roles", payload);

  return response.data.data;
};

export const getRoles = async (params: TBaseQueryParams): Promise<TSource<Role[]>> => {
  const response = await GET("/roles", { params });

  const data = response.data;

  return makeSource(data);
};

export const getRole = async (id: number) => {
  const response = await GET(`/roles/${id}`);

  return response.data.data;
};

export const deleteRole = async (id: number) => {
  const response = await DELETE(`/roles/${id}`);

  return response.data;
};

export const updateRole = async (id: number, payload: TCreateOrUpdateRole) => {
  const response = await PUT(`/roles/${id}`, payload);

  return response.data.data;
};
