import { SignInPage } from "@/pages/(public)/auth/sign-in/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/auth/sign-in/")({
  component: SignInPage,
});
