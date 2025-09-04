import { Button } from "@/shared/ui/button";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { Link } from "@tanstack/react-router";
import { usePermission } from "../model/context";

export const PermissionDetail = () => {
  const { permission } = usePermission();

  if (!permission) {
    return null;
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Permission Detail</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-3 px-4">
        <div>
          <h1 className="text-foreground font-semibold">Name</h1>
          <div>{permission.name}</div>
        </div>
        <div>
          <h1 className="text-foreground font-semibold">Description</h1>
          <div>{permission.description}</div>
        </div>
      </div>
      <SheetFooter>
        <Link to={`/permissions/${permission.id}/update`}>
          <Button className="w-full">Edit</Button>
        </Link>
      </SheetFooter>
    </SheetContent>
  );
};
