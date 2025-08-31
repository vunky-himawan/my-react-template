import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "../error/ui/error-boundary";
import { useErrorStore } from "@/shared/stores/error.store";
import { errorHandler } from "../error/model/handler";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { error, clearError } = useErrorStore();
  const errorData = error ? errorHandler(error) : null;

  useEffect(() => {
    console.log("Error ", error);
    console.log(errorData);
  }, [errorData, error]);

  return (
    <ErrorBoundary
      error={error}
      message={errorData?.message}
      onReset={clearError}
      statusCode={errorData?.statusCode}
    >
      <Outlet />
    </ErrorBoundary>
  );
}
