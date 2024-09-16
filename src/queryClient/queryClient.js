import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 3, // Number of retries
      retryDelay: 1000, // Delay between retries (in milliseconds)
    },
  },
});

export default queryClient;
