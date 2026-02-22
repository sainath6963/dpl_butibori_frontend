// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login, resetAuthSlice } from "../store/slices/authSlice";
// import { Navigate, Link, useNavigate } from "react-router-dom"; // Add useNavigate
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Add navigate hook
//   const { loading, error, message, isAuthenticated, user } = useSelector(
//     (state) => state.auth
//   );

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("email", email);
//     data.append("password", password);
//     dispatch(login(data));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//     if (message) {
//       toast.success(message);
//     }
//   }, [dispatch, error, message]);

//   // Redirect to dashboard when authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log("Login successful - Redirecting to dashboard");
//       console.log("User role:", user?.role);
      
//       // Small delay to ensure state is updated
//       setTimeout(() => {
//         navigate("/home"); // Navigate to home/dashboard
//       }, 100);
//     }
//   }, [isAuthenticated, navigate, user]);

//   // If already authenticated, redirect to home
//   if (isAuthenticated) {
//     return <Navigate to="/home" replace />;
//   }

//   return (
//     <div className="min-h-screen w-full flex bg-gradient-to-br from-emerald-50 to-amber-50">
//       {/* Left Section - Cricket Themed */}
//       <div className="hidden lg:flex flex-col justify-between w-1/2 p-14 relative 
//         bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 text-white overflow-hidden">

//         {/* Cricket Field Pattern Background */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{ 
//             backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 10px)'
//           }}></div>
//           {/* Pitch Lines */}
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-96 border-2 border-white/20"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-40 border-2 border-white/20"></div>
//           {/* Cricket Stumps Silhouette */}
//           <div className="absolute bottom-20 right-20 opacity-20">
//             <div className="flex gap-2">
//               {[1,2,3].map(i => (
//                 <div key={i} className="w-2 h-16 bg-white rounded-t-lg"></div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Floating Cricket Elements */}
//         <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce">🏏</div>
//         <div className="absolute bottom-40 right-20 text-6xl opacity-20 animate-pulse">⚾</div>
//         <div className="absolute top-40 right-40 text-7xl opacity-10 rotate-12">🏆</div>

//         {/* Animated Gradient Orbs */}
//         <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 right-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl 
//           -translate-x-1/2 -translate-y-1/2 animate-pulse delay-700" />

//         <div className="relative z-10">
//           {/* Tournament Tagline */}
//           <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//             <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
//             <span className="text-amber-400 text-sm font-medium tracking-wider">DPL SEASON 2 • 2026</span>
//           </div>

//           <h2 className="text-5xl font-black mt-10 leading-tight tracking-tight">
//             <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
//               CRICKET
//             </span>
//             <br />
//             <span className="text-white">ADMIN PORTAL</span>
//           </h2>

//           <p className="mt-6 text-gray-200 text-lg max-w-md">
//             Manage teams, schedules, scores, and tournament statistics from one central dashboard.
//           </p>

