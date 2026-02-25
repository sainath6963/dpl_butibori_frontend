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
import { 
  X, 
  Upload, 
  Loader, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Ruler,
  Weight,
  CreditCard,
  Award,
  Trophy,
  FileText,
  Plus,
  Trash2,
  ChevronRight,
  Shield,
  Users
} from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const PlayerRegistrationPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.players);
  
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
  const [activeTab, setActiveTab] = useState('basic');
const tabs = [
  { id: 'basic', label: 'Basic Info', icon: User },
  { id: 'playing', label: 'Playing Details', icon: Shield },
  { id: 'history', label: 'Tournament History', icon: Trophy },
  { id: 'awards', label: 'Awards', icon: Award },
  { id: 'documents', label: 'Documents', icon: FileText },
];


const [currentTabIndex, setCurrentTabIndex] = useState(0);

 // Add these functions after your state declarations
const goToNextTab = () => {
  if (currentTabIndex < tabs.length - 1) {
    const nextIndex = currentTabIndex + 1;
    setCurrentTabIndex(nextIndex);
    setActiveTab(tabs[nextIndex].id);
  }
};

const goToPreviousTab = () => {
  if (currentTabIndex > 0) {
    const prevIndex = currentTabIndex - 1;
    setCurrentTabIndex(prevIndex);
    setActiveTab(tabs[prevIndex].id);
  }
};
 useEffect(() => {
  if (error) {
    toast.error(error, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
    dispatch(clearPlayerError());
  }
}, [error, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
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
    setActiveTab('basic');
    setCurrentTabIndex(0);
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitData = new FormData();

//     Object.keys(formData).forEach(key => {
//       if (key === "documents") {
//         Object.keys(formData.documents).forEach(docKey => {
//           if (formData.documents[docKey] instanceof File) {
//             submitData.append(docKey, formData.documents[docKey]);
//           }
//         });
//       } 
//       else if (
//         key === "tournaments" ||
//         key === "manOfTheMatchDetails" ||
//         key === "manOfTheSeriesDetails"
//       ) {
//         submitData.append(key, JSON.stringify(formData[key]));
//       } 
//       else {
//         submitData.append(key, formData[key]);
//       }
//     });

//     const res = await dispatch(createPaymentOrder(submitData));

//     if (!res.payload) {
//       toast.error("Failed to initiate payment");
//       return;
//     }

//     const { order, paymentId, key } = res.payload;

//     const loaded = await loadRazorpay();
//     if (!loaded) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     const options = {
//       key,
//       amount: order.amount,
//       currency: order.currency,
//       name: "DPL Tournament",
//       description: "Player Registration Fee",
//       order_id: order.id,
//       image: "/logo.png", // Add your logo here
//       handler: async function (response) {
//         const verifyRes = await dispatch(
//           verifyPayment({
//             razorpayOrderId: response.razorpay_order_id,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpaySignature: response.razorpay_signature,
//             paymentId
//           })
//         );

//         if (verifyRes.payload) {
//           toast.success("🎉 Registration Completed Successfully!", {
//             icon: '🏏',
//             style: {
//               borderRadius: '10px',
//               background: '#333',
//               color: '#fff',
//             }
//           });
//           onClose();
//           resetForm();
//         }
//       },
//       prefill: {
//         name: formData.fullName,
//         email: formData.email,
//         contact: formData.mobileNumber
//       },
//       theme: {
//   color: "#6366f1"
// },

// modal: {
//   ondismiss: function () {
//     toast.error("Payment cancelled");
//   }
// }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  const submitData = new FormData();

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

  const res = await dispatch(createPaymentOrder(submitData));

  if (!res.payload) {
    toast.error("Failed to initiate payment");
    return;
  }

  const { order, paymentId, key } = res.payload;

  const loaded = await loadRazorpay();
  if (!loaded) {
    toast.error("Razorpay SDK failed to load");
    return;
  }

  const options = {
    key,
    amount: order.amount,
    currency: order.currency,
    name: "DPL Tournament",
    description: "Player Registration Fee",
    order_id: order.id,
    image: "/logo.png",
    handler: async function (response) {
      const verifyRes = await dispatch(
        verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          paymentId
        })
      );

      if (verifyRes.payload) {
        toast.success("🎉 Registration Completed Successfully!", {
          icon: '🏏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
        onClose();
        resetForm();
      }
    },
    prefill: {
      name: formData.fullName,
      email: formData.email,
      contact: formData.mobileNumber
    },
    theme: {
      color: "#6366f1"
    },
    modal: {
      ondismiss: function () {
        toast.error("Payment cancelled");
        // 🔥 ADD THIS - Update payment status to cancelled
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/payments/status/${paymentId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'cancelled' })
        }).catch(err => console.error('Failed to update payment status:', err));
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  if (!isOpen) return null;



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-5xl"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Player Registration
                      </h2>
                      <p className="text-indigo-100 text-sm mt-1">
                        Join the DPL Tournament - Complete your registration
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={24} className="text-white" />
                    </motion.button>
                  </div>

{/* Progress Tabs */}
<div className="flex gap-1 mt-6">
  {tabs.map((tab, index) => (
    <button
      key={tab.id}
      onClick={() => {
        setActiveTab(tab.id);
        setCurrentTabIndex(index); // Add this line
      }}
      className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
        activeTab === tab.id
          ? 'bg-white text-indigo-600 shadow-lg'
          : 'text-indigo-100 hover:bg-white/10'
      }`}
    >
      <tab.icon className="w-4 h-4" />
      <span className="hidden sm:inline">{tab.label}</span>
    </button>
  ))}
</div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="max-h-[60vh] overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                      {/* Basic Information Tab */}
                      {activeTab === 'basic' && (
                        <motion.div
                          key="basic"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-600" />
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Full Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="your@email.com"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Mobile Number <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="tel"
                                  name="mobileNumber"
                                  value={formData.mobileNumber}
                                  onChange={handleInputChange}
                                  pattern="[0-9]{10}"
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="9876543210"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Date of Birth <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="date"
                                  name="dateOfBirth"
                                  value={formData.dateOfBirth}
                                  onChange={handleInputChange}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  required
                                />
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Address <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <textarea
                                  name="address"
                                  value={formData.address}
                                  onChange={handleInputChange}
                                  rows="3"
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="Enter your full address"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Height (cm)
                              </label>
                              <div className="relative">
                                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="number"
                                  name="height"
                                  value={formData.height}
                                  onChange={handleInputChange}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="175"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Weight (kg)
                              </label>
                              <div className="relative">
                                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="number"
                                  name="weight"
                                  value={formData.weight}
                                  onChange={handleInputChange}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="70"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Aadhar Number <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="text"
                                  name="aadharNumber"
                                  value={formData.aadharNumber}
                                  onChange={handleInputChange}
                                  pattern="[0-9]{12}"
                                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                  placeholder="123456789012"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Playing Details Tab */}
                      {activeTab === 'playing' && (
                        <motion.div
                          key="playing"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-indigo-600" />
                            Playing Role & Details
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="flex flex-wrap gap-6">
                              <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50">
                                <input
                                  type="checkbox"
                                  name="isBatsman"
                                  checked={formData.isBatsman}
                                  onChange={handleInputChange}
                                  className="mr-3 w-5 h-5 text-indigo-600"
                                />
                                <span className="font-medium">🏏 Batsman</span>
                              </label>
                              
                              <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50">
                                <input
                                  type="checkbox"
                                  name="isBowler"
                                  checked={formData.isBowler}
                                  onChange={handleInputChange}
                                  className="mr-3 w-5 h-5 text-indigo-600"
                                />
                                <span className="font-medium">🎯 Bowler</span>
                              </label>
                              
                              <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50">
                                <input
                                  type="checkbox"
                                  name="isWicketKeeper"
                                  checked={formData.isWicketKeeper}
                                  onChange={handleInputChange}
                                  className="mr-3 w-5 h-5 text-indigo-600"
                                />
                                <span className="font-medium">🧤 Wicket Keeper</span>
                              </label>
                            </div>

                            <AnimatePresence>
                              {formData.isBatsman && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-2"
                                >
                                  <label className="block text-sm font-medium text-gray-700">
                                    Batting Hand
                                  </label>
                                  <select
                                    name="battingHand"
                                    value={formData.battingHand}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                                  >
                                    <option value="">Select batting hand</option>
                                    <option value="Right Hand">Right Hand</option>
                                    <option value="Left Hand">Left Hand</option>
                                  </select>
                                </motion.div>
                              )}

                              {formData.isBowler && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-4"
                                >
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Bowling Arm
                                    </label>
                                    <select
                                      name="bowlingArm"
                                      value={formData.bowlingArm}
                                      onChange={handleInputChange}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                                    >
                                      <option value="">Select bowling arm</option>
                                      <option value="Right Arm">Right Arm</option>
                                      <option value="Left Arm">Left Arm</option>
                                    </select>
                                  </div>

                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Bowling Type
                                    </label>
                                    <select
                                      name="bowlingType"
                                      value={formData.bowlingType}
                                      onChange={handleInputChange}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                                    >
                                      <option value="">Select bowling type</option>
                                      <option value="Pacer">Pacer (Fast Bowler)</option>
                                      <option value="Spinner">Spinner</option>
                                    </select>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}

                      {/* Tournament History Tab */}
                      {activeTab === 'history' && (
                        <motion.div
                          key="history"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-indigo-600" />
                            Tournament History
                          </h3>
                          
                          <div className="mb-6">
                            <label className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl cursor-pointer">
                              <input
                                type="checkbox"
                                name="playedTournament"
                                checked={formData.playedTournament}
                                onChange={handleInputChange}
                                className="mr-3 w-5 h-5 text-indigo-600"
                              />
                              <span className="font-medium">I have played tournaments before</span>
                            </label>
                          </div>

                          <AnimatePresence>
                            {formData.playedTournament && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                              >
                                {tournamentFields.map((field, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Tournament Name"
                                      value={field.tournament}
                                      onChange={(e) => handleTournamentChange(index, 'tournament', e.target.value, 'tournament')}
                                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                      type="number"
                                      placeholder="Year"
                                      value={field.year}
                                      onChange={(e) => handleTournamentChange(index, 'year', e.target.value, 'tournament')}
                                      className="w-28 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <select
                                      value={field.ballType}
                                      onChange={(e) => handleTournamentChange(index, 'ballType', e.target.value, 'tournament')}
                                      className="w-36 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                      <option value="Tennis">Tennis Ball</option>
                                      <option value="Leather">Leather Ball</option>
                                    </select>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      type="button"
                                      onClick={() => removeTournament(index, 'tournament')}
                                      className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                      <Trash2 size={18} />
                                    </motion.button>
                                  </motion.div>
                                ))}
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="button"
                                  onClick={() => addTournament('tournament')}
                                  className="w-full py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Plus size={18} />
                                  Add Tournament
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}

                      {/* Awards Tab */}
                      {activeTab === 'awards' && (
                        <motion.div
                          key="awards"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-600" />
                            Awards & Achievements
                          </h3>
                          
                          <div className="space-y-6">
                            {/* Man of the Match Section */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
                              <label className="flex items-center mb-4">
                                <input
                                  type="checkbox"
                                  name="manOfTheMatch"
                                  checked={formData.manOfTheMatch}
                                  onChange={handleInputChange}
                                  className="mr-3 w-5 h-5 text-indigo-600"
                                />
                                <span className="font-semibold text-lg">Man of the Match Awards</span>
                              </label>
                              
                              <AnimatePresence>
                                {formData.manOfTheMatch && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="ml-8 space-y-3"
                                  >
                                    {momFields.map((field, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex gap-3 items-start"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Tournament Name"
                                          value={field.tournament}
                                          onChange={(e) => handleTournamentChange(index, 'tournament', e.target.value, 'mom')}
                                          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg"
                                        />
                                        <input
                                          type="number"
                                          placeholder="Year"
                                          value={field.year}
                                          onChange={(e) => handleTournamentChange(index, 'year', e.target.value, 'mom')}
                                          className="w-28 px-4 py-3 border border-gray-200 rounded-lg"
                                        />
                                        <select
                                          value={field.ballType}
                                          onChange={(e) => handleTournamentChange(index, 'ballType', e.target.value, 'mom')}
                                          className="w-36 px-4 py-3 border border-gray-200 rounded-lg"
                                        >
                                          <option value="Tennis">Tennis Ball</option>
                                          <option value="Leather">Leather Ball</option>
                                        </select>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          type="button"
                                          onClick={() => removeTournament(index, 'mom')}
                                          className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                          <Trash2 size={18} />
                                        </motion.button>
                                      </motion.div>
                                    ))}
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      type="button"
                                      onClick={() => addTournament('mom')}
                                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                      <Plus size={18} />
                                      Add Man of the Match
                                    </motion.button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Man of the Series Section */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                              <label className="flex items-center mb-4">
                                <input
                                  type="checkbox"
                                  name="manOfTheSeries"
                                  checked={formData.manOfTheSeries}
                                  onChange={handleInputChange}
                                  className="mr-3 w-5 h-5 text-indigo-600"
                                />
                                <span className="font-semibold text-lg">Man of the Series Awards</span>
                              </label>
                              
                              <AnimatePresence>
                                {formData.manOfTheSeries && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="ml-8 space-y-3"
                                  >
                                    {mosFields.map((field, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex gap-3 items-start"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Tournament Name"
                                          value={field.tournament}
                                          onChange={(e) => handleTournamentChange(index, 'tournament', e.target.value, 'mos')}
                                          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg"
                                        />
                                        <input
                                          type="number"
                                          placeholder="Year"
                                          value={field.year}
                                          onChange={(e) => handleTournamentChange(index, 'year', e.target.value, 'mos')}
                                          className="w-28 px-4 py-3 border border-gray-200 rounded-lg"
                                        />
                                        <select
                                          value={field.ballType}
                                          onChange={(e) => handleTournamentChange(index, 'ballType', e.target.value, 'mos')}
                                          className="w-36 px-4 py-3 border border-gray-200 rounded-lg"
                                        >
                                          <option value="Tennis">Tennis Ball</option>
                                          <option value="Leather">Leather Ball</option>
                                        </select>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          type="button"
                                          onClick={() => removeTournament(index, 'mos')}
                                          className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                          <Trash2 size={18} />
                                        </motion.button>
                                      </motion.div>
                                    ))}
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      type="button"
                                      onClick={() => addTournament('mos')}
                                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                      <Plus size={18} />
                                      Add Man of the Series
                                    </motion.button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Documents Tab */}
                      {activeTab === 'documents' && (
                        <motion.div
                          key="documents"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-600" />
                            Document Upload
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              { id: 'playerPhoto', label: 'Player Photo', required: true, accept: 'image/*' },
                              { id: 'aadharCard', label: 'Aadhar Card', required: true, accept: 'image/*,.pdf' },
                              { id: 'panCard', label: 'PAN Card', required: false, accept: 'image/*,.pdf' },
                              { id: 'drivingLicense', label: 'Driving License', required: false, accept: 'image/*,.pdf' },
                            ].map((doc) => (
                              <motion.div
                                key={doc.id}
                                whileHover={{ scale: 1.02 }}
                                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors"
                              >
                                <input
                                  type="file"
                                  accept={doc.accept}
                                  onChange={(e) => handleFileChange(e, doc.id)}
                                  className="hidden"
                                  id={doc.id}
                                  required={doc.required}
                                />
                                <label
                                  htmlFor={doc.id}
                                  className="cursor-pointer block"
                                >
                                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <span className="text-sm font-medium text-gray-700 block">
                                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                                  </span>
                                  {selectedFiles[doc.id] && (
                                    <motion.span
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="text-xs text-green-600 block mt-2"
                                    >
                                      ✓ {selectedFiles[doc.id].name}
                                    </motion.span>
                                  )}
                                </label>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

{/* Form Actions */}
<div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
  <div className="flex justify-between items-center">
    <div className="text-sm text-gray-600">
      <span className="font-semibold text-indigo-600">*</span> Required fields
      <span className="ml-4 text-indigo-600 font-medium">
        Step {currentTabIndex + 1} of {tabs.length}
      </span>
    </div>
    <div className="flex gap-3">
      {/* LAST TAB - Cancel and Proceed to Payment */}
      {currentTabIndex === tabs.length - 1 ? (
        <>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors font-medium"
            disabled={loading}
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment
                <ChevronRight size={18} />
              </>
            )}
          </motion.button>
        </>
      ) : (
        /* NOT LAST TAB */
        <>
          {/* Back button - Show on all except first tab (including when clicked from progress tabs) */}
          {currentTabIndex > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={goToPreviousTab}
              className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors font-medium"
              disabled={loading}
            >
              ← Back
            </motion.button>
          )}
          
          {/* Next button - Show on all non-last tabs */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={goToNextTab}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
            disabled={loading}
          >
            Next
            <ChevronRight size={18} />
          </motion.button>
        </>
      )}
    </div>
  </div>
</div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PlayerRegistrationPopup;