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

  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      console.log(
        "message got it somethings logic full so be care full  : ",
        messageData
      );
      setMessages((prevMessages: any) => [...prevMessages, messageData]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="">
      {role == "user" ? <UserNavbar /> : <Navbar />}
    <div className="grid place-items-center lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 sm: ">
        <div  className="bg-green-400 w-96 h-44 border border-black ">saleelis44444444</div>
      <div className="">
       
         <div className="xs:w-80  ">
        <div className=" shadow-lg rounded-md border border-gray-300  bg-slate-100 my-5  overflow-hidden">
          <header className="bg-gradient-to-r from-green-400 to-green-700 text-white font-serif text-center ">
            <h3 className="text-lg font-semibold">{headerTitle}</h3>
          </header>
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