//           {/* Stats Preview */}
//           <div className="mt-10 grid grid-cols-3 gap-4">
//             {[
//               { number: '16', label: 'Teams', icon: '👥' },
//               { number: '32', label: 'Matches', icon: '📅' },
//               { number: '1000+', label: 'Players', icon: '🏃' },
//             ].map((stat, i) => (
//               <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
//                 <div className="text-2xl mb-1">{stat.icon}</div>
//                 <div className="text-xl font-bold text-amber-400">{stat.number}</div>
//                 <div className="text-xs text-gray-300">{stat.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Match Status Ticker */}
//           <div className="mt-10 bg-white/5 backdrop-blur-sm rounded-lg py-2 px-4 border border-white/10">
//             <div className="flex items-center gap-3 text-sm">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//               </span>
//               <span className="text-amber-400 font-medium">LIVE:</span>
//               <span className="text-gray-300 truncate">Mumbai Strikers vs Pune Warriors • Match 7</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative z-10 flex items-center justify-between">
//           <p className="text-sm text-gray-400">
//             © {new Date().getFullYear()} DPL Cricket League. All rights reserved.
//           </p>
//           <div className="flex gap-3">
//             <a href="#" className="text-gray-400 hover:text-amber-400 transition">
//               <i className="fa-brands fa-instagram"></i>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-amber-400 transition">
//               <i className="fa-brands fa-x-twitter"></i>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-amber-400 transition">
//               <i className="fa-brands fa-youtube"></i>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Login Form */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 px-6 md:px-16 py-10">
//         <div className="w-full max-w-md">
//           {/* Mobile Logo */}
//           <div className="lg:hidden text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
//             <p className="text-gray-500 text-sm mt-1">Access tournament management dashboard</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm w-full p-8 rounded-2xl shadow-xl border border-gray-200">
//             {/* Cricket-themed header */}
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg transform -rotate-12">
//                 <span className="text-2xl">🏏</span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
//                 <p className="text-sm text-gray-500">Login to continue to dashboard</p>
//               </div>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-5">
//               {/* Email Field */}
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   <i className="fa-regular fa-envelope mr-2 text-amber-500"></i>
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="admin@dplcricket.com"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 
//                   focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none 
//                   transition bg-gray-50/50"
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   <i className="fa-solid fa-lock mr-2 text-amber-500"></i>
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     required
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 
//                     focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none 
//                     transition bg-gray-50/50 pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500"
//                   >
//                     <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 text-sm text-gray-600">
//                   <input 
//                     type="checkbox" 
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="rounded border-gray-300 text-amber-500 focus:ring-amber-400" 
//                   />
//                   <span>Remember me</span>
//                 </label>
//                 <Link
//                   to="/password/forgot"
//                   className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-white py-3.5 
//                 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
//                 transform hover:scale-[1.02] transition-all duration-300 
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 relative overflow-hidden group"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       <span>Logging in...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Login to Dashboard</span>
//                       <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
//                     </>
//                   )}
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500">Tournament Access</span>
//               </div>
//             </div>

//             {/* Register Link */}
//             <p className="text-center text-sm text-gray-600">
//               New to DPL Tournament?{' '}
//               <Link to="/register" className="font-bold text-amber-600 hover:text-amber-700 hover:underline">
//                 Register as Admin
//               </Link>
//             </p>

//             {/* Quick Tips */}
//             <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
//               <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
//                 <i className="fa-regular fa-lightbulb mr-1"></i>
//                 Quick Tips
//               </h4>
//               <ul className="text-xs text-amber-700 space-y-1">
//                 <li>• Use your registered email to login</li>
//                 <li>• Contact support for password reset</li>
//                 <li>• Keep your credentials secure</li>
//               </ul>
//             </div>
//           </div>

