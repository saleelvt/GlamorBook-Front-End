
import React from "react"

import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import MessageList from "./MessageInput";
import MessageInput from "./MessageInput";
const ChatWindow : React.FC= React.memo(()=>{


      const {role}=useSelector((state:RootState)=> state.auth)

      const headerTitle = role === 'salon' ? 'Client Chat' : 'Salon Chat';

      return (
        <div className="fixed bottom-20 right-4 w-80 max-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center py-3">
            <h3 className="text-lg font-semibold">{headerTitle}</h3>
          </header>
          <MessageList  />
          <MessageInput />
        </div>
      );

})

export default ChatWindow