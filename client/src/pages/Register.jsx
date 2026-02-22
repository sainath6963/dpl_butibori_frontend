// import React, { useEffect, useState } from "react";
// // import logo from "../assets/black-logo.png";
// // import logo_with_title from "../assets/logo-with-title.png";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { register, resetAuthSlice } from "../store/slices/authSlice";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);

//   const dispatch = useDispatch();
//   const { loading, error, message, user, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   const navigateTo = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();
    
//     // Password validation
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }
    
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long!");
//       return;
//     }
    
//     if (!agreeTerms) {
//       toast.error("Please agree to the terms and conditions!");
//       return;
//     }
    
//     const data = new FormData();
//     data.append("name", name);
//     data.append("email", email);
//     data.append("password", password);
//     dispatch(register(data));
//   };

//   useEffect(() => {
//     if (message) {
//       toast.success("Registration successful! Please verify your email.");
//       navigateTo(`/otp-verification/${email}`);
//     }

//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//   }, [message, error, email, navigateTo, dispatch]);

//   if (isAuthenticated) {
//     return <Navigate to={"/"} />;
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
//           {/* Cricket Bats */}
//           <div className="absolute top-40 left-20 opacity-20 transform -rotate-45">
//             <div className="w-4 h-32 bg-white rounded-full"></div>
//             <div className="w-12 h-6 bg-white rounded-full mt-[-10px] ml-[-4px]"></div>
//           </div>
//         </div>

//         {/* Floating Cricket Elements */}
//         <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce">🏏</div>
//         <div className="absolute bottom-40 right-20 text-6xl opacity-20 animate-pulse">⚾</div>
//         <div className="absolute top-40 right-40 text-7xl opacity-10 rotate-12">🏆</div>
//         <div className="absolute bottom-20 left-40 text-5xl opacity-10 animate-spin-slow">🥎</div>

//         {/* Animated Gradient Orbs */}
//         <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 right-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl 
//           -translate-x-1/2 -translate-y-1/2 animate-pulse delay-700" />

//         <div className="relative z-10">

//           {/* Tournament Badge */}
//           <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//             <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
//             <span className="text-amber-400 text-sm font-medium tracking-wider">DPL SEASON 2 • REGISTRATION OPEN</span>
//           </div>

//           <h2 className="text-5xl font-black mt-10 leading-tight tracking-tight">
//             <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
//               JOIN THE
//             </span>
//             <br />
//             <span className="text-white">CRICKET LEAGUE</span>
//           </h2>

//           <p className="mt-6 text-gray-200 text-lg max-w-md">
//             Register as an administrator to manage teams, schedules, scores, and tournament statistics.
//           </p>

//           {/* Tournament Benefits */}
//           <div className="mt-10 space-y-4">
//             {[
//               { icon: '🏏', text: 'Full tournament management access' },
//               { icon: '📊', text: 'Real-time score updates' },
//               { icon: '👥', text: 'Team & player management' },
//               { icon: '🏆', text: 'Tournament statistics & analytics' },
//             ].map((benefit, i) => (
//               <div key={i} className="flex items-center gap-3 text-gray-200">
//                 <span className="text-2xl">{benefit.icon}</span>
//                 <span className="text-sm">{benefit.text}</span>
//               </div>
//             ))}
//           </div>

//           {/* Upcoming Matches Preview */}
//           <div className="mt-10 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
//             <h4 className="text-sm font-semibold text-amber-400 mb-3">UPCOMING MATCHES</h4>
//             <div className="space-y-2">
//               <div className="flex justify-between text-xs">
//                 <span>Mumbai Strikers vs Pune Warriors</span>
//                 <span className="text-amber-400">Today 7:30 PM</span>
//               </div>
//               <div className="flex justify-between text-xs">
//                 <span>Delhi Kings vs Chennai Smashers</span>
//                 <span className="text-amber-400">Tomorrow 4:00 PM</span>
//               </div>
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

