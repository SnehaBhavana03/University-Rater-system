import { createChatBotMessage } from "react-chatbot-kit";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import IWidget from "react-chatbot-kit/build/src/interfaces/IWidget";
import { getAuthenticatedUser } from "../../lib/utils";
import FAQs from "./faqs";

let name = "";

if (getAuthenticatedUser()) {
  name = getAuthenticatedUser()?.firstName || "";
}

const config: IConfig = {
  initialMessages: [
    createChatBotMessage(
      `Hi ${name}, I'm drizzle, I'm here to help with any doubts related to university ratings`,
      {}
    ),
  ],
  botName: "Drizzle",
  widgets: [
    {
      widgetName: "faqs",
      widgetFunc: (props) => <FAQs {...props} />,
      props: {},
    },
  ] as IWidget[],
};

export default config;
