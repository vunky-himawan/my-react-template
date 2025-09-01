import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";
import { GuestLayout } from "@/app/layouts/guest.layout";

export const SignInPage = () => {
  return (
    <GuestLayout>
      <SignInForm />
    </GuestLayout>
  );
};
