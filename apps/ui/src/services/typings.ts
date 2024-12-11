import { QueryClient, UseQueryResult } from "@tanstack/react-query";

export type GetQuery<T> = {
  useOnServer: (queryClient: QueryClient) => Promise<void>;
  useOnClient: () => UseQueryResult<T, Error>;
};
