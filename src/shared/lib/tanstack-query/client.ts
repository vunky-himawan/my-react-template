import { tanstackQueryConfig } from "@/config/env";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: tanstackQueryConfig.staleTime,
      retry: tanstackQueryConfig.retry,
    },
  },
});
