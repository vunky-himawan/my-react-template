import RolesPage from "@/pages/(admin)/roles/ui/roles.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/roles/")({
  component: RolesPage,
});
