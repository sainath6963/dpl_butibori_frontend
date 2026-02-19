import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-us", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl">
      
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-gray-800">
          Welcome, {user?.name || "Guest"} 
        </h1>
        <span className="text-sm text-gray-500">{currentDate}</span>
      </div>

      
      <div className="flex items-center gap-6">
        
        
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-lg font-semibold text-gray-800">
            {currentTime}
          </span>
          <span className="text-sm text-gray-500">{currentDate}</span>
        </div>

       
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition">
          <img src={userIcon} alt="user" className="w-6 h-6" />
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "User"}
          </span>
        </div>

      
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition" onClick={()=>dispatch(toggleSettingPopup())}>
          <img src={settingIcon} className="w-6 h-6" alt="settings" />
        </button>
      </div>
    </header>
  );
};

export default Header;
