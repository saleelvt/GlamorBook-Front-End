import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import { IMessageData } from "../../interfaces/user/IMessageInterface";

interface MessageListProp {
  messages: IMessageData[];
}

const MessageList: React.FC<MessageListProp> = React.memo(({ messages }) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const containerREF = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerREF.current) {
      containerREF.current.scrollTop = containerREF.current.scrollHeight;
    }
  }, [messages]);

  const userId = userData?._id;

  return (
    <div
      ref={containerREF}
      className="p-4 h-72 overflow-y-scroll bg-gray-200 flex flex-col"
    >
      <div className="flex flex-col space-y-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.userId === userId ? "self-end" : "self-start"
            } bg-blue-100 p-1 rounded-md`}
          >
            <p className="text-sm font-serif  max-w-40  break-words">{message.content}</p>
            <span className="text-xs text-gray-500 ml-4 ">
              { new Date(message.timestamp).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MessageList;
