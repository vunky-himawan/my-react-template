import z from "zod";

export const SignInFormSchema = z.object({
  email: z
    .email("Invalid email address")
    .nonempty("Email is required")
    .max(255, "Email must be at most 255 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
