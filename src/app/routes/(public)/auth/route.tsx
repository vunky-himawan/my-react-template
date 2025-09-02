import { GuestLayout } from "@/app/layouts/guest.layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  );
}
