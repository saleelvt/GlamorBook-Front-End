import React, { useCallback, useState } from "react";
import socket from "../../config/socket";
import { IMessageData } from "../../interfaces/user/IMessageInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput: React.FC = React.memo(() => {
  const { role, userData } = useSelector((state: RootState) => state.auth);
  const currentUserId = userData?._id;
  const [message, setMessage] = useState("");

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      // const sender = role === "salon" ? "salon" : "user";
      const newMessage: IMessageData = {
        content: message,
        timestamp: new Date(),
        userId: currentUserId,
      };
      socket.emit("send_message", newMessage);
      setMessage("");
    }
  }, [message, role, currentUserId]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    socket.emit("typing", currentUserId);
  };

  return (
    <div className="flex items-center p-1 border-t border-gray-300">
      <input
        type="text"
        className="flex-1 p-2 text-xs rounded-md border"
        placeholder="Type a Message"
        value={message}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button onClick={handleSendMessage} className="ml-1 bg-green-700 text-white p-2 text-sm rounded-md">
        <FaPaperPlane />
      </button>
    </div>
  );
});

export default MessageInput;
