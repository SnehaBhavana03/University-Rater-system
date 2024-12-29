import { Chip, Stack } from "@mui/material";
import { FAQType } from "../../api-services/chatbot-services";

type Props = {
  actionProvider: {
    handleMessage: (data: { faqId: string; message: string }) => void;
  };
  state: {
    faqs: FAQType[];
  };
};

const FAQs = ({ actionProvider, state }: Props) => {
  const faqs = state?.faqs;
  if (!faqs) {
    return null;
  }
  return (
    <Stack direction="row" gap="1rem" alignItems="center" flexWrap="wrap">
      {faqs.map((faq) => (
        <Chip
          key={faq.id}
          label={faq.question}
          onClick={() =>
            actionProvider.handleMessage({
              faqId: faq.id,
              message: faq.question,
            })
          }
        />
      ))}
    </Stack>
  );
};

export default FAQs;
