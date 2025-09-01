import { PageNotFound } from "@/app/error/model/error";
import { routeTree } from "@/app/routeTree.gen";
import { useErrorStore } from "@/shared/stores/error.store";
import { createRouter } from "@tanstack/react-router";

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    useErrorStore.getState().setError(new PageNotFound());
    return null;
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
