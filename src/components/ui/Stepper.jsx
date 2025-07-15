import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mb-4">
      <div className="flex items-center w-1/2 max-w-md px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step dot or check */}
            <div
              className={`
                w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center z-10
                ${step < currentStep
                  ? 'bg-white border-secondary text-secondary'
                  : step === currentStep
                  ? 'bg-secondary border-secondary text-white'
                  : 'bg-gray-300 border-gray-300 text-white'}
              `}
            >
              {step < currentStep || (step === currentStep && step === totalSteps) ? (
  <Check className="w-4 h-4" />
) : (
  <span className=" rounded-full bg-white" />
)}

            </div>

            {/* Line between steps */}
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
