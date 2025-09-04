import type { TSource } from "@/shared/types/pagination";
import type { Permission } from "../model";
import type { FC } from "react";
import { Search } from "@/shared/ui/search";
import { Loading } from "@/shared/ui/loading";
import { PermissionCard } from "./card";
import { PaginationControl } from "@/shared/ui/pagination/pagination-control";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";

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
  const { showToast } = useToast();

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
              <PermissionCard key={permission.id} permission={permission} />
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
      <Button onClick={() => showToast("warning", "Toast")}>Toast</Button>
    </>
  );
};
