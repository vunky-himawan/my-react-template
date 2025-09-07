import { roleQueries } from "@/entities/role";
import { useQueryFilters } from "@/features/filter";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetTrigger } from "@/shared/ui/sheet";
import { makePagination } from "@/shared/utils/pagination";
import { AdminPageContainer } from "@/widgets/admin/ui/container";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { DataTable } from "@/shared/ui/table/data-table";
import { RoleColumnFactory } from "@/features/role/table/ui/role-column-factory";
import { RoleSheetContent } from "@/features/role/create-or-update/ui/sheets/role.sheet";
import { CreateRoleSheetContent } from "@/features/role/create-or-update/ui/sheets/create-role.sheet";
import { UpdateRoleSheetContent } from "@/features/role/create-or-update/ui/sheets/update-role.sheet";

const RolesPage = () => {
  const { navigate } = useRouter();
  const { id, action } = useSearch({ from: "/(admin)/roles/" });
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const columns = RoleColumnFactory({ handleOpenSheet: () => setSheetIsOpen(true) });

  const { pagination, search, handleChange } = useQueryFilters();

  const { data, isLoading } = useQuery(
    roleQueries.list({
      ...makePagination(pagination),
      search,
    }),
  );

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Roles", path: "/roles" },
  ];

  const handleResetSearchParams = () => {
    setTimeout(() => {
      navigate({
        to: "/roles",
        search: { id: undefined, action: undefined },
        replace: false,
      });
    }, 100);
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        handleResetSearchParams();
        setSheetIsOpen(open);
      }}
      open={sheetIsOpen}
    >
      <AdminPageContainer
        title="Role Management Page"
        description="This page allow user to management roles"
        breadcrumbs={breadcrumbs}
        topAction={<TopAction />}
        isLoading={isLoading}
      >
        <DataTable
          columns={columns}
          source={data}
          handleChange={handleChange}
          search={search}
          placeholderSearch="Search roles..."
        />
      </AdminPageContainer>

      {/* Show Role Sheet */}
      {action && action === "show" && id && <RoleSheetContent />}

      {/* Update Role Sheet */}
      {action && action === "update" && id && (
        <UpdateRoleSheetContent enabled={sheetIsOpen} onClose={() => setSheetIsOpen(false)} />
      )}

      {/* Create Role Sheet */}
      {!action && !id && (
        <CreateRoleSheetContent
          enabled={sheetIsOpen}
          onClose={() => {
            setSheetIsOpen(false);
          }}
        />
      )}
    </Sheet>
  );
};

const TopAction = () => {
  return (
    <SheetTrigger asChild>
      <Button>
        Create Role <Plus />
      </Button>
    </SheetTrigger>
  );
};

export default RolesPage;
