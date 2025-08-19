import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <div>Hello "Landing Page"!</div>;
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
