import React, { useState, useEffect } from "react";
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { UpdatePassword } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SettingPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isUpdated } = useSelector((state) => state.auth);
  const showPopup = useSelector((state) => state.popup.settingPopup);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  useEffect(() => {
    if (isUpdated) {
      dispatch(toggleSettingPopup());
      navigate("/login");
    }
  }, [isUpdated]);

  if (!showPopup) return null;

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const data = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(UpdatePassword(data));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => dispatch(toggleSettingPopup())}
    >
      <div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-[90%] max-w-xl animate-[popupScale_.3s_ease] border border-white/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
          <button
            onClick={() => dispatch(toggleSettingPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-7 h-7" alt="close" />
          </button>
        </div>

        
        <form
          onSubmit={handleUpdatePassword}
          className="bg-gray-50 p-4 rounded-lg border shadow-sm space-y-4"
        >
          <label className="text-sm font-medium text-gray-700">
            Change Password
          </label>

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        
        <style>
          {`
            @keyframes popupScale {
              0% { transform: scale(0.85); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default SettingPopup;
