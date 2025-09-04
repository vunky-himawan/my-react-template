import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { Permission } from "../model/types";
import type { FC } from "react";
import { Button } from "@/shared/ui/button";
import { Ellipsis } from "lucide-react";
import { SheetTrigger } from "@/shared/ui/sheet";
import { usePermission } from "../model/context";

interface Props {
  permission: Permission;
}

export const PermissionCard: FC<Props> = ({ permission }) => {
  const { setPermission } = usePermission();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{permission.name}</CardTitle>
        <CardAction>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"} onClick={() => setPermission(permission)}>
              <Ellipsis />
            </Button>
          </SheetTrigger>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{permission.description}</CardDescription>
      </CardContent>
    </Card>
  );
};
