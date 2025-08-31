import { ListPermission } from "@/entities/permission/ui/list";
import { AdminPage } from "@/widgets/admin/ui/page";

export const PermissionsPage = () => {
  return (
    <AdminPage
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        {
          label: "Permissions",
          path: "/permissions",
        },
      ]}
      title="List Permissions"
      description="Manage user permissions"
    >
      <ListPermission />
    </AdminPage>
  );
};
