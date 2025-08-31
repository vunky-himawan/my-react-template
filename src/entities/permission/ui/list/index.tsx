import { useQuery } from "@tanstack/react-query";
import { permissionQueries } from "../../api/queries";
import { ListPermissionWrapper } from "./wrapper";
import { Search } from "@/widgets/toolbar/search";
import { ListPermissionLoading } from "./loading";

export const ListPermission = () => {
  const { isLoading } = useQuery(permissionQueries.findMany({}));

  return (
    <ListPermissionWrapper>
      <Search />
      <div className="h-full">
        {isLoading && <ListPermissionLoading />}
        {/* <PermissionCard /> */}
      </div>
    </ListPermissionWrapper>
  );
};
