/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import { IMessageData } from "../../interfaces/user/IMessageInterface";



interface MessageListProp {
  messages:IMessageData[],
}


const MessageList: React.FC<MessageListProp> = React.memo(({messages}) => {
  const {userData } = useSelector((state: RootState) => state.auth);

  // eslint-disable-next-line prefer-const
  let idForCheck:any= userData?._id

console.log('so many messages got it ', messages,"my user id for chack ", idForCheck);


  return (
    <div className="p-4 h-64 overflow-y-scroll bg-gray-100">
      <div className="flex flex-col space-y-2">
      {messages.map((message, index) => (
          <div
            key={index}
            className={`self-${
              message.userId === idForCheck ? "end" : "start"
            } bg-blue-50 p-2 rounded-lg`}
          >
            <p>{message.content}</p>
            <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString("en-IN", {
  timeZone: "Asia/Kolkata", // Set time zone to IST
  hour: "2-digit",
  minute: "2-digit",
})}

            </span>
          </div>
        ))}
        <div className="self-end bg-blue-500 text-white p-2 rounded-lg">
          <p>Your message</p>
        </div>
      </div>
    </div>
  );
});


export default MessageList;
