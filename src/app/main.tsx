import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "./providers/query-client.provider";
import { router } from "@/shared/lib/tanstack-router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
