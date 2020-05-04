import * as React from 'react';
// import Tree from 'rc-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const CheckboxTree = require('react-checkbox-tree');

interface CheckboxStepProps {
  previousStep?: object;
  step?: object;
  steps?: object;
  triggerNextStep?: ({ value, trigger }: { value: string; trigger: string }) => void;
}

const CheckboxStep: React.FC<CheckboxStepProps> = props => {
  console.log(props);
  // @ts-ignore
  const { options } = props.step.metadata;
  // @ts-ignore
  const { trigger } = props.step.metadata;
  const { triggerNextStep } = props;

  const [checked, setChecked]: [Array<string>, Function] = React.useState([]);
  const [expanded, setExpanded]: [Array<string>, Function] = React.useState([]);

  const nodes = [
    {
      value: 'mars',
      label: 'Mars',
      children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
      ],
    },
  ];

  return (
    <div>
      {/* {options.map((option: { value: string; label: React.ReactNode }) => {*/}
      {/*  return (*/}
      {/*    <div key={option.value} className="rsc-ts-bubble">*/}
      {/*      <input type="checkbox" name={option.value} id={option.value} />*/}
      {/*      <span>{option.label}</span>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/* })}*/}
      {/* <Tree nodes={nodes} />*/}
      <CheckboxTree
        nodes={nodes}
        checked={checked}
        expanded={expanded}
        onCheck={(newChecked: Array<string>) => {
          console.log(checked, newChecked);
          setChecked(newChecked);
        }}
        onExpand={(newExpanded: Array<string>) => {
          console.log(expanded, newExpanded);
          setExpanded(newExpanded);
        }}
      />
      <button type="submit" onClick={() => triggerNextStep({ value: '', trigger })}>
        Далее
      </button>
    </div>
  );
};

export default CheckboxStep;
