import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { IMessageData } from "../../interfaces/user/IMessageInterface";


interface UserChatWindowProps {
  messages: IMessageData[];
  onlineUsers: string[];
  headerTitle: string;
  typingUserId: string | null;
}

export const UserChatWindow: React.FC<UserChatWindowProps> = ({
  messages,
  onlineUsers,
  headerTitle,
  typingUserId,
}) => {

  
  return (
    <div className="xs:w-80 shadow-lg rounded-md border bg-slate-100 my-5 overflow-hidden">
      <div className="bg-gray-300 p-1">
        <h3 className="text-lg font-semibold text-end mr-2">{headerTitle}</h3>
        <div className="flex bg-green-300">
          {onlineUsers.length} {onlineUsers.length === 1 ? "User" : "Users"} Online
          {typingUserId && <div className="text-md font-serif"> typing...</div>}
        </div>
      </div>
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  );
};
