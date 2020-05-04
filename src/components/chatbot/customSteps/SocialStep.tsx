import * as React from 'react';

interface SocialStepProps {
  previousStep: object;
  step: object;
  steps: object;
  triggerNextStep: ({ value, trigger }: { value: string; trigger: string }) => void;
}

const SocialStep: React.FC<SocialStepProps> = props => {
  return <></>;
};

export default SocialStep;
