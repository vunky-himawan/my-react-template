import type { FC, PropsWithChildren } from "react";
import { QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query";
import { queryClient } from "../../shared/lib/tanstack-query/client";

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>;
};
