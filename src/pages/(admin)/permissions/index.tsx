import { permissionQueries } from "@/entities/permission/api/queries";
import { ListPermission } from "@/entities/permission/ui/list-permission";
import { useQueryFilters } from "@/features/filter/model/use-query-filters";
import { makePagination } from "@/shared/utils/pagination";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useQuery } from "@tanstack/react-query";

export const PermissionsPage = () => {
  const { pagination, handleChange, search } = useQueryFilters();

  const { isLoading, data } = useQuery(
    permissionQueries.findMany({
      ...makePagination(pagination),
    }),
  );

  return (
    <AdminPage
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        {
          label: "Permissions",
          path: "/permissions",
        },
      ]}
      title="Permissions Management Page"
      description="This page allows admin to manage permissions."
    >
      <ListPermission
        data={data}
        isLoading={isLoading}
        handleChange={handleChange}
        search={search}
      />
    </AdminPage>
  );
};
