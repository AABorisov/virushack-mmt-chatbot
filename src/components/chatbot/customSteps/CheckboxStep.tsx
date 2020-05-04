import * as React from 'react';

interface CheckboxStepProps {
  previousStep?: object;
  step?: object;
  steps?: object;
  triggerNextStep?: ({ value, trigger }: { value: string; trigger: string }) => void;
}

const CheckboxStep: React.FC<CheckboxStepProps> = props => {
  console.log(props.step);
  // @ts-ignore
  const { options } = props.step.metadata;
  // @ts-ignore
  const { trigger } = props.step.metadata;
  const { triggerNextStep } = props;

  return (
    <div>
      {options.map((option: { value: string; label: React.ReactNode }) => {
        return (
          <div key={option.value} className="rsc-ts-bubble">
            <input type="checkbox" name={option.value} id={option.value} />
            <span>{option.label}</span>
          </div>
        );
      })}
      <button type="submit" onClick={() => triggerNextStep({ value: '', trigger })}>
        Далее
      </button>
    </div>
  );
};

export default CheckboxStep;
