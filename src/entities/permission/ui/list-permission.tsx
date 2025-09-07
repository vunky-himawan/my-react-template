import type { TSource } from "@/shared/types/pagination";
import type { Permission } from "../model";
import type { FC } from "react";
import { Search } from "@/shared/ui/search";
import { Loading } from "@/shared/ui/loading";
import { PermissionCard } from "./card";
import { PaginationControl } from "@/shared/ui/pagination/pagination-control";
import { SheetTrigger } from "@/shared/ui/sheet";
import { Button } from "@/shared/ui/button";
import { Ellipsis } from "lucide-react";
import { usePermission } from "../model/context";

interface Props {
  data?: TSource<Permission[]>;
  isLoading: boolean;
  handleChange: {
    onPaginationChange: (page: number, limit: number) => void;
    onSearch: (searchTerm: string) => void;
  };
  search?: string;
}

export const ListPermission: FC<Props> = ({ data, isLoading, handleChange, search }) => {
  const { data: permissions, meta } = data || {};

  return (
    <>
      <Search
        onSearch={handleChange.onSearch}
        search={search}
        placeholderSearch="Search permissions..."
      />
      <div>
        {isLoading && (
          <div className="h-full">
            <Loading />
          </div>
        )}
        <div className="grid grid-cols-1 my-3 gap-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {permissions && permissions?.length > 0 ? (
            permissions.map((permission) => (
              <PermissionCard
                key={permission.id}
                permission={permission}
                actions={<PermissionAction permission={permission} />}
              />
            ))
          ) : (
            <p>No result.</p>
          )}
        </div>
      </div>
      {meta && (
        <PaginationControl
          onPaginationChange={handleChange.onPaginationChange}
          paginationMeta={meta}
        />
      )}
    </>
  );
};

const PermissionAction = ({ permission }: { permission: Permission }) => {
  const { setPermission } = usePermission();

  return (
    <SheetTrigger asChild>
      <Button variant={"outline"} size={"icon"} onClick={() => setPermission(permission)}>
        <Ellipsis />
      </Button>
    </SheetTrigger>
  );
};
