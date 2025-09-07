import { permissionQueries } from "@/entities/permission";
import { roleMutations, roleQueryKeys } from "@/entities/role";
import { CreateOrUpdateRoleForm } from "@/features/role/create-or-update/ui/form/form";
import { CreateOrUpdateRoleFormFields } from "@/features/role/create-or-update/ui/form/form-field";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack-query/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useState, type FC } from "react";

interface Props {
  enabled?: boolean;
  onClose?: () => void;
}

export const CreateRoleSheetContent: FC<Props> = memo(({ enabled, onClose }) => {
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
    roleMutations.create({
      onSuccess: () => {
        onClose?.();

        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });

        showToast("Role created successfully", "success");
      },
      onError: showError,
    }),
  );

  return (
    <CreateOrUpdateRoleForm onSubmit={mutate} defaultValues={{ name: "", permissions: [] }}>
      <CreateOrUpdateRoleFormFields
        permissions={data?.data}
        search={search ?? ""}
        onSearchChange={debouncedSearch}
        isLoading={isLoading}
      />
    </CreateOrUpdateRoleForm>
  );
});
