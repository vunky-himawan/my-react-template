import { PermissionsPage } from "@/pages/(admin)/permissions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/permissions/")({
  component: PermissionsPage,
});
