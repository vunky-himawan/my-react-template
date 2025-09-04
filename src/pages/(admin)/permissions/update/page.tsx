import { permissionQueries } from "@/entities/permission";
import { permissionQueryKeys } from "@/entities/permission/api";
import { permissionMutations } from "@/features/permission/api/mutations";
import {
  UpdatePermissionSchema,
  type TUpdatePermissionSchema,
} from "@/features/permission/model/types";
import { UpdatePermissionFormField } from "@/features/permission/ui/form";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack-query/client";
import { DynamicForm } from "@/shared/ui/form/dynamic-form";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi("/(admin)/permissions/$permissionId/update/");

const UpdatePermissionPage = () => {
  const { permissionId } = route.useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data, isLoading } = useQuery(permissionQueries.find(permissionId));

  const { mutate } = useMutation(
    permissionMutations.updatePermission({
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: permissionQueryKeys.all });

        showToast("success", "Update permission successfully.");
        navigate({ to: "/permissions" });
      },
      onError() {
        showToast("error", "Error updating permission");
      },
    }),
  );

  const handleSubmit = (data: TUpdatePermissionSchema) => {
    delete data.name;
    mutate({ data, id: permissionId });
  };

  return (
    <AdminPage
      title="Update Permission"
      description="Update permission"
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Permissions", path: "/permissions" },
        { label: "Update permission", path: `/permissions/$permissionId/update` },
      ]}
      isLoading={isLoading}
    >
      <DynamicForm
        formSchema={UpdatePermissionSchema}
        onSubmit={handleSubmit}
        defaultValues={{ description: data?.description, name: data?.name }}
      >
        <UpdatePermissionFormField />
      </DynamicForm>
    </AdminPage>
  );
};

export default UpdatePermissionPage;
