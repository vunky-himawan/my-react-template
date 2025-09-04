import { mutationOptions } from "@tanstack/react-query";
import type { TUpdatePermissionSchema } from "../model/types";
import { updatePermission } from "./update";

export const permissionMutations = {
  updatePermission: (opts?: {
    onSuccess?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  }) =>
    mutationOptions({
      mutationKey: ["updatePermission"],
      mutationFn: ({ id, data }: { id: number; data: TUpdatePermissionSchema }) =>
        updatePermission(id, data),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};
