import React, { useCallback, useState } from "react";

const MessageInput: React.FC = React.memo(() => {
  const [message, setMessage] = useState("");
  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      // this is the logic section for cteate the message time
      console.log("Messege sended from input ", message);
      setMessage("");
    }
  }, []);

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
