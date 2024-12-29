import { useMutation } from "@tanstack/react-query";
import { http } from "./http";

type GetFAQAnswerDataType = {
  questionId?: string;
  question?: string;
};

export type ChatBotAnswerType = {
  id: string;
  answer: string;
  univId?: string;
};

export type FAQType = {
  id: string;
  question: string;
};

const getFAQAnswerService = async (data?: GetFAQAnswerDataType) => {
  const { question, questionId = "" } = data || {};
  const resp = await http.post<ChatBotAnswerType | FAQType[]>(
    `/api/chatbot/${questionId}`,
    { question }
  );
  return resp.data;
};

export const useGetFAQAnswerService = () => {
  return useMutation({
    mutationFn: getFAQAnswerService,
    onSuccess: () => null,
  });
};
