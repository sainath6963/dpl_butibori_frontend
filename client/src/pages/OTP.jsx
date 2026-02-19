import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }

    if (message && isAuthenticated) {
      toast.success(message);
    }
  }, [error, message, isAuthenticated, dispatch]);

  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen w-full flex bg-gray-100">

    
      <div className="hidden md:flex flex-col justify-between w-1/2 p-14 relative 
          bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">

       
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl 
            -translate-x-1/2 -translate-y-1/2"></div>

        
        <div className="relative z-10">
          <img
            src={logo_with_title}
            alt="Logo"
            className="w-44 opacity-95 drop-shadow-lg"
          />

          <h2 className="text-4xl font-bold mt-16 leading-snug tracking-wide">
            Verify Your Email
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            We've sent a 6-digit OTP to:
            <br />
            <span className="font-semibold text-white">{email}</span>
          </p>

      
          <div className="mt-10 flex gap-4">
            <a
              href="/login"
              className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="px-5 py-2 rounded-lg border border-white text-white font-semibold 
              hover:bg-white hover:text-black transition"
            >
              Register
            </a>
          </div>
          
        </div>

        <p className="relative z-10 text-sm text-gray-400 opacity-80">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex justify-center items-center w-full md:w-1/2 px-6 md:px-16 py-10">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
          
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            OTP Verification
          </h1>

          <p className="text-center text-gray-600 mb-6">
            Enter the OTP sent to your email:
            <span className="font-medium block">{email}</span>
          </p>

          <form onSubmit={handleOtpVerification} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                required
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                focus:ring-black focus:border-black outline-none text-center text-xl tracking-widest 
                transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold 
              hover:bg-gray-800 transition active:scale-95"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-600">
            Didn't receive OTP?
            <button
              className="ml-1 text-black font-semibold underline"
              onClick={() => dispatch(otpVerification(email))}
            >
              Resend
            </button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default OTP;
