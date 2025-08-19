import type { ReactNode } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { type ZodObject, type ZodRawShape, type infer as zodInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

interface AuthFormWidgetProps<TSchema extends ZodObject<ZodRawShape>> {
  readonly children: ReactNode;
  readonly onSubmit: (data: zodInfer<TSchema>) => void;
  readonly formSchema: TSchema;
  readonly title: string;
  readonly description: string;
  readonly defaultValues: DefaultValues<zodInfer<TSchema>>;
}

export const AuthFormWidget = <TSchema extends ZodObject<ZodRawShape>>({
  children,
  onSubmit,
  formSchema,
  defaultValues,
  title,
  description,
}: AuthFormWidgetProps<TSchema>) => {
  const form = useForm<zodInfer<TSchema>>({
    resolver: zodResolver(formSchema) as Resolver<zodInfer<TSchema>>,
    defaultValues: defaultValues as DefaultValues<zodInfer<TSchema>>,
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {children}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
