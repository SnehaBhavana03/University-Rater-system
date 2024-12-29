import { useQuery } from "@tanstack/react-query";
import { http } from "./http";

export type QuestionType = "rating" | "boolean";

export type QuestionObjectType = {
  _id: string;
  question: string;
  type: QuestionType;
  category: string;
};
type GetQuestionsServiceDataType = {
  label: string;
  questions: QuestionObjectType[];
};
const getQuestionsService = async () => {
  const resp = await http.get<GetQuestionsServiceDataType[]>("/api/questions");
  return resp.data;
};

export const useGetQuestionsService = () => {
  return useQuery({
    queryFn: getQuestionsService,
    queryKey: ["getQuestionsService"],
    enabled: true,
  });
};
