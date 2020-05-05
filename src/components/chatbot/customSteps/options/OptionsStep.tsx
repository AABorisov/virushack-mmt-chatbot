import * as React from 'react';
// import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';
import NextButton from './NextButton';

interface OptionType {
  value: string;
  label: string;
  trigger?: string;
}

interface OptionsStepProps {
  previousStep?: object;
  step?: {
    user?: boolean;
    metadata: {
      options: Array<OptionType>;
      triggers: {
        checked: string;
        unchecked: string;
      };
    };
  };
  steps?: object;
  triggerNextStep?: ({ value, trigger }: { value: any; trigger?: string }) => void;
  bubbleOptionStyle?: object;
}

class OptionsStep extends React.Component<OptionsStepProps, { checked: Array<string> }> {
  constructor(props: OptionsStepProps) {
    super(props);
    this.state = {
      checked: [],
    };
  }

  onOptionClick = ({ event, value }: { event: any; value: string }) => {
    const { checked } = this.state;
    const wasValueChecked = checked.includes(value);
    const newChecked = wasValueChecked ? checked.filter(v => v !== value) : [...checked, value];
    this.setState({ checked: newChecked });
  };

  onNextClick = () => {
    const { checked } = this.state;
    const { triggerNextStep } = this.props;
    const { triggers } = this.props.step.metadata;
    if (checked.length) {
      triggerNextStep({ value: true, trigger: triggers.checked });
    } else {
      triggerNextStep({ value: false, trigger: triggers.unchecked });
    }
  };

  renderOption = (option: OptionType) => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { value, label } = option;
    const { checked } = this.state;
    const style: { background?: string } = {};
    if (checked.includes(value)) {
      style.background = '#00818f';
    }

    return (
      <Option key={value} className="rsc-os-option">
        <OptionElement
          className="rsc-os-option-element"
          style={style}
          onClick={event => this.onOptionClick({ event, value })}
        >
          {label}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step } = this.props;
    const { options } = step.metadata;

    // @ts-ignore
    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">{options.map(this.renderOption)}</Options>
        <NextButton onClick={() => this.onNextClick()}>Далее</NextButton>
      </OptionsStepContainer>
    );
  }
}

export default OptionsStep;
