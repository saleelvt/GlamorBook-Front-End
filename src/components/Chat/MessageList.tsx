/* eslint-disable @typescript-eslint/no-explicit-any */
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
  }, [messages]); // Ensure to add messages as a dependency

  const  idForCheck: any = userData?._id;
  console.log(
    "so many messages got it ",
    messages,
    "my user id for check ",
    idForCheck
  );

  return (
    <div>
      <div ref={containerREF} className="p-4 xs:h-72 lg:h-80 md:h-80 sm:h-72 overflow-y-scroll bg-gray-200 flex flex-col">
        <div className="flex flex-col space-y-1">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.userId === idForCheck ? "self-end" : "self-start"} bg-blue-100 p-1 border border-gray-300 min-h-12 lg:max-w-56 rounded-md`}
            >
              <p className="text-sm font-serif overflow-auto break-words">{message.content}</p>
              <span className="text-xs font-light grid place-content-end   text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata", // Set time zone to IST
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MessageList;
