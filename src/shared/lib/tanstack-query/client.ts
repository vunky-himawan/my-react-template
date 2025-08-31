import { tanstackQueryConfig } from "@/config";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: tanstackQueryConfig.staleTime,
      retry: tanstackQueryConfig.retry,
      gcTime: tanstackQueryConfig.gcTime,
    },
  },
});
