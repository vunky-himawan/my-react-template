import {
  ListPermission,
  PermissionDetail,
  PermissionProvider,
  permissionQueries,
} from "@/entities/permission";
import { useQueryFilters } from "@/features/filter";
import { Sheet } from "@/shared/ui/sheet";
import { makePagination } from "@/shared/utils/pagination";
import { AdminPageContainer } from "@/widgets/admin/ui/container";
import { useQuery } from "@tanstack/react-query";

export const PermissionsPage = () => {
  const { pagination, handleChange, search } = useQueryFilters();

  const { isLoading, data } = useQuery(
    permissionQueries.findMany(
      {
        ...makePagination(pagination),
        search,
      },
      { enabled: true },
    ),
  );

  return (
    <PermissionProvider>
      <AdminPageContainer
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
        <Sheet>
          <ListPermission
            data={data}
            isLoading={isLoading}
            handleChange={handleChange}
            search={search}
          />
          <PermissionDetail />
        </Sheet>
      </AdminPageContainer>
    </PermissionProvider>
  );
};
