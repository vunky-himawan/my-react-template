import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "./providers/query-client.provider";
import { router } from "@/shared/lib/tanstack-router/router";
import * as Sentry from "@sentry/browser";
import { sentryConfig } from "@/config";
import { GlobalErrorListener } from "./error/ui/global-listener";

Sentry.init({
  dsn: sentryConfig.dsn,
  // TODO: Configure Sentry
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <GlobalErrorListener />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
