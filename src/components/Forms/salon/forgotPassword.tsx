import React, { FC, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import ForgotBG from "../../../assets/images/service-men-1.jpg";
// import { forgotPassword } from "../../../reduxKit/actions/user/userActions";
import { salonForgotPassword } from "../../../reduxKit/actions/salon/salonActions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../reduxKit/store";

const ForgetPassword: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (email.trim() === "") {
      setError("Enter an email to continue");
      setLoading(false); // Reset loading state if error occurs
      return;
    }


    dispatch(salonForgotPassword(email)).then((res) => {
      console.log(res, "result here ");

      if (res.type && res.type.endsWith("fulfilled")) {
        toast.success("Password reset email sent");
        setLoading(false);
      } else {
        toast.error("Failed to send password reset email");
        setLoading(false);
      }
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-red-200">
      <img
        src={ForgotBG}
        alt="ForgotBG"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 w-full max-w-lg p-8 md:p-10 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-center mb-6">
          <p className="text-3xl font-bold">
            Glamor<span className="text-green-500">B</span>ook
          </p>
        </div>
        <h1 className="text-2xl font-bold mb-5 text-center">
          Reset Your Password
        </h1>
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 border shadow-sm p-2 rounded-lg mt-1">
              <AiOutlineMail className="text-2xl text-gray-500" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="bg-transparent outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors && <p className="my-2 text-red-400">{errors}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              
              className="bg-gradient-to-tr from-pink-600 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
