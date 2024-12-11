"use client";

import { AppSidebar } from "@/components/common/sidebar";
import ProfileSelection from "@/components/user/profile-selection";
import VerifyPin from "@/components/user/verify-pin";
import { getUserQuery } from "@/services/user/query";
import {
  ApplicationStep,
  useApplicationState,
} from "@/state/store/application-state";

import { Button, LoadingSpinner } from "design-library";

import { ModeToggle } from "@/components/common/theme-toggle";
import { FC, useEffect, useState } from "react";

const Home: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { step, setStep, selectProfileId, resetStepIfNeeded } =
    useApplicationState();

  const { data } = getUserQuery("1").useOnClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    resetStepIfNeeded();
  }, [resetStepIfNeeded]);

  if (!isMounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner className="size-14" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex">
      {step === ApplicationStep.SelectProfile && (
        <ProfileSelection data={data} onSelect={selectProfileId} />
      )}
      {step === ApplicationStep.VerifyPin && (
        <VerifyPin
          userId={data!.id}
          onVerify={() => setStep(ApplicationStep.Application)}
        />
      )}
      {step === ApplicationStep.Application && (
        <div className="flex flex-row gap-4">
          <AppSidebar />
          <p className="text-center text-sm">TODO</p>
          <Button onClick={() => setStep(ApplicationStep.SelectProfile)}>
            Back to profile selection
          </Button>
          <ModeToggle />
        </div>
      )}
    </div>
  );
};

export default Home;
