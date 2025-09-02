import { ListPermission, permissionQueries } from "@/entities/permission";
import { useQueryFilters } from "@/features/filter";
import { makePagination } from "@/shared/utils/pagination";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useQuery } from "@tanstack/react-query";

export const PermissionsPage = () => {
  const { pagination, handleChange, search } = useQueryFilters();

  const { isLoading, data } = useQuery(
    permissionQueries.findMany({
      ...makePagination(pagination),
      search,
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
