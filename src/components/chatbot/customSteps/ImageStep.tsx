import * as React from 'react';

interface ImageStepProps {
  step?: {
    metadata: {
      image: string;
    };
  };
}

const ImageStep: React.FC<ImageStepProps> = props => {
  const imageName = props.step.metadata.image;

  return (
    <img
      src={`public/assets/${imageName}.png`}
      alt=""
      style={{
        width: '100%',
      }}
    />
  );
};

export default ImageStep;
