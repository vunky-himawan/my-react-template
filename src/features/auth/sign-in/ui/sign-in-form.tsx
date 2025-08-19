import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Checkbox } from "@/shared/ui/checkbox";
import { SignInFormSchema } from "../model/sign-in-schema";
import { AuthFormWidget } from "@/widgets/auth/auth-form";

const Form = () => {
  const { control } = useFormContext<z.infer<typeof SignInFormSchema>>();

  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email" required>
              Email
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} required id="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password" required>
              Password
            </FormLabel>
            <FormControl>
              <Input id="password" type="password" placeholder="Password" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center justify-between">
        <FormItem>
          <FormLabel htmlFor="remember" className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </FormLabel>
        </FormItem>
        <Button
          type="button"
          variant={"link"}
          className="p-0 cursor-pointer"
          onClick={() => alert("Forgot password functionality is not implemented yet.")}
        >
          Forgot password?
        </Button>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Separator label="Or" />
      <Button
        type="button"
        variant={"outline"}
        className="w-full"
        onClick={() => {
          alert("Google login is not implemented yet.");
        }}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          className="h-4 w-4"
        />
        Login with Google
      </Button>
    </>
  );
};

export const SignInForm = () => {
  return (
    <AuthFormWidget
      onSubmit={(data) => console.log(data)}
      formSchema={SignInFormSchema}
      defaultValues={{ email: "", password: "" }}
      title="Login to Your Account"
      description="Please enter your credentials to continue."
    >
      <Form />
    </AuthFormWidget>
  );
};
