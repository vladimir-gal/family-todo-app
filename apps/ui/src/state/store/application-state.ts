import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum ApplicationStep {
  SelectProfile = "select-profile",
  VerifyPin = "verify-pin",
  Application = "application",
}

export type ApplicationState = {
  step: ApplicationStep;
  setStep: (step: ApplicationStep) => void;
  selectedProfileId: string;
  selectProfileId: (id: string) => void;
  resetStepIfNeeded: () => void;
};

export const useApplicationState = create(
  persist<ApplicationState>(
    (set, get) => ({
      step: ApplicationStep.SelectProfile,
      setStep: (step) => set({ step }),
      selectedProfileId: "",
      selectProfileId: (id) =>
        set({ selectedProfileId: id, step: ApplicationStep.VerifyPin }),
      resetStepIfNeeded: () => {
        const currentStep = get().step;
        if (currentStep === ApplicationStep.VerifyPin) {
          set({ step: ApplicationStep.SelectProfile });
        }
      },
    }),
    {
      name: "application-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
