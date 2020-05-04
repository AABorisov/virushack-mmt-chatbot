import * as React from 'react';

interface ImageStepProps {
  previousStep: object;
  step: object;
  steps: object;
  triggerNextStep: ({ value, trigger }: { value: string; trigger: string }) => void;
}

const ImageStep: React.FC<ImageStepProps> = props => {
  console.log(props.step);
  return <></>;
};

export default ImageStep;
