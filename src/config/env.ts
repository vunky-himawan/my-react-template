export const tanstackQueryConfig = {
  staleTime: import.meta.env.VITE_TANSTACK_QUERY_STALE_TIME
    ? parseInt(import.meta.env.VITE_TANSTACK_QUERY_STALE_TIME)
    : 300000, // Default to 5 minutes
  retry: import.meta.env.VITE_TANSTACK_QUERY_MAX_RETRIES
    ? parseInt(import.meta.env.VITE_TANSTACK_QUERY_MAX_RETRIES)
    : 3, // Default to 3 retries
};

export const apiUrl = import.meta.env.VITE_API_URL;
