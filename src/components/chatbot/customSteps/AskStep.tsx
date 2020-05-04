import * as React from 'react';

import axios, { AxiosInstance } from 'axios';

// @ts-ignore
import { Loading } from 'react-simple-chatbot';

interface AskStepProps {
  previousStep?: object;
  step?: object;
  steps?: object;
  triggerNextStep?: ({ value, trigger }: { value?: string; trigger?: string }) => void;
}

const AskStep: React.FC<AskStepProps> = props => {
  const [loading, setLoading]: [boolean, Function] = React.useState(true);
  const [result, setResult]: [
    Array<{ answer: string; id: number | string }>,
    Function
  ] = React.useState([]);

  React.useEffect((): (() => void) => {
    const { previousStep } = props;

    const host = 'https://asdwz12.azurewebsites.net/qnamaker';
    const endpoint = '/knowledgebases/3fad9fb3-2919-4b60-8422-859f0cc62e64/generateAnswer';
    const Authorization = 'EndpointKey a4a6381c-465c-4cc2-9cb9-ab5ede12fa55';
    // @ts-ignore
    const question = previousStep.value;

    const fetchData = async () => {
      const response = await axios({
        headers: {
          Authorization,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: host + endpoint,
        data: {
          question,
        },
      });

      setResult(response.data?.answers);
      setLoading(false);
    };

    fetchData();

    return (): void => {};
  }, [props]);

  React.useEffect(() => {
    if (!loading) {
      props.triggerNextStep({});
    }
  }, [loading, props]);

  return (
    <div className="answer">
      {loading ? (
        <Loading />
      ) : (
        result.map(answer => {
          return (
            <div
              key={answer.id}
              style={{
                fontSize: '14px',
              }}
              dangerouslySetInnerHTML={{ __html: answer.answer }}
            />
          );
        })
      )}
    </div>
  );
};

export default AskStep;
