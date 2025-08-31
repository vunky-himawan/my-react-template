import type { FC, PropsWithChildren } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";
import { useErrorStore } from "@/shared/stores/error.store";
import { AxiosError } from "axios";
import { AxiosAppError } from "../error/model";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      useErrorStore.getState().setError(new AxiosAppError(error as AxiosError));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      useErrorStore.getState().setError(new AxiosAppError(error as AxiosError));
    },
  }),
});

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>;
};
