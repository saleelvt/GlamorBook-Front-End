import React, { useCallback, useState } from "react";
import socket from "../../config/socket";
import { IMessageData } from "../../interfaces/user/IMessageInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";

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

  return (
    <div className="flex items-center p-3 border-t border-green-300">
      <input
        type="text"
        className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a Message"
        value={message}
        onChange={(e) => setMessage(e.target?.value)}
      />

      <button
        onClick={handleSendMessage}
        className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
});

export default MessageInput;
