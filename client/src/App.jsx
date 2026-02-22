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
import PressConferencePage from "./pages/PressConference";
import AuctionDaysPage from "./pages/AuctionDays";
import Header from "./layout/Header"; // Import Header
import VideoDetailPage from "./pages/VideoDetailPage";
import TrialDaySelection from "./pages/TrialDaySelection";
import DayOne from "./pages/DayOne";

// Layout component to wrap pages with Header
const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-[72px] min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
};

const App = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      console.log("Admin detected, fetching data...");
    }
  }, [isAuthenticated, user, dispatch]);

  console.log("App - User:", user);
  console.log("App - isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public pages with Header */}
        <Route path="/" element={
          <PageLayout>
            <FrontPageDpl />
          </PageLayout>
        } />
        <Route path="/press-conference" element={
          <PageLayout>
            <PressConferencePage />
          
        </PageLayout>
        } />
        <Route path="/auctiondays" element={
          <PageLayout>
            <AuctionDaysPage />     
          </PageLayout>
        } />
        <Route path="/trialdayselection" element={
          <PageLayout>
            <TrialDaySelection />     
          </PageLayout>
        } />
        <Route path="/videos" element={
          <PageLayout>
            <VideoDetailPage />
          </PageLayout>
        } />
        <Route path="/dayone" element={
          <PageLayout>
            <DayOne />
          </PageLayout>
        } />

        
        {/* Auth pages without Header (clean layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Protected Home Route with Header */}
        <Route path="/home" element={
          <PageLayout>
            <Home />
          </PageLayout>
        } />
        <Route path="/dashboard" element={
          <PageLayout>
            <Home />
          </PageLayout>
        } />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;