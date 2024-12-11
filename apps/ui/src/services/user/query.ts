import { QueryClient, useQuery } from "@tanstack/react-query";
import userRepository from "./repository";
import { GetQuery } from "@/services/typings";
import { User } from "./typings";

export const getUserQuery = (id: string): GetQuery<User> => {
  const queryKey = ["user", id];
  const queryFn = () => userRepository.getUser(id);

  return {
    useOnServer: async (queryClient: QueryClient) => {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn,
      });
    },
    useOnClient: () => {
      const query = useQuery({
        queryKey,
        queryFn,
      });

      return query;
    },
  };
};