//       {/* Right Section - Registration Form */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 px-6 md:px-16 py-10">
//         <div className="w-full max-w-md">
//           {/* Mobile Logo (visible only on mobile) */}
//           <div className="lg:hidden text-center mb-8">
//             {/* <img src={logo_with_title} alt="DPL Cricket League" className="h-16 mx-auto mb-4" /> */}
//             <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
//             <p className="text-gray-500 text-sm mt-1">Join DPL Tournament Management</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm w-full p-8 rounded-2xl shadow-xl border border-gray-200">
//             {/* Cricket-themed header */}
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg transform -rotate-12">
//                 <span className="text-2xl">🏏</span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">Register as Admin</h1>
//                 <p className="text-sm text-gray-500">Create your tournament account</p>
//               </div>
//             </div>

//             <form onSubmit={handleRegister} className="space-y-4">
//               {/* Full Name Field */}
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   <i className="fa-regular fa-user mr-2 text-amber-500"></i>
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   required
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 
//                   focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none 
//                   transition bg-gray-50/50"
//                 />
//               </div>

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
//                 <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                   <i className="fa-solid fa-lock mr-2 text-amber-500"></i>
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     required
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 
//                     focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none 
//                     transition bg-gray-50/50 pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500"
//                   >
//                     <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//                   </button>
//                 </div>
//               </div>

//               {/* Terms & Conditions */}
//               <div className="flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={agreeTerms}
//                   onChange={(e) => setAgreeTerms(e.target.checked)}
//                   className="mt-1 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
//                 />
//                 <label htmlFor="terms" className="text-xs text-gray-600">
//                   I agree to the{' '}
//                   <a href="#" className="text-amber-600 hover:underline">Terms of Service</a>
//                   {' '}and{' '}
//                   <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
//                   {' '}of DPL Cricket Tournament.
//                 </label>
//               </div>

//               {/* Register Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-white py-3.5 
//                 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
//                 transform hover:scale-[1.02] transition-all duration-300 
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 relative overflow-hidden group mt-6"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       <span>Creating Account...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Create Tournament Account</span>
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
//                 <span className="px-4 bg-white text-gray-500">Already registered?</span>
//               </div>
//             </div>

//             {/* Login Link */}
//             <p className="text-center text-sm text-gray-600">
//               Have an account?{' '}
//               <Link to="/login" className="font-bold text-amber-600 hover:text-amber-700 hover:underline">
//                 Sign In to Dashboard
//               </Link>
//             </p>

//             {/* Registration Benefits */}
//             <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
//               <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
//                 <i className="fa-regular fa-star mr-1"></i>
//                 Admin Benefits
//               </h4>
//               <ul className="text-xs text-amber-700 space-y-1">
//                 <li>• Full tournament management access</li>
//                 <li>• Real-time score updates</li>
//                 <li>• Team & player management</li>
//                 <li>• Tournament statistics dashboard</li>
//               </ul>
//             </div>

//             {/* OTP Info */}
//             <div className="mt-4 text-center">
//               <p className="text-xs text-gray-500">
//                 <i className="fa-regular fa-envelope mr-1"></i>
//                 You'll receive an OTP verification email after registration
//               </p>
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

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;


