"use client";

import type { QueryClientConfig } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type TanStackProviderProps = {
  children: ReactNode;
};

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: false,
    },
  },
};

export const TanStackProvider = ({ children }: TanStackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
