import { roleQueries } from "@/entities/role";
import { Loading } from "@/shared/ui/loading";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

export const RoleSheetContent = () => {
  const { id } = useSearch({ from: "/(admin)/roles/" });

  const { data, isLoading } = useQuery(roleQueries.detail(id));

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Role Detail</SheetTitle>
        <SheetDescription>Displays the role detail</SheetDescription>
      </SheetHeader>
      {isLoading && (
        <div className="flex min-h-[8rem] items-center justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && data && (
        <div className="flex flex-col gap-3 px-4">
          <div>
            <h1 className="text-foreground font-semibold">Name</h1>
            <div>{data?.name}</div>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Permissions</h1>
            {/* TODO: display permissions */}
          </div>
        </div>
      )}
    </SheetContent>
  );
};
