import api, { Api } from "@/services/api";
import { UpdateUser, User } from "./typings";

export type UserRepository = {
  getUser: (id: string) => Promise<User>;
  updateUser: (user: UpdateUser) => Promise<User>;
  verifyPin: (params: { id: string; pin: string }) => Promise<void>;
};

const repository = (api: Api): UserRepository => ({
  getUser: async (id: string) => {
    const data = await api.get<User, { id: string }>("/users", { id });
    return data;
  },
  updateUser: (user: UpdateUser) => api.put("/users", user),
  verifyPin: (params: { id: string; pin: string }) =>
    api.post("/profiles/verify-pin", params),
});

const userRepository = repository(api());

export default userRepository;
