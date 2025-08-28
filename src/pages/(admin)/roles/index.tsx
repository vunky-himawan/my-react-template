import { RoleDataTable } from "@/entities/role/ui/data-table";
import { Button } from "@/shared/ui/button";
import { AdminPage } from "@/widgets/admin/ui/page";
import { Link } from "@tanstack/react-router";

export const RolesPage = () => {
  return (
    <AdminPage
      title={"Roles Management Page"}
      description={"This page allows admin to manage user roles."}
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Roles", path: "/roles" },
      ]}
      topAction={<TopAction />}
    >
      <RoleDataTable />
    </AdminPage>
  );
};

const TopAction = () => {
  return (
    <Link to="/dashboard">
      <Button>Create Role</Button>
    </Link>
  );
};
