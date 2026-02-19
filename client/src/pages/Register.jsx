import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

useEffect(() => {
  if (message) {
    navigateTo(`/otp-verification/${email}`);
  }

  if (error) {
    toast.error(error);
    dispatch(resetAuthSlice());
  }
}, [message, error]);



  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      
      <div
        className="hidden md:flex flex-col justify-between w-1/2 p-14 relative 
    bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden"
      >
       
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10">
          <img
            src={logo_with_title}
            alt="Logo"
            className="w-44 opacity-95 drop-shadow-lg"
          />

          <h2 className="text-4xl font-bold mt-16 leading-snug tracking-wide">
            Create your account <br /> and start your journey
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline font-semibold hover:text-gray-200"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="relative z-10 text-sm text-gray-400 opacity-80">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>


      <div className="flex justify-center items-center w-full md:w-1/2 px-6 md:px-16 py-10">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Register</h1>

          <form onSubmit={handleRegister} className="space-y-4">
         
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                focus:ring-black focus:border-black outline-none transition"
              />
            </div>

          
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                focus:ring-black focus:border-black outline-none transition"
              />
            </div>

           
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                focus:ring-black focus:border-black outline-none transition"
              />
            </div>

            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold 
              hover:bg-gray-800 transition active:scale-95"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            
            <p className="text-center text-gray-600 text-sm md:hidden">
              Already have an account?
              <Link
                to="/login"
                className="text-black font-semibold ml-1 underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
