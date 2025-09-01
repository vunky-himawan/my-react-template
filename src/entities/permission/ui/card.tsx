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

interface Props {
  permission: Permission;
}

export const PermissionCard: FC<Props> = ({ permission }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{permission.name}</CardTitle>
        <CardAction>
          <Button variant={"outline"} size={"icon"}>
            <Ellipsis />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{permission.description}</CardDescription>
      </CardContent>
    </Card>
  );
};
