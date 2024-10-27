/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react"

import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import socket from "../../config/socket";
import { IMessageData } from "../../interfaces/user/IMessageInterface";
const ChatWindow : React.FC= React.memo(()=>{


  

      const [messages,setMessages]= useState<IMessageData[]>([])
      const {role}=useSelector((state:RootState)=> state.auth)
      const headerTitle = role === 'salon' ? 'Client Chat' : 'Salon Chat';

       useEffect(()=>{
            socket.on("receive_message",(messageData)=>{

              console.log("message got it somethings logic full so be care full  : ", messageData);
              setMessages((prevMessages: any)=>[...prevMessages,messageData])
            })
            return ()=>{
              socket.off("receive_message")
            }
       },[])



      return (
        <div className="fixed bottom-20 right-4 w-80 max-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-green-400 to-green-700 text-white text-center py-3">
            <h3 className="text-lg font-semibold">{headerTitle}</h3>
          </header>
          <MessageList   messages={messages}  />
          <MessageInput/>
        </div>
      );

})

export default ChatWindow