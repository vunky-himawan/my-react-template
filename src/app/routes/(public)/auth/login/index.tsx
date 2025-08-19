import { createFileRoute } from "@tanstack/react-router";
import { SignInPage } from "@/pages/auth/sign-in";

export const Route = createFileRoute("/(public)/auth/login/")({
  component: SignInPage,
});
