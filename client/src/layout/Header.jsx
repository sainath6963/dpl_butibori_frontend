import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  User, 
  Bell, 
  ChevronDown,
  Clock,
  Calendar,
  LogOut,
  HelpCircle,
  Menu,
  Home,
  Video,
  Camera,
  Trophy,
  Users,
  Phone,
  X,
  Gavel,

} from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [greeting, setGreeting] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      setCurrentTime(`${formattedHours}:${minutes}:${seconds} ${ampm}`);

      const options = { 
        weekday: 'short',
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      };
      setCurrentDate(now.toLocaleDateString("en-us", options));

      if (hours < 12) setGreeting("Good Morning");
      else if (hours < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "GU";
    return user.name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Navigation items
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Videos', icon: Video, path: '/videos' },
    { name: 'Press Conference', icon: Camera, path: '/press-conference' },
    {name: 'Auction Days', icon:   Gavel,path: '/auctiondays'},
    {name: 'Trail Days', icon: Users, path: '/trialdayselection' },
    { name: 'Day 1', icon: Calendar, path: '/dayone' },
    { name: 'Day 2', icon: Calendar, path: '/daytwo' },
    /* { name: 'Teams', icon: Users, path: '/teams' },
    { name: 'Results', icon: Trophy, path: '/results' },
    { name: 'Contact', icon: Phone, path: '/contact' }, */
  ];

  // Check if a path is active
  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-lg px-4 md:px-6 py-3 fixed top-0 left-0 right-0 z-50 border-b border-blue-500/20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                <span className="text-white font-bold text-xl">DPL</span>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-sm font-bold text-white">DPL 2026</h2>
                <p className="text-xs text-blue-300/70">Season 2</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    isActivePath(item.path)
                      ? item.highlight
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 shadow-lg shadow-amber-500/20'
                        : 'bg-blue-500/20 text-white border border-blue-500/30'
                      : item.highlight
                        ? 'bg-gradient-to-r from-amber-500/10 to-amber-400/10 text-amber-400 hover:from-amber-500/20 hover:to-amber-400/20 border border-amber-500/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${
                    isActivePath(item.path) && item.highlight ? 'text-slate-900' : ''
                  }`} />
                  {item.name}
                  
                  {/* Active Indicator */}
                  {isActivePath(item.path) && !item.highlight && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-400 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors relative"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
              
              {/* Notification Badge for Mobile */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full lg:hidden"></span>
            </motion.button>
          </div>

          {/* Right Section - Time, Actions & User Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Time Display - Desktop */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-blue-500/20 px-4 py-2 rounded-xl"
            >
              <Clock className="w-4 h-4 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-sm font-mono font-semibold text-white">
                  {currentTime}
                </span>
                <span className="text-xs text-blue-300/70">
                  {currentDate}
                </span>
              </div>
            </motion.div>

            {/* Time Display - Mobile (Compact) */}
            <div className="md:hidden flex items-center bg-white/5 rounded-lg px-2 py-1 border border-blue-500/20">
              <Clock className="w-3 h-3 text-blue-400 mr-1" />
              <span className="text-xs font-mono text-white">
                {currentTime.split(':')[0]}:{currentTime.split(':')[1]} {currentTime.split(' ')[1]}
              </span>
            </div>

            {/* Press Conference Button - Mobile/Tablet */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/press-conference')}
              className="lg:hidden bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 px-3 py-2 rounded-xl font-medium text-xs md:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Camera className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Press</span>
            </motion.button>


          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden relative z-10"
            >
              <div className="py-4 border-t border-blue-500/20">
                {/* Mobile Time & Date Display */}
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {currentTime}
                      </p>
                      <p className="text-xs text-blue-300/70">
                        {currentDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-400">{greeting}</span>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        navigate(item.path);
                        setShowMobileMenu(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActivePath(item.path)
                          ? item.highlight
                            ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900'
                            : 'bg-blue-500/20 text-white border border-blue-500/30'
                          : item.highlight
                            ? 'bg-gradient-to-r from-amber-500/10 to-amber-400/10 text-amber-400 border border-amber-500/20'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${
                        isActivePath(item.path) && item.highlight ? 'text-slate-900' : ''
                      }`} />
                      {item.name}
                      
                      {/* Active Indicator Dot */}
                      {isActivePath(item.path) && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-blue-400"></span>
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-blue-500/20">
                  <p className="text-xs text-blue-300/70 px-4 mb-2">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl text-xs text-white transition-colors">
                      <Bell className="w-3 h-3 text-blue-400" />
                      Notifications
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl text-xs text-white transition-colors">
                      <HelpCircle className="w-3 h-3 text-blue-400" />
                      Help
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </motion.header>
    </>
  );
};

export default Header;