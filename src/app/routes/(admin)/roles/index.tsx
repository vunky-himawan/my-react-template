import { RolesPage } from "@/pages/(admin)/roles";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/roles/")({
  component: RolesPage,
});
