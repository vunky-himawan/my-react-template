import {
  permissionQueries,
  permissionQueryKeys,
  updatePermission,
  UpdatePermissionFormField,
  UpdatePermissionSchema,
  type TUpdatePermissionSchema,
} from "@/entities/permission";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack-query/client";
import { DynamicForm } from "@/shared/ui/form/dynamic-form";
import { AdminPageContainer } from "@/widgets/admin/ui/container";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi("/(admin)/permissions/$permissionId/update/");

const UpdatePermissionPage = () => {
  const { permissionId } = route.useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data, isLoading } = useQuery(permissionQueries.find(permissionId));

  const { mutate } = useMutation({
    mutationFn: updatePermission,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: permissionQueryKeys.all });
      await navigate({ to: "/permissions" });
      showToast("Update permission successfully.", "success");
    },
    onError: () => {
      showToast("Error updating permission", "error");
    },
  });

  const handleSubmit = (data: TUpdatePermissionSchema) => {
    delete data.name;
    mutate({ data, id: permissionId });
  };

  return (
    <AdminPageContainer
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
    </AdminPageContainer>
  );
};

export default UpdatePermissionPage;
