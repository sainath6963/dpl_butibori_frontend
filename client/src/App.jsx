import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import FrontPageDpl from "./pages/FrontPageDpl";

const App = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]); // Run only once on mount

  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      console.log("Admin detected, fetching data..."); // Debug log
      // dispatch(fetchAllUsers());
      // dispatch(fetchAllBooks());
      // dispatch(fetchUserBorrowedBooks());
    }
  }, [isAuthenticated, user, dispatch]);

  console.log("App - User:", user); // Debug log
  console.log("App - isAuthenticated:", isAuthenticated); // Debug log

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPageDpl />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Protected Home Route - Add this */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;