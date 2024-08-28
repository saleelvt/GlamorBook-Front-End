import React, {  useState } from "react";

import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginAdmin } from "../../../reduxKit/actions/auth/authActions";

const AdminLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading } = useSelector(
    (state: RootState) => state.auth
  );


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginAdmin({ email, password }));
    navigate('/adminHomepage')
  };
  return (
    <div
     
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-red-900"
    >
      <div className="bg-white p-12  rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-   text-gray text-center">
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium  text-gray"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
