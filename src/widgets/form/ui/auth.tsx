import type { ReactNode } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { type ZodObject, type ZodRawShape, type infer as zodInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/shared/ui/card";
import { CardHeader } from "@/shared/ui/card";
import { CardTitle } from "@/shared/ui/card";
import { CardDescription } from "@/shared/ui/card";
import { CardContent } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form/form";

interface AuthFormWidgetProps<TSchema extends ZodObject<ZodRawShape>> {
  readonly children: ReactNode;
  readonly onSubmit: (data: zodInfer<TSchema>) => void;
  readonly formSchema: TSchema;
  readonly title: string;
  readonly description: string;
  readonly defaultValues: DefaultValues<zodInfer<TSchema>>;
}

export const DynamicForm = <TSchema extends ZodObject<ZodRawShape>>({
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
