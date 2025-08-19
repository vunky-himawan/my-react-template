import { useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import type { FC } from "react";
import { isUrlActive } from "@/shared/utils/url";
import { Link } from "@tanstack/react-router";
import React from "react";

export type TBreadcrumbItem = {
  path: string;
  label: string;
};

interface AuthenticatedHeaderProps {
  breadcrumbItems: TBreadcrumbItem[];
  children: React.ReactNode;
}

export const AuthenticatedHeader: FC<AuthenticatedHeaderProps> = ({
  breadcrumbItems,
  children,
}) => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between pt-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isActive = isUrlActive(item.path, location.pathname);
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <React.Fragment key={item.path}>
                {isActive ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbItem>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbItem>
                )}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </header>
  );
};
