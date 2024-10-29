import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";

import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import { config } from "../../../config/constants";

export const UserList: React.FC = React.memo(() => {
  const [users, setUsers] = useState<UserSignupdata[]>([]);

  const getchat = () => {
    console.log("got the chat");
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        console.log("99999999999999999999999999999999999999");
        const datas = await commonRequest("GET", "/salon/getAllUsers", config);
        setUsers(datas.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    getAllUsers();
  }, []);

  if (users) {
    console.log(users, "_____________________");
  }

  return (
    <div className="rounded-sm p-1 bg-green-200">
      <table className="w-1/2 h-96 bg-white border shadow-sm border-gray-300 rounded-md">
        <thead className="border h-12 border-gray-300">
          <tr className="text-center font-serif">
            <th>UserName</th>
            <th>Number</th>
            <th>Booking</th>
            <th>Chat</th>
          </tr>
        </thead>
        <tbody>
          {users.map((User,index) => (
            <tr key={index} className="border bg-green-100 text-center">
              <td className="p-4 border border-gray-300">{User.userName}</td>
              <td className="p-4 border border-gray-300">{User.email}</td>
              <td className="p-4 border border-gray-300">{User._id}</td>
              <td className="border border-gray-300">
                <button
                  onClick={getchat}
                  className="p-1 bg-green-400 text-white rounded hover:bg-green-600"
                >
                  Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
