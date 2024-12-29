import ChatbotMain from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./action-provider";
import config from "./config";
import MessageParser from "./message-parser";

const Chatbot = () => {
  return (
    <ChatbotMain
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
};

export default Chatbot;
