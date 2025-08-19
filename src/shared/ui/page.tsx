import type { FC, ReactNode } from "react";
import { AuthenticatedHeader, type TBreadcrumbItem } from "./header";
import { Separator } from "./separator";

interface PageProps {
  breadcrumbs?: TBreadcrumbItem[];
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

export const Page: FC<PageProps> = ({ children, breadcrumbs, header, title, description }) => {
  return (
    <div className="flex w-full flex-col gap-y-4 px-4 py-2">
      <AuthenticatedHeader breadcrumbItems={breadcrumbs || []}>{header}</AuthenticatedHeader>
      <Separator />
      <div>
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
};
