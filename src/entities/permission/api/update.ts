import { PATCH } from "@/shared/api/client";
import type { TUpdatePermissionSchema } from "../model/update.schema";

export const updatePermission = async ({
  id,
  data,
}: {
  id: number;
  data: TUpdatePermissionSchema;
}) => {
  const response = await PATCH(`/permissions/${id}`, data);

  return response.data;
};
