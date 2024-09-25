import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 3, 
      retryDelay: 1000
    },
  },
});

export default queryClient;