import { type FC } from "react";
import { Loading } from "@/shared/ui/loading";
import type { Permission } from "../model";
import { PermissionCard } from "./card";
import { Search } from "@/shared/ui/search";
import { PaginationControl } from "@/shared/ui/pagination";
import type { TSource } from "@/shared/types/pagination";

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
    </>
  );
};
