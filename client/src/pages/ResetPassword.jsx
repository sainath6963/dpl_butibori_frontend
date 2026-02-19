import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuthSlice, resetPassword, resetPassword as ResetPasswordAction } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(data, token));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [error, message, dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">

      
        <div className="flex justify-center mb-6">
          <img
            src={logo_with_title}
            alt="Logo"
            className="w-48 object-contain"
          />
        </div>

      
        <h2 className="text-2xl font-semibold text-center mb-1">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your new password to continue
        </p>

     
        <form onSubmit={handleResetPassword} className="space-y-5">

          
          <div>
            <label className="text-gray-600 font-medium block mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        
          <div>
            <label className="text-gray-600 font-medium block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

       
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-medium transition
            ${loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"}`}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

        
        <div className="text-center mt-6">
          <Link to="/login" className="text-black font-medium hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