import React, { useEffect, useState } from "react";
// import logo from "../assets/black-logo.png";
// import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions!");
      return;
    }
    
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      toast.success("Registration successful! Please verify your email.");
      navigateTo(`/otp-verification/${email}`);
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, email, navigateTo, dispatch]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
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
          {/* Cricket Bats */}
          <div className="absolute top-40 left-20 opacity-20 transform -rotate-45">
            <div className="w-4 h-32 bg-white rounded-full"></div>
            <div className="w-12 h-6 bg-white rounded-full mt-[-10px] ml-[-4px]"></div>
          </div>
        </div>

        {/* Floating Cricket Elements */}
        <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce">🏏</div>
        <div className="absolute bottom-40 right-20 text-6xl opacity-20 animate-pulse">⚾</div>
        <div className="absolute top-40 right-40 text-7xl opacity-10 rotate-12">🏆</div>
        <div className="absolute bottom-20 left-40 text-5xl opacity-10 animate-spin-slow">🥎</div>

        {/* Animated Gradient Orbs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#94A3B8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#F1F5F9]/10 rounded-full blur-2xl 
          -translate-x-1/2 -translate-y-1/2 animate-pulse delay-700" />

        <div className="relative z-10">

          {/* Tournament Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            <span className="text-white text-sm font-medium tracking-wider">DPL SEASON 2 • REGISTRATION OPEN</span>
          </div>

          <h2 className="text-5xl font-black mt-10 leading-tight tracking-tight">
            <span className="text-white">
              JOIN THE
            </span>
            <br />
            <span className="text-white/90">CRICKET LEAGUE</span>
          </h2>

          <p className="mt-6 text-[#F1F5F9] text-lg max-w-md">
            Register as an administrator to manage teams, schedules, scores, and tournament statistics.
          </p>

          {/* Tournament Benefits */}
          <div className="mt-10 space-y-4">
            {[
              { icon: '🏏', text: 'Full tournament management access' },
              { icon: '📊', text: 'Real-time score updates' },
              { icon: '👥', text: 'Team & player management' },
              { icon: '🏆', text: 'Tournament statistics & analytics' },
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-[#F1F5F9]">
                <span className="text-2xl">{benefit.icon}</span>
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Upcoming Matches Preview */}
          <div className="mt-10 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-3">UPCOMING MATCHES</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Mumbai Strikers vs Pune Warriors</span>
                <span className="text-white">Today 7:30 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Delhi Kings vs Chennai Smashers</span>
                <span className="text-white">Tomorrow 4:00 PM</span>
              </div>
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

      {/* Right Section - Registration Form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 px-6 md:px-16 py-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo (visible only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            {/* <img src={logo_with_title} alt="DPL Cricket League" className="h-16 mx-auto mb-4" /> */}
            <h2 className="text-2xl font-bold text-[#0A2472]">Create Account</h2>
            <p className="text-[#1E293B] text-sm mt-1">Join DPL Tournament Management</p>
          </div>

          <div className="bg-white w-full p-8 rounded-2xl shadow-xl border border-[#E2E8F0]">
            {/* Cricket-themed header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#0A2472] rounded-xl flex items-center justify-center shadow-lg transform -rotate-12">
                <span className="text-2xl">🏏</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0A2472]">Register as Admin</h1>
                <p className="text-sm text-[#1E293B]">Create your tournament account</p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block mb-2 font-medium text-[#1E293B]">
                  <i className="fa-regular fa-user mr-2 text-[#94A3B8]"></i>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] 
                  focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] outline-none 
                  transition bg-[#F8FAFC]"
                />
              </div>

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
                <p className="text-xs text-[#94A3B8] mt-1">Minimum 6 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block mb-2 font-medium text-[#1E293B]">
                  <i className="fa-solid fa-lock mr-2 text-[#94A3B8]"></i>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] 
                    focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] outline-none 
                    transition bg-[#F8FAFC] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#0A2472]"
                  >
                    <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 rounded border-[#E2E8F0] text-[#0A2472] focus:ring-[#0A2472]"
                />
                <label htmlFor="terms" className="text-xs text-[#1E293B]">
                  I agree to the{' '}
                  <a href="#" className="text-[#0A2472] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#0A2472] hover:underline">Privacy Policy</a>
                  {' '}of DPL Cricket Tournament.
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2472] text-white py-3.5 
                rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
                transform hover:scale-[1.02] transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                relative overflow-hidden group mt-6"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Tournament Account</span>
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
                <span className="px-4 bg-white text-[#1E293B]">Already registered?</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-[#1E293B]">
              Have an account?{' '}
              <Link to="/login" className="font-bold text-[#0A2472] hover:text-[#1E293B] hover:underline">
                Sign In to Dashboard
              </Link>
            </p>

            {/* Registration Benefits */}
            <div className="mt-6 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <h4 className="text-xs font-semibold text-[#0A2472] uppercase tracking-wider mb-2">
                <i className="fa-regular fa-star mr-1"></i>
                Admin Benefits
              </h4>
              <ul className="text-xs text-[#1E293B] space-y-1">
                <li>• Full tournament management access</li>
                <li>• Real-time score updates</li>
                <li>• Team & player management</li>
                <li>• Tournament statistics dashboard</li>
              </ul>
            </div>

            {/* OTP Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-[#94A3B8]">
                <i className="fa-regular fa-envelope mr-1"></i>
                You'll receive an OTP verification email after registration
              </p>
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

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;