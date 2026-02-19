import React, { useState } from "react";
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleRegisterPopup } from "../store/slices/popUpSlice";

const RegisterPopup = () => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.popup.registerPopup);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    mobile: "",
    email: "",
    city: "",
    role: "",
    jerseyName: "",
  });

  if (!showPopup) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Player Registration:", formData);

    // 👉 Later connect API / Razorpay here
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => dispatch(toggleRegisterPopup())}
    >
      <div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-[95%] max-w-2xl animate-[popupScale_.3s_ease] border border-white/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Player Registration
          </h2>

          <button
            onClick={() => dispatch(toggleRegisterPopup())}
            className="hover:scale-110 transition"
          >
            <img src={closeIcon} className="w-7 h-7" alt="close" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-5 rounded-lg border shadow-sm grid md:grid-cols-2 gap-4"
        >
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <select
            name="role"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          >
            <option>Playing Role</option>
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All-Rounder</option>
            <option>Wicket Keeper</option>
          </select>

          <input
            name="jerseyName"
            placeholder="Jersey Name"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none md:col-span-2"
          />

          <button
            type="submit"
            className="md:col-span-2 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold rounded-lg hover:scale-[1.02] transition"
          >
            Submit Registration
          </button>
        </form>

        {/* Animation */}
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

export default RegisterPopup;
