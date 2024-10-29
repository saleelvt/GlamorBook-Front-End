/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import socket from "../../config/socket";
import { IMessageData } from "../../interfaces/user/IMessageInterface";
import { UserChatWindow } from "./userChatWindow";
import UserNavbar from "../Navbar/userNavbar";
import Navbar from "../Navbar/salonNavbar";
import { SalonChatWindow } from "./salonChatWindow";

const ChatWindow: React.FC = React.memo(() => {
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const { role } = useSelector((state: RootState) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUserId, setTypingUserId] = useState<string | null>(null);

  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    socket.on("update_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", (userId) => {
      setTypingUserId(userId);
      setTimeout(() => setTypingUserId(null), 2000);
    });

    return () => {
      socket.off("receive_message");
      socket.off("update_users");
      socket.off("typing");
    };
  }, []);

  const headerTitle = role === "user" ? "Client Chat" : "Salon Chat";

  
  return (
    <div className="">
      {role === "user" ? <UserNavbar /> : <Navbar />}
      <div className="grid place-items-center lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="bg-green-400 w-96 h-44 border border-black">User Info</div>
        <div className="">
          {role === "user" ? (
            <UserChatWindow
              messages={messages}
              onlineUsers={onlineUsers}
              headerTitle={headerTitle}
              typingUserId={typingUserId}
            />
          ) : (
            <SalonChatWindow
              messages={messages}
              onlineUsers={onlineUsers}
              headerTitle={headerTitle}
              typingUserId={typingUserId}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default ChatWindow;
