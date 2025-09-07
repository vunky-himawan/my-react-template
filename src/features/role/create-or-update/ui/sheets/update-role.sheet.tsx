import { permissionQueries } from "@/entities/permission";
import { roleMutations, roleQueries, roleQueryKeys } from "@/entities/role";
import { CreateOrUpdateRoleForm } from "@/features/role/create-or-update/ui/form/form";
import { CreateOrUpdateRoleFormFields } from "@/features/role/create-or-update/ui/form/form-field";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack-query/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { memo, useState, type FC } from "react";

interface Props {
  enabled?: boolean;
  onClose?: () => void;
}

export const UpdateRoleSheetContent: FC<Props> = memo(({ enabled, onClose }) => {
  const { id } = useSearch({ from: "/(admin)/roles/" });

  const { showToast } = useToast();
  const { showError } = useErrorToast();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(setSearch, 300);

  // TODO: add infinite scroll
  const { data, isLoading } = useQuery(
    permissionQueries.findMany(
      {
        limit: 100,
        page: 1,
        search,
      },
      {
        enabled,
      },
    ),
  );

  const { mutate } = useMutation(
    roleMutations.update({
      onSuccess: () => {
        onClose?.();

        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });

        showToast("Role updated successfully", "success");
      },
      onError: showError,
    }),
  );

  const { data: roleDefault } = useQuery(roleQueries.detail(id));

  return (
    <CreateOrUpdateRoleForm
      onSubmit={(data) => mutate({ id, payload: data })}
      defaultValues={{ name: roleDefault?.name, permissions: roleDefault?.permissions }}
    >
      <CreateOrUpdateRoleFormFields
        permissions={data?.data}
        search={search ?? ""}
        onSearchChange={debouncedSearch}
        isLoading={isLoading}
      />
    </CreateOrUpdateRoleForm>
  );
});
