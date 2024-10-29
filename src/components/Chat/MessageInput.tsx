import React, { useCallback, useState } from "react";
import socket from "../../config/socket";
import { IMessageData } from "../../interfaces/user/IMessageInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput: React.FC = React.memo(() => {
  const { role,userData } = useSelector((state: RootState) => state.auth);
  const currentUserId= userData?._id
  const [message, setMessage] = useState("");

  const handleSendMessage = useCallback(() => {
    console.log("first call of chat function ",currentUserId);
    if (message.trim()) {
      // this is the logic section for cteate the message time
      const sender = role === "salon" ? "salon" : "user";
      console.log("Messege sended from input ", message, sender); 

      const Message :IMessageData ={

        content: message,timestamp: new Date(),userId:currentUserId
      }
      socket.emit("send_message", Message);
      // socket.emit("send_message", { content: message, sender });
      setMessage("");
    }
  }, [message]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEnter = (e:any)=>{
    if(e.key==="Enter"){
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target?.value);
    socket.emit("typing", currentUserId); // Emit typing event when typing
  };
  return (
    <div className="flex items-center p-1 border-t border-gray-300">
      <input
        type="text"
        className="flex-1 p-2  text-xs rounded-md border border-gray-300 focus:outline-none   "
        placeholder=" Type a Message"
        value={message}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button
        onClick={handleSendMessage}
       
        className="ml-1 bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white p-2 text-sm rounded-md  focus:outline-none"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
});

export default MessageInput;
