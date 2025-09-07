import type { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Eye, Pencil } from "lucide-react";
import { DeleteModal, type Role } from "@/entities/role";

interface Params {
  handleOpenSheet: () => void;
}

export const RoleColumnFactory = ({ handleOpenSheet }: Params): ColumnDef<Role>[] => {
  const { navigate } = useRouter();

  const handleRowClick = async (id: number, action: "update" | "show") => {
    await navigate({
      to: "/roles",
      search: {
        id,
        action,
      },
      replace: false,
    });
    handleOpenSheet();
  };

  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex ">
          <Button
            variant={"ghost"}
            className="text-green-600 hover:text-green-700"
            size={"icon"}
            onClick={() => handleRowClick(row.original.id, "show")}
          >
            <Eye />
          </Button>
          <Button
            variant={"ghost"}
            className="text-blue-600 hover:text-blue-700"
            size={"icon"}
            onClick={() => handleRowClick(row.original.id, "update")}
          >
            <Pencil />
          </Button>
          <DeleteModal id={row.original.id} />
        </div>
      ),
    },
  ];
};
