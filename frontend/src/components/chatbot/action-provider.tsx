import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import { IMessageOptions } from "react-chatbot-kit/build/src/interfaces/IMessages";
import { useGetFAQAnswerService } from "../../api-services/chatbot-services";

type Props = {
  createChatBotMessage: (
    message: string,
    options: IMessageOptions
  ) => {
    loading: boolean;
    widget?: string;
    delay?: number;
    payload?: unknown;
    message: string;
    type: string;
    id: number;
  };
  setState: React.Dispatch<
    React.SetStateAction<{ messages: (string | IMessageOptions)[] }>
  >;
  children: React.ReactElement;
};

const ActionProvider = ({ children, setState }: Props) => {
  const { mutateAsync } = useGetFAQAnswerService();

  const handleGreet = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.", {});

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleMessage = async ({
    message,
    faqId,
  }: {
    message?: string;
    faqId?: string;
  }) => {
    const faqResp = await mutateAsync({ question: message, questionId: faqId });
    if (Array.isArray(faqResp)) {
      setState((prev) => ({
        ...prev,
        faqs: faqResp,
      }));

      const botMessage = createChatBotMessage("These might help", {
        widget: "faqs",
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } else {
      const botMsg = createChatBotMessage(faqResp.answer, {});
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMsg],
      }));
    }
  };

  const handleSorry = () => {
    const botMessage = createChatBotMessage("Sorry, I didn't understand.", {});

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleGreet,
            handleSorry,
            handleMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
