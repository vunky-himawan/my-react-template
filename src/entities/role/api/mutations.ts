import { mutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { createRole, deleteRole, updateRole } from "./requests";
import type { TCreateOrUpdateRole } from "../model";

export const roleMutations = {
  create: (opts?: { onSuccess?: (data: unknown) => void; onError?: (error: AxiosError) => void }) =>
    mutationOptions({
      mutationFn: async (payload: TCreateOrUpdateRole) => createRole(payload),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
  update: (opts?: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationFn: async ({ id, payload }: { id: number; payload: TCreateOrUpdateRole }) =>
        updateRole(id, payload),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
  delete: (opts?: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationFn: async (id: number) => deleteRole(id),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};
