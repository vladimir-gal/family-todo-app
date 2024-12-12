"use client";

import { useVerifyPinMutation } from "@/services/user/mutation";
import { sleep } from "@/utils/common";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  LoadingSpinner,
} from "design-library";
import { FC, useState } from "react";

type VerifyPinProps = {
  profileId: string;
  onVerify: () => void;
};

const VerifyPin: FC<VerifyPinProps> = ({ profileId, onVerify }) => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const mutation = useVerifyPinMutation({
    onSuccess() {
      setIsInvalid(false);
      setIsLoading(false);
    },
    onError() {
      setIsInvalid(true);
      setIsLoading(false);
    },
  });

  // Messages
  const messages = {
    title: "Verify PIN",
    description: "Please enter your PIN to verify your identity",
    invalid: "This PIN seems to be invalid, please try again.",
  };

  // Handlers
  const onComplete = async (pin: string) => {
    setIsLoading(true);
    setIsInvalid(false);

    await sleep(500);
    await mutation.mutateAsync({ id: profileId, pin });
    onVerify();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">{messages.title}</h1>
      <p className="text-center text-sm">{messages.description}</p>
      <InputOTP maxLength={4} onComplete={onComplete} disabled={isLoading}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      {isLoading && (
        <p className="text-center text-gray-500">
          <LoadingSpinner />
        </p>
      )}
      {isInvalid && (
        <p className="text-center text-red-500 text-sm">{messages.invalid}</p>
      )}
    </div>
  );
};

export default VerifyPin;
