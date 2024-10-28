/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import socket from "../../config/socket";
import { IMessageData } from "../../interfaces/user/IMessageInterface";
import UserNavbar from "../Navbar/userNavbar";
import Navbar from "../Navbar/salonNavbar";
const ChatWindow: React.FC = React.memo(() => {
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const { role } = useSelector((state: RootState) => state.auth);

  const headerTitle = role === "user" ? "Client Chat" : "Salon Chat";
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUserId, setTypingUserId] = useState<string | null>(null);
  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      // console.log( "message got it somethings logic full so be care full  : ", messageData);
      setMessages((prevMessages: any) => [...prevMessages, messageData]);
    });

    socket.on("update_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", (userId) => {
      setTypingUserId(userId);
      setTimeout(() => setTypingUserId(null), 2000); // Clear typing indicator after 3 seconds
    });
    return () => {
      socket.off("receive_message");
      socket.off("update_users");
      socket.off("typing");
    };
  }, []);
  return (
    <div className="">
      {role == "user" ? <UserNavbar /> : <Navbar />}
      <div className="grid place-items-center lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 sm: ">
        <div className="bg-green-400 w-96 h-44 border border-black ">
          saleelis44444444
        </div>
        <div className="">
          <div className="xs:w-80  ">
            <div className=" shadow-lg rounded-md border border-gray-300  bg-slate-100 my-5  overflow-hidden">
              <div className=" bg-gray-300 p-1">
                <h3 className="text-lg font-semibold text-end mr-2">
                  {headerTitle}
                </h3>
                <div className="flex  bg-green-300 ">
                  {onlineUsers.length}{" "}
                  {onlineUsers.length === 1 ? "User" : "Users"} Online
                  {typingUserId && (
                    <div className="text-md font-serif  "> typing...</div>
                  )}
                </div>
              </div>
              <MessageList messages={messages} />
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ChatWindow;