//           {/* Mobile Social Links */}
//           <div className="lg:hidden flex justify-center gap-4 mt-8">
//             <a href="#" className="text-gray-400 hover:text-amber-500 transition text-xl">
//               <i className="fa-brands fa-instagram"></i>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-amber-500 transition text-xl">
//               <i className="fa-brands fa-x-twitter"></i>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-amber-500 transition text-xl">
//               <i className="fa-brands fa-youtube"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { Navigate, Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigate hook
  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  // Redirect to dashboard when authenticated
    useEffect(() => {
    if (isAuthenticated) {
      console.log("Login successful - Redirecting to dashboard");
      console.log("User role:", user?.role);
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate("/home"); // Navigate to home/dashboard
      }, 100);
    }
  }, [isAuthenticated, navigate, user]);

  // If already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#F8FAFC] to-white">
      {/* Left Section - Cricket Themed */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-14 relative 
        bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white overflow-hidden">

        {/* Cricket Field Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 10px)'
          }}></div>
          {/* Pitch Lines */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-96 border-2 border-white/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-40 border-2 border-white/20"></div>
          {/* Cricket Stumps Silhouette */}
          <div className="absolute bottom-20 right-20 opacity-20">
            <div className="flex gap-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-2 h-16 bg-white rounded-t-lg"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Cricket Elements */}
        <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce">🏏</div>
        <div className="absolute bottom-40 right-20 text-6xl opacity-20 animate-pulse">⚾</div>
        <div className="absolute top-40 right-40 text-7xl opacity-10 rotate-12">🏆</div>

        {/* Animated Gradient Orbs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#94A3B8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#F1F5F9]/10 rounded-full blur-2xl 
          -translate-x-1/2 -translate-y-1/2 animate-pulse delay-700" />

        <div className="relative z-10">
          {/* Tournament Tagline */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            <span className="text-white text-sm font-medium tracking-wider">DPL SEASON 2 • 2026</span>
          </div>

          <h2 className="text-5xl font-black mt-10 leading-tight tracking-tight">
            <span className="text-white">
              CRICKET
            </span>
            <br />
            <span className="text-white/90">ADMIN PORTAL</span>
          </h2>

          <p className="mt-6 text-[#F1F5F9] text-lg max-w-md">
            Manage teams, schedules, scores, and tournament statistics from one central dashboard.
          </p>

          {/* Stats Preview */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { number: '16', label: 'Teams', icon: '👥' },
              { number: '32', label: 'Matches', icon: '📅' },
              { number: '1000+', label: 'Players', icon: '🏃' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-white">{stat.number}</div>
                <div className="text-xs text-[#F1F5F9]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Match Status Ticker */}
          <div className="mt-10 bg-white/5 backdrop-blur-sm rounded-lg py-2 px-4 border border-white/10">
            <div className="flex items-center gap-3 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-white font-medium">LIVE:</span>
              <span className="text-[#F1F5F9] truncate">Mumbai Strikers vs Pune Warriors • Match 7</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <p className="text-sm text-[#94A3B8]">
            © {new Date().getFullYear()} DPL Cricket League. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a href="#" className="text-[#94A3B8] hover:text-white transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-[#94A3B8] hover:text-white transition">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="text-[#94A3B8] hover:text-white transition">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 px-6 md:px-16 py-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0A2472]">Admin Login</h2>
            <p className="text-[#1E293B] text-sm mt-1">Access tournament management dashboard</p>
          </div>

          <div className="bg-white w-full p-8 rounded-2xl shadow-xl border border-[#E2E8F0]">
            {/* Cricket-themed header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#0A2472] rounded-xl flex items-center justify-center shadow-lg transform -rotate-12">
                <span className="text-2xl">🏏</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0A2472]">Welcome Back</h1>
                <p className="text-sm text-[#1E293B]">Login to continue to dashboard</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block mb-2 font-medium text-[#1E293B]">
                  <i className="fa-regular fa-envelope mr-2 text-[#94A3B8]"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dplcricket.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] 
                  focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] outline-none 
                  transition bg-[#F8FAFC]"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 font-medium text-[#1E293B]">
                  <i className="fa-solid fa-lock mr-2 text-[#94A3B8]"></i>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] 
                    focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] outline-none 
                    transition bg-[#F8FAFC] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#0A2472]"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#1E293B]">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#E2E8F0] text-[#0A2472] focus:ring-[#0A2472]" 
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/password/forgot"
                  className="text-sm font-medium text-[#0A2472] hover:text-[#1E293B] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2472] text-white py-3.5 
                rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
                transform hover:scale-[1.02] transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-[#1E293B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#1E293B]">Tournament Access</span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-[#1E293B]">
              New to DPL Tournament?{' '}
              <Link to="/register" className="font-bold text-[#0A2472] hover:text-[#1E293B] hover:underline">
                Register as Admin
              </Link>
            </p>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <h4 className="text-xs font-semibold text-[#0A2472] uppercase tracking-wider mb-2">
                <i className="fa-regular fa-lightbulb mr-1"></i>
                Quick Tips
              </h4>
              <ul className="text-xs text-[#1E293B] space-y-1">
                <li>• Use your registered email to login</li>
                <li>• Contact support for password reset</li>
                <li>• Keep your credentials secure</li>
              </ul>
            </div>
          </div>

          {/* Mobile Social Links */}
          <div className="lg:hidden flex justify-center gap-4 mt-8">
            <a href="#" className="text-[#94A3B8] hover:text-[#0A2472] transition text-xl">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-[#94A3B8] hover:text-[#0A2472] transition text-xl">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="text-[#94A3B8] hover:text-[#0A2472] transition text-xl">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;