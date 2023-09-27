import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import FirstStep from "../addStudent/steps/FirstStep";
import {
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import SecondStep from "../addStudent/steps/SecondStep";
import ThirdStep from "../addStudent/steps/ThirdStep";

export function CustomStepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const displayFormStep = (): JSX.Element => {
    switch (activeStep) {
      case 0:
        return <FirstStep />;

      case 1:
        return <SecondStep />;

      case 2:
        return <ThirdStep />;

      default:
        return <></>;
    }
  };

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        lineClassName="h-2"
        activeLineClassName="bg-purple-700"
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step
          color="purple"
          activeClassName="bg-purple-700"
          completedClassName="bg-purple-700"
          className="h-16 w-16"
          onClick={() => setActiveStep(0)}
        >
          <UserIcon className="w-5" />
        </Step>
        <Step
          activeClassName="bg-purple-700"
          completedClassName="bg-purple-700"
          className="h-16 w-16"
          onClick={() => setActiveStep(1)}
        >
          <UsersIcon className="w-5" />
        </Step>
        <Step
          activeClassName="bg-purple-700"
          completedClassName="bg-purple-700"
          className="h-16 w-16"
          onClick={() => setActiveStep(2)}
        >
          <ShieldCheckIcon className="w-5" />
        </Step>
      </Stepper>
      <form className="w-full">{displayFormStep()}</form>
      <div
        className={`mt-16 flex ${
          activeStep === 0 ? "w-full justify-end" : "justify-between"
        }`}
      >
        {activeStep > 0 && (
          <Button
            className="bg-purple-700"
            onClick={handlePrev}
            disabled={isFirstStep}
          >
            Prev
          </Button>
        )}
        <Button
          className="bg-purple-700"
          onClick={handleNext}
          disabled={isLastStep}
        >
          {activeStep === 2 ? "Valider" : "Next"}
        </Button>
      </div>
    </div>
  );
}
