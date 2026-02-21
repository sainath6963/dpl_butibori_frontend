// components/PlayerRegistrationPopup.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPaymentOrder,
  verifyPayment
} from '../store/slices/paymentSlice';

import {
  clearPlayerError,
  clearPlayerSuccess
} from '../store/slices/playerSlice';
import { X, Upload, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const PlayerRegistrationPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.player);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    mobileNumber: '',
    height: '',
    weight: '',
    aadharNumber: '',
    dateOfBirth: '',
    isBatsman: false,
    isBowler: false,
    battingHand: '',
    bowlingArm: '',
    bowlingType: '',
    isWicketKeeper: false,
    playedTournament: false,
    tournaments: [],
    manOfTheMatch: false,
    manOfTheMatchDetails: [],
    manOfTheSeries: false,
    manOfTheSeriesDetails: [],
    documents: {
      playerPhoto: null,
      aadharCard: null,
      panCard: null,
      drivingLicense: null
    }
  });

  const [tournamentFields, setTournamentFields] = useState([]);
  const [momFields, setMomFields] = useState([]);
  const [mosFields, setMosFields] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    if (success) {
      toast.success('Registration successful!');
      setTimeout(() => {
        onClose();
        dispatch(clearPlayerSuccess());
        resetForm();
      }, 2000);
    }
  }, [success, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearPlayerError());
    }
  }, [error, dispatch]);

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      address: '',
      mobileNumber: '',
      height: '',
      weight: '',
      aadharNumber: '',
      dateOfBirth: '',
      isBatsman: false,
      isBowler: false,
      battingHand: '',
      bowlingArm: '',
      bowlingType: '',
      isWicketKeeper: false,
      playedTournament: false,
      tournaments: [],
      manOfTheMatch: false,
      manOfTheMatchDetails: [],
      manOfTheSeries: false,
      manOfTheSeriesDetails: [],
      documents: {
        playerPhoto: null,
        aadharCard: null,
        panCard: null,
        drivingLicense: null
      }
    });
    setTournamentFields([]);
    setMomFields([]);
    setMosFields([]);
    setSelectedFiles({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
      
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [fieldName]: file
        }
      }));
    }
  };

  const addTournament = (type) => {
    const newField = { tournament: '', year: '', ballType: 'Tennis' };
    if (type === 'tournament') {
      setTournamentFields([...tournamentFields, newField]);
    } else if (type === 'mom') {
      setMomFields([...momFields, newField]);
    } else if (type === 'mos') {
      setMosFields([...mosFields, newField]);
    }
  };

  const removeTournament = (index, type) => {
    if (type === 'tournament') {
      const updated = tournamentFields.filter((_, i) => i !== index);
      setTournamentFields(updated);
      setFormData(prev => ({
        ...prev,
        tournaments: updated
      }));
    } else if (type === 'mom') {
      const updated = momFields.filter((_, i) => i !== index);
      setMomFields(updated);
      setFormData(prev => ({
        ...prev,
        manOfTheMatchDetails: updated
      }));
    } else if (type === 'mos') {
      const updated = mosFields.filter((_, i) => i !== index);
      setMosFields(updated);
      setFormData(prev => ({
        ...prev,
        manOfTheSeriesDetails: updated
      }));
    }
  };

  const handleTournamentChange = (index, field, value, type) => {
    if (type === 'tournament') {
      const updated = [...tournamentFields];
      updated[index] = { ...updated[index], [field]: value };
      setTournamentFields(updated);
      setFormData(prev => ({
        ...prev,
        tournaments: updated
      }));
    } else if (type === 'mom') {
      const updated = [...momFields];
      updated[index] = { ...updated[index], [field]: value };
      setMomFields(updated);
      setFormData(prev => ({
        ...prev,
        manOfTheMatchDetails: updated
      }));
    } else if (type === 'mos') {
      const updated = [...mosFields];
      updated[index] = { ...updated[index], [field]: value };
      setMosFields(updated);
      setFormData(prev => ({
        ...prev,
        manOfTheSeriesDetails: updated
      }));
    }
  };

  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const submitData = new FormData();

  // Append fields
  Object.keys(formData).forEach(key => {
    if (key === "documents") {
      Object.keys(formData.documents).forEach(docKey => {
        if (formData.documents[docKey] instanceof File) {
          submitData.append(docKey, formData.documents[docKey]);
        }
      });
    } 
    else if (
      key === "tournaments" ||
      key === "manOfTheMatchDetails" ||
      key === "manOfTheSeriesDetails"
    ) {
      submitData.append(key, JSON.stringify(formData[key]));
    } 
    else {
      submitData.append(key, formData[key]);
    }
  });

  // 1️⃣ Create payment order
  const res = await dispatch(createPaymentOrder(submitData));

  if (!res.payload) {
    toast.error("Failed to initiate payment");
    return;
  }

  const { order, paymentId, key } = res.payload;

  // 2️⃣ Load Razorpay
  const loaded = await loadRazorpay();
  if (!loaded) {
    toast.error("Razorpay SDK failed to load");
    return;
  }

  // 3️⃣ Open Razorpay popup
  const options = {
    key,
    amount: order.amount,
    currency: order.currency,
    name: "DPL Tournament",
    description: "Player Registration Fee",
    order_id: order.id,

    handler: async function (response) {
      // 4️⃣ Verify payment
      const verifyRes = await dispatch(
        verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          paymentId
        })
      );

      if (verifyRes.payload) {
        toast.success("Registration Completed ✅");
        onClose();
        resetForm();
      }
    },

    theme: {
      color: "#2563eb"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Player Registration</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              
              {/* Basic Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      pattern="[0-9]{10}"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      pattern="[0-9]{12}"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Playing Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Playing Details</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isBatsman"
                        checked={formData.isBatsman}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Batsman
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isBowler"
                        checked={formData.isBowler}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Bowler
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isWicketKeeper"
                        checked={formData.isWicketKeeper}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Wicket Keeper
                    </label>
                  </div>

                  {formData.isBatsman && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Batting Hand
                      </label>
                      <select
                        name="battingHand"
                        value={formData.battingHand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Right Hand">Right Hand</option>
                        <option value="Left Hand">Left Hand</option>
                      </select>
                    </div>
                  )}

                  {formData.isBowler && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bowling Arm
                        </label>
                        <select
                          name="bowlingArm"
                          value={formData.bowlingArm}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="">Select</option>
                          <option value="Right Arm">Right Arm</option>
                          <option value="Left Arm">Left Arm</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bowling Type
                        </label>
                        <select
                          name="bowlingType"
                          value={formData.bowlingType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="">Select</option>
                          <option value="Pacer">Pacer</option>
                          <option value="Spinner">Spinner</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Tournament History */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Tournament History</h3>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="playedTournament"
                      checked={formData.playedTournament}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Have you played any tournaments before?
                  </label>
                </div>

                {formData.playedTournament && (
                  <div className="space-y-4">
                    {tournamentFields.map((field, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <input
                          type="text"
                          placeholder="Tournament Name"
                          value={field.tournament}
                          onChange={(e) => handleTournamentChange(index, 'tournament', e.target.value, 'tournament')}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="number"
                          placeholder="Year"
                          value={field.year}
                          onChange={(e) => handleTournamentChange(index, 'year', e.target.value, 'tournament')}
                          className="w-24 px-3 py-2 border rounded-lg"
                        />
                        <select
                          value={field.ballType}
                          onChange={(e) => handleTournamentChange(index, 'ballType', e.target.value, 'tournament')}
                          className="w-32 px-3 py-2 border rounded-lg"
                        >
                          <option value="Tennis">Tennis</option>
                          <option value="Leather">Leather</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeTournament(index, 'tournament')}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addTournament('tournament')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Add Tournament
                    </button>
                  </div>
                )}
              </div>

              {/* Awards */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Awards</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="manOfTheMatch"
                        checked={formData.manOfTheMatch}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Man of the Match
                    </label>
                    
                    {formData.manOfTheMatch && (
                      <div className="ml-6 space-y-2">
                        {momFields.map((field, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Tournament"
                              value={field.tournament}
                              onChange={(e) => handleTournamentChange(index, 'tournament', e.target.value, 'mom')}
                              className="flex-1 px-3 py-2 border rounded-lg"
                            />
                            <input
                              type="number"
                              placeholder="Year"
                              value={field.year}
                              onChange={(e) => handleTournamentChange(index, 'year', e.target.value, 'mom')}
                              className="w-24 px-3 py-2 border rounded-lg"
                            />
                            <select
                              value={field.ballType}
                              onChange={(e) => handleTournamentChange(index, 'ballType', e.target.value, 'mom')}
                              className="w-32 px-3 py-2 border rounded-lg"
                            >
                              <option value="Tennis">Tennis</option>
                              <option value="Leather">Leather</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeTournament(index, 'mom')}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addTournament('mom')}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Add Man of the Match
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="manOfTheSeries"
                        checked={formData.manOfTheSeries}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Man of the Series
                    </label>
                    
                    {formData.manOfTheSeries && (
                      <div className="ml-6 space-y-2">
                        {mosFields.map((field, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Tournament"
                              value={field.tournament}
                              onChange={(e) => handleTournamentChange(index, 'tournament', e.target.value, 'mos')}
                              className="flex-1 px-3 py-2 border rounded-lg"
                            />
                            <input
                              type="number"
                              placeholder="Year"
                              value={field.year}
                              onChange={(e) => handleTournamentChange(index, 'year', e.target.value, 'mos')}
                              className="w-24 px-3 py-2 border rounded-lg"
                            />
                            <select
                              value={field.ballType}
                              onChange={(e) => handleTournamentChange(index, 'ballType', e.target.value, 'mos')}
                              className="w-32 px-3 py-2 border rounded-lg"
                            >
                              <option value="Tennis">Tennis</option>
                              <option value="Leather">Leather</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeTournament(index, 'mos')}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addTournament('mos')}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Add Man of the Series
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Documents Upload</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Player Photo *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'playerPhoto')}
                        className="hidden"
                        id="playerPhoto"
                        required
                      />
                      <label
                        htmlFor="playerPhoto"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                      >
                        <Upload size={18} />
                        Upload Photo
                      </label>
                      {selectedFiles.playerPhoto && (
                        <span className="text-sm text-gray-600">
                          {selectedFiles.playerPhoto.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadhar Card *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'aadharCard')}
                        className="hidden"
                        id="aadharCard"
                        required
                      />
                      <label
                        htmlFor="aadharCard"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                      >
                        <Upload size={18} />
                        Upload Aadhar
                      </label>
                      {selectedFiles.aadharCard && (
                        <span className="text-sm text-gray-600">
                          {selectedFiles.aadharCard.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN Card
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'panCard')}
                        className="hidden"
                        id="panCard"
                      />
                      <label
                        htmlFor="panCard"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                      >
                        <Upload size={18} />
                        Upload PAN
                      </label>
                      {selectedFiles.panCard && (
                        <span className="text-sm text-gray-600">
                          {selectedFiles.panCard.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Driving License
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'drivingLicense')}
                        className="hidden"
                        id="drivingLicense"
                      />
                      <label
                        htmlFor="drivingLicense"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                      >
                        <Upload size={18} />
                        Upload License
                      </label>
                      {selectedFiles.drivingLicense && (
                        <span className="text-sm text-gray-600">
                          {selectedFiles.drivingLicense.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistrationPopup;