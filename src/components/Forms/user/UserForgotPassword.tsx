import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import ForgotBG from "../../../assets/images/forgot-password.png";

function UserForgotPassword() {
  return (
    <div>
      <div className="py-20 lg:flex  lg:items-center">
        <div className="lg:w-1/3  md:ml-12 sm:ml-12 lg:ml-12 ">
          <img src={ForgotBG} alt="ForgotBG" />
        </div>
        <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 sm:mt-12 lg:p-10 border md:w-2/3 md:mt-12 border-gray-600 rounded-2xl">
          <div className="flex items-center justify-center">
            <p className="text-3xl font-bold">
              Glamor<span className="text-green-500">B</span>ook
            </p>
          </div>
          <h1 className="text-2xl my-5 font-bold">Reset your Password</h1>
          <p>
            <label htmlFor="username">Email Address</label>
          </p>
          <div className="flex items-center gap-3 border shadow-sm p-2 rounded-lg my-2">
            <AiOutlineMail className="text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="bg-transparent outline-none w-full"
              // value={}
              // onChange={}
            />
          </div>

          {/* {errors && <p className="my-2 text-red-400">{errors}</p>} */}

          <div className="text-center ">
            <button
              className="bg-blue-600 hover:bg-blue-900 p-2 w-full rounded-lg"
              // onClick={}
              // disabled={

              // }
            >
              CLICK
              {/* { ? "Loading..." : "Reset"} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForgotPassword;
