import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { Permission } from "../model/types";
import { type FC, type ReactNode } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { Switch } from "@/shared/ui/switch";

interface Props {
  permission: Permission;
  actions?: ReactNode;
}

export const PermissionCard: FC<Props> = ({ permission, actions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{permission.name}</CardTitle>
        <CardAction>{actions}</CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{permission.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface CardAsFormFieldProps extends Omit<Props, "withSwitch"> {
  field: Pick<ControllerRenderProps, "value" | "onChange">;
}

export const PermissionCardAsFormField: FC<CardAsFormFieldProps> = ({ field, permission }) => {
  const isChecked = field.value?.includes(permission.id);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      field.onChange([...(field.value || []), permission.id]);
    } else {
      field.onChange(field.value.filter((id: number) => id !== permission.id));
    }
  };

  return (
    <PermissionCard
      permission={permission}
      actions={<Switch checked={isChecked} onCheckedChange={handleCheckedChange} />}
    />
  );
};
