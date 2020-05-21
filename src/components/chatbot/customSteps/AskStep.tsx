import * as React from 'react';

import axios, { AxiosInstance } from 'axios';

// @ts-ignore
import { Loading } from 'react-simple-chatbot';
import { LangEnum } from '../../../store/lang/types';

interface AskStepProps {
  lang: LangEnum;
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

  const { triggerNextStep, previousStep, lang } = props;
  const isRuLang = LangEnum.ru === lang;
  // @ts-ignore
  const question = previousStep.value;

  React.useEffect((): (() => void) => {
    const host = isRuLang
      ? 'https://asdwz12.azurewebsites.net/qnamaker'
      : 'https://qnaengbot.azurewebsites.net/qnamaker';
    const endpoint = isRuLang
      ? '/knowledgebases/9b675538-0038-4aa9-a8fe-e8db534f1f60/generateAnswer'
      : '/knowledgebases/c053dd84-0e7f-4f9e-88a6-28e755dd9c7e/generateAnswer';
    const Authorization = isRuLang
      ? 'EndpointKey a4a6381c-465c-4cc2-9cb9-ab5ede12fa55'
      : 'EndpointKey 597a8056-4d4f-4ded-87e6-2012bfa35412';

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

      setResult(response.data.answers);
      setLoading(false);
    };

    fetchData();

    return (): void => {};
  }, [isRuLang, question]);

  React.useEffect(() => {
    if (!loading) {
      triggerNextStep({});
    }
  }, [loading, triggerNextStep]);

  // @ts-ignore
  const { key } = props.step;

  setTimeout(() => {}, 0);

  return (
    <div className="answer" key={key}>
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
