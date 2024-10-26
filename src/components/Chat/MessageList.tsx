import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";

const MessageList: React.FC = React.memo(() => {
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <div className="p-4 h-64 overflow-y-scroll bg-gray-100">
      <div className="flex flex-col space-y-2">
        <div
          className={`self-start bg-blue-200 p-2 rounded-lg ${
            role === "salon" ? "bg-pink-200" : ""
          }`}
        >
          <p>Message from {role === "salon" ? "Client" : "Salon"}</p>
        </div>
        <div className="self-end bg-blue-500 text-white p-2 rounded-lg">
          <p>Your message</p>
        </div>
      </div>
    </div>
  );
});

export default MessageList;
