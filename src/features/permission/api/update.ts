import { PUT } from "@/shared/api/client";
import type { TUpdatePermissionSchema } from "../model/types";

export const updatePermission = async (id: number, data: TUpdatePermissionSchema) => {
  const response = await PUT(`/permissions/${id}`, data);

  return response.data;
};
