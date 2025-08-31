import { useQuery } from "@tanstack/react-query";
import { roleQueries } from "../api/queries";
import { DataTable } from "@/widgets/data-table/ui/data-table";
import type { Role } from "../model/types";
import { roleTableColumns } from "./table-columns";
import { makeSource } from "@/shared/utils/data-tables/mapper";
import { useQueryFilters } from "@/shared/hooks/filters/use-query-filters";

export const RoleDataTable = () => {
  const { data, isLoading, error } = useQuery(roleQueries.paginate(1, 10));
  const { search, pagination, handleChange, filters } = useQueryFilters();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DataTable<Role>
      columns={roleTableColumns}
      source={makeSource(data)}
      filters={[
        {
          key: "name",
          label: "Name",
          placeholder: "Search by name",
          name: "name",
          type: "number",
          defaultValue: filters?.name || undefined,
        },
        {
          key: "positive",
          label: "Positive",
          placeholder: "Search by positive",
          name: "positive",
          type: "custom",
          render: () => <div>Custom Rendered Component</div>,
        },
      ]}
      search={search}
      pagination={pagination}
      handleChange={handleChange}
    />
  );
};
