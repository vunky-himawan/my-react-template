import UpdatePermissionPage from "@/pages/(admin)/permissions/update-permission.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/permissions/$permissionId/update/")({
  component: UpdatePermissionPage,
});
