import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments, processRefund } from "../store/slices/paymentSlice";
import { 
  Users, 
  Loader2, 
  Search, 
  Download,
  DollarSign,
  CreditCard,
  Filter,
  ChevronDown,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";

const Players = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingRefund, setProcessingRefund] = useState(null);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  // Parse tournament data from metadata
  const parseTournaments = (metadata) => {
    try {
      const tournamentsStr = metadata?.formData?.tournaments;
      return tournamentsStr ? JSON.parse(tournamentsStr) : [];
    } catch {
      return [];
    }
  };

  // Parse man of the match details
  const parseManOfTheMatchDetails = (metadata) => {
    try {
      const detailsStr = metadata?.formData?.manOfTheMatchDetails;
      return detailsStr ? JSON.parse(detailsStr) : [];
    } catch {
      return [];
    }
  };

  // Parse man of the series details
  const parseManOfTheSeriesDetails = (metadata) => {
    try {
      const detailsStr = metadata?.formData?.manOfTheSeriesDetails;
      return detailsStr ? JSON.parse(detailsStr) : [];
    } catch {
      return [];
    }
  };

  // Handle refund
  const handleRefund = async (paymentId) => {
    if (window.confirm('Are you sure you want to process a refund for this payment?')) {
      setProcessingRefund(paymentId);
      try {
        await dispatch(processRefund(paymentId)).unwrap();
        dispatch(getAllPayments()); // Refresh the list
      } catch (error) {
        // Error is already handled in the slice
      } finally {
        setProcessingRefund(null);
      }
    }
  };

  // Filter payments based on search and status
  const filteredPayments = payments?.filter(payment => {
    const formData = payment.metadata?.formData || {};
    const matchesSearch = 
      formData.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formData.mobileNumber?.includes(searchTerm) ||
      payment.razorpayOrderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment._id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Export to Excel function
  const exportToExcel = () => {
    const exportData = filteredPayments?.map(payment => {
      const formData = payment.metadata?.formData || {};
      const tournaments = parseTournaments(payment.metadata);
      const manOfTheMatchDetails = parseManOfTheMatchDetails(payment.metadata);
      const manOfTheSeriesDetails = parseManOfTheSeriesDetails(payment.metadata);

      return {
        // Personal Information
        'Full Name': formData.fullName || '',
        'Email': formData.email || '',
        'Mobile Number': formData.mobileNumber || '',
        'Address': formData.address || '',
        'Date of Birth': formData.dateOfBirth || '',
        'Aadhar Number': formData.aadharNumber || '',
        
        // Physical Attributes
        'Height (cm)': formData.height || '',
        'Weight (kg)': formData.weight || '',
        
        // Cricket Details
        'Is Batsman': formData.isBatsman === 'true' ? 'Yes' : 'No',
        'Is Bowler': formData.isBowler === 'true' ? 'Yes' : 'No',
        'Is Wicket Keeper': formData.isWicketKeeper === 'true' ? 'Yes' : 'No',
        'Batting Hand': formData.battingHand || '',
        'Bowling Arm': formData.bowlingArm || '',
        'Bowling Type': formData.bowlingType || '',
        
        // Tournament Experience
        'Played Tournament': formData.playedTournament === 'true' ? 'Yes' : 'No',
        'Tournaments': tournaments.map(t => `${t.tournament} (${t.year}, ${t.ballType})`).join('; '),
        
        // Achievements
        'Man of the Match': formData.manOfTheMatch === 'true' ? 'Yes' : 'No',
        'Man of the Match Details': manOfTheMatchDetails.map(m => `${m.tournament} - ${m.date}`).join('; '),
        'Man of the Series': formData.manOfTheSeries === 'true' ? 'Yes' : 'No',
        'Man of the Series Details': manOfTheSeriesDetails.map(m => `${m.tournament} - ${m.date}`).join('; '),
        
        // Payment Information
        'Payment ID': payment._id || '',
        'Razorpay Order ID': payment.razorpayOrderId || '',
        'Amount': `₹${payment.amount || 0}`,
        'Currency': payment.currency || '',
        'Status': payment.status || '',
        'Description': payment.description || '',
        'Invoice Generated': payment.invoiceGenerated ? 'Yes' : 'No',
        'Payment Date': payment.createdAt ? new Date(payment.createdAt).toLocaleString() : '',
      };
    }) || [];

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Set column widths
    const colWidths = [
      { wch: 20 }, // Full Name
      { wch: 30 }, // Email
      { wch: 15 }, // Mobile Number
      { wch: 30 }, // Address
      { wch: 15 }, // Date of Birth
      { wch: 15 }, // Aadhar Number
      { wch: 10 }, // Height
      { wch: 10 }, // Weight
      { wch: 10 }, // Is Batsman
      { wch: 10 }, // Is Bowler
      { wch: 15 }, // Is Wicket Keeper
      { wch: 15 }, // Batting Hand
      { wch: 15 }, // Bowling Arm
      { wch: 15 }, // Bowling Type
      { wch: 15 }, // Played Tournament
      { wch: 40 }, // Tournaments
      { wch: 15 }, // Man of the Match
      { wch: 40 }, // Man of the Match Details
      { wch: 15 }, // Man of the Series
      { wch: 40 }, // Man of the Series Details
      { wch: 25 }, // Payment ID
      { wch: 25 }, // Razorpay Order ID
      { wch: 10 }, // Amount
      { wch: 8 },  // Currency
      { wch: 12 }, // Status
      { wch: 30 }, // Description
      { wch: 15 }, // Invoice Generated
      { wch: 20 }, // Payment Date
    ];
    ws['!cols'] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    
    // Generate filename with current date
    const fileName = `payments_export_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Save file
    XLSX.writeFile(wb, fileName);
    
    toast.success(`Exported ${exportData.length} records to Excel`);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'created':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'created':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(payments?.map(p => p.status) || [])];

  // Calculate stats
  const stats = {
    total: payments?.length || 0,
    totalAmount: payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0,
    completed: payments?.filter(p => p.status === 'completed').length || 0,
    // pending: payments?.filter(p => p.status === 'created').length || 0,
    // failed: payments?.filter(p => p.status === 'failed').length || 0,
    // refunded: payments?.filter(p => p.status === 'refunded').length || 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6">
        Error loading payments: {error}
      </div>
    );
  }

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-blue-600" />
          Payments Management
        </h1>

        {/* Export Button */}
        <button
          onClick={exportToExcel}
          disabled={!filteredPayments?.length}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          Export to Excel
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white shadow-lg rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Total</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Total Amount</p>
          <h2 className="text-2xl font-bold text-green-600">₹{stats.totalAmount}</h2>
        </div>
  
        

      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, mobile, order ID or payment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white min-w-[160px]"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      {/* Payments Table */}
      {filteredPayments?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <CreditCard className="w-16 h-16 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">No payments found</p>
          {searchTerm && (
            <p className="text-gray-400">Try adjusting your search</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cricket Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments?.map((payment) => {
                  const formData = payment.metadata?.formData || {};
                  const tournaments = parseTournaments(payment.metadata);
                  
                  return (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {formData.fullName || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            DOB: {formData.dateOfBirth || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-400">
                            Aadhar: {formData.aadharNumber ? `****${formData.aadharNumber.slice(-4)}` : 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">
                            {formData.email || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formData.mobileNumber || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {formData.address?.substring(0, 30)}...
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">Bat:</span> {formData.battingHand || 'N/A'}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Role:</span>{' '}
                            {[
                              formData.isBatsman === 'true' && 'Batsman',
                              formData.isBowler === 'true' && 'Bowler',
                              formData.isWicketKeeper === 'true' && 'WK'
                            ].filter(Boolean).join(', ') || 'N/A'}
                          </div>
                          {tournaments.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {tournaments.length} tournament(s) played
                            </div>
                          )}
                          <div className="text-xs text-gray-400">
                            H: {formData.height || 'N/A'}cm | W: {formData.weight || 'N/A'}kg
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            ₹{payment.amount || 0}
                          </div>
                          <div className="text-xs text-gray-500">
                            Order: {payment.razorpayOrderId?.slice(-8)}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {payment._id?.slice(-6)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusBadge(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          {payment.status || 'N/A'}
                        </span>
                        {payment.invoiceGenerated && (
                          <div className="text-xs text-green-600 mt-1">Invoice Generated</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A'}
                        <div className="text-xs text-gray-400">
                          {payment.createdAt ? new Date(payment.createdAt).toLocaleTimeString() : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {payment.status === 'completed' && (
                            <button
                              onClick={() => handleRefund(payment._id)}
                              disabled={processingRefund === payment._id}
                              className="text-purple-600 hover:text-purple-800 p-1 disabled:opacity-50"
                              title="Process Refund"
                            >
                              {processingRefund === payment._id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <RefreshCw className="w-5 h-5" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => {
            setShowModal(false);
            setSelectedPayment(null);
          }}
          onRefund={handleRefund}
          processingRefund={processingRefund}
        />
      )}
    </div>
  );
};

// Payment Details Modal Component
const PaymentDetailsModal = ({ payment, onClose, onRefund, processingRefund }) => {
  const formData = payment.metadata?.formData || {};

  // Parse JSON fields
  const parseJSON = (str) => {
    try {
      return JSON.parse(str || '[]');
    } catch {
      return [];
    }
  };

  const tournaments = parseJSON(formData.tournaments);
  const manOfTheMatchDetails = parseJSON(formData.manOfTheMatchDetails);
  const manOfTheSeriesDetails = parseJSON(formData.manOfTheSeriesDetails);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium">{formData.fullName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium">{formData.dateOfBirth || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Aadhar Number</label>
                <p className="font-medium">{formData.aadharNumber || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Height/Weight</label>
                <p className="font-medium">{formData.height || 'N/A'} cm / {formData.weight || 'N/A'} kg</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium">{formData.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{formData.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Mobile Number</label>
                <p className="font-medium">{formData.mobileNumber || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Cricket Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Cricket Details
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-500">Role</label>
                <p className="font-medium">
                  {[
                    formData.isBatsman === 'true' && 'Batsman',
                    formData.isBowler === 'true' && 'Bowler',
                    formData.isWicketKeeper === 'true' && 'Wicket Keeper'
                  ].filter(Boolean).join(', ') || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Batting Hand</label>
                <p className="font-medium">{formData.battingHand || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Bowling</label>
                <p className="font-medium">
                  {formData.bowlingArm && formData.bowlingType 
                    ? `${formData.bowlingArm} - ${formData.bowlingType}`
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Tournament Experience */}
          {tournaments.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Tournament Experience</h3>
              <div className="space-y-2">
                {tournaments.map((tournament, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <p className="font-medium">{tournament.tournament}</p>
                    <p className="text-sm text-gray-600">Year: {tournament.year} | Ball Type: {tournament.ballType}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Payment Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Payment ID</label>
                <p className="font-medium text-sm">{payment._id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Razorpay Order ID</label>
                <p className="font-medium text-sm">{payment.razorpayOrderId}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Amount</label>
                <p className="font-medium text-lg text-green-600">₹{payment.amount}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <p className="font-medium">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                    payment.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'created'
                      ? 'bg-yellow-100 text-yellow-800'
                      : payment.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : payment.status === 'refunded'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {payment.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">{new Date(payment.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Description</label>
                <p className="font-medium">{payment.description}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Invoice Generated</label>
                <p className="font-medium">{payment.invoiceGenerated ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Refund Button */}
          {payment.status === 'completed' && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  onRefund(payment._id);
                  onClose();
                }}
                disabled={processingRefund === payment._id}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {processingRefund === payment._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                Process Refund
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Missing icon imports
const Mail = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Award = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// const XCircle = (props) => (
//   <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

export default Players;