import { useMutation } from "@tanstack/react-query";
import userRepository from "./repository";

type VerifyPinMutationParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useVerifyPinMutation = (params?: VerifyPinMutationParams) => {
  return useMutation({
    mutationKey: ["verify-pin"],
    mutationFn: (params: { id: string; pin: string }) =>
      userRepository.verifyPin(params),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });
};
