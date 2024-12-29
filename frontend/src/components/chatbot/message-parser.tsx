import React from "react";

type Props = {
  children: React.ReactElement;
  actions: {
    handleGreet: () => void;
    handleMessage: (data: { message: string }) => void;
  };
};

const greetings = ["hi", "hello", "hey", "hai"];

const MessageParser = ({ children, actions }: Props) => {
  const parse = async (message: string) => {
    const msg = message?.toLowerCase() ?? "";
    const isGreet = greetings.some((grtng) => msg.startsWith(grtng));

    if (isGreet) {
      return actions?.handleGreet();
    }

    return actions?.handleMessage({ message: message });
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
