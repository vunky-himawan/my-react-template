import { mutationOptions } from "@tanstack/react-query";
import type { TUpdatePermissionSchema } from "../model/types";
import { updatePermission } from "./update";

export const mutations = {
  updatePermission: () =>
    mutationOptions({
      mutationKey: ["updatePermission"],
      mutationFn: ({ id, data }: { id: number; data: TUpdatePermissionSchema }) =>
        updatePermission(id, data),
    }),
};
