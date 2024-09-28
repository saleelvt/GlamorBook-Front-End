import { FC, useState } from "react";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import SalonForgotBG from "../../../assets/images/frogotePassG.png";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { URL, config } from "../../../config/constants";

const SalonResetPassword: FC = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const param = params.get("token");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // States to handle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const handlePasswordSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await passwordSchema.validate({ password });
      if (password !== passwordAgain) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }

      const data = { password, param };

      console.log("🚀 data inside theater reset password", data);

      await axios
        .post(`${URL}/salon/resetPassword`, { data }, config)
        .then(({ data }) => {
          if (data.success) {
            toast.success("Password reset successfully");
            setLoading(false);
            setResetSuccess(true);
          } else {
            toast.error("Error resetting password");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Error resetting password:", error);
          setError("Failed to reset password");
          setLoading(false);
        });
    } catch (validationError) {
      setError(
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      );
      setLoading(false);
    }
  };

  return (
    <div className="py-20 lg:flex lg:items-center justify-center ">
      <div className="lg:w-2/6 lg:ml-24 md:ml-56 xs:w-24  md:w-1/2 rounded-lg">
        <img className="rounded-lg shadow-lg" src={SalonForgotBG} alt="slaonForgotbg" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 bg-gray-200  shadow-xl rounded-3xl">
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">
            Salon<span className="">Reset</span>
          </p>
        </div>
        <h1 className="text-2xl my-7 font-bold">Reset your Password</h1>

        {/* Password Input */}
        <div className="flex items-center gap-3 border border-gray-200 shadow-sm p-2 rounded-lg my-2">
          <AiOutlineLock className="text-xl" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your new password"
            className="bg-transparent outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
            {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="flex items-center gap-3 border border-gray-200 shadow-sm p-2 rounded-lg my-5">
          <AiOutlineLock className="text-xl" />
          <input
            type={showPasswordAgain ? "text" : "password"}
            name="passwordAgain"
            placeholder="Enter your new password again"
            className="bg-transparent outline-none w-full"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <span onClick={() => setShowPasswordAgain(!showPasswordAgain)} className="cursor-pointer">
            {showPasswordAgain ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
          </span>
        </div>

        {error && <p className="my-2 text-red-400">{error}</p>}

        <div className="text-center">
          <button
            className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md p-2 w-full"
            onClick={handlePasswordSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset"}
          </button>
        </div>

        {resetSuccess && (
          <div className="mt-5">
            <h1 className="my-4">Your password has been reset successfully.</h1>
            <div className="flex items-center justify-center">
              <Link
                className="bg-red-600 hover:bg-red-800 rounded-md p-2"
                to="/salonLogin"
              >
                Go to Salon Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonResetPassword;
