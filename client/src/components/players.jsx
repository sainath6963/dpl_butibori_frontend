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
  Clock,
  TrendingUp,
  Calendar,
  Mail,
  Award,
  X,
  Wallet,
  BadgeCheck,
  AlertCircle,
  ArrowUpRight,
  FileText,
  Printer,
  FileDown,
  FileSpreadsheet
} from "lucide-react";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Players = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingRefund, setProcessingRefund] = useState(null);
  const [dateRange, setDateRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  // Parse JSON fields from metadata
  const parseJSONField = (str) => {
    try {
      return str ? JSON.parse(str) : [];
    } catch {
      return [];
    }
  };

  // Format player data for export
  const formatPlayerData = (payment) => {
    const formData = payment.metadata?.formData || {};
    const tournaments = parseJSONField(formData.tournaments);
    const manOfTheMatchDetails = parseJSONField(formData.manOfTheMatchDetails);
    const manOfTheSeriesDetails = parseJSONField(formData.manOfTheSeriesDetails);

    return {
      // Personal Information
      fullName: formData.fullName || 'N/A',
      email: formData.email || 'N/A',
      mobileNumber: formData.mobileNumber || 'N/A',
      address: formData.address || 'N/A',
      dateOfBirth: formData.dateOfBirth || 'N/A',
      aadharNumber: formData.aadharNumber || 'N/A',
      height: formData.height || 'N/A',
      weight: formData.weight || 'N/A',

      // Cricket Details
      isBatsman: formData.isBatsman === 'true' ? 'Yes' : 'No',
      isBowler: formData.isBowler === 'true' ? 'Yes' : 'No',
      isWicketKeeper: formData.isWicketKeeper === 'true' ? 'Yes' : 'No',
      battingHand: formData.battingHand || 'N/A',
      bowlingArm: formData.bowlingArm || 'N/A',
      bowlingType: formData.bowlingType || 'N/A',

      // Tournament Experience
      playedTournament: formData.playedTournament === 'true' ? 'Yes' : 'No',
      tournaments: tournaments.map(t => `${t.tournament} (${t.year}, ${t.ballType})`).join(', '),

      // Achievements
      manOfTheMatch: formData.manOfTheMatch === 'true' ? 'Yes' : 'No',
      manOfTheMatchDetails: manOfTheMatchDetails.map(m => `${m.tournament} (${m.year})`).join(', '),
      manOfTheSeries: formData.manOfTheSeries === 'true' ? 'Yes' : 'No',
      manOfTheSeriesDetails: manOfTheSeriesDetails.map(m => `${m.tournament} (${m.year})`).join(', '),

      // Payment Information
      paymentId: payment._id,
      razorpayOrderId: payment.razorpayOrderId,
      razorpayPaymentId: payment.razorpayPaymentId || 'N/A',
      amount: `₹${payment.amount}`,
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod || 'N/A',
      description: payment.description,
      invoiceGenerated: payment.invoiceGenerated ? 'Yes' : 'No',
      createdAt: payment.createdAt ? new Date(payment.createdAt).toLocaleString() : 'N/A',
      paidAt: payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A'
    };
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredPayments?.map(payment => {
      const data = formatPlayerData(payment);
      return {
        'Full Name': data.fullName,
        'Email': data.email,
        'Mobile': data.mobileNumber,
        'Address': data.address,
        'Date of Birth': data.dateOfBirth,
        'Aadhar Number': data.aadharNumber,
        'Height (cm)': data.height,
        'Weight (kg)': data.weight,
        'Is Batsman': data.isBatsman,
        'Is Bowler': data.isBowler,
        'Is Wicket Keeper': data.isWicketKeeper,
        'Batting Hand': data.battingHand,
        'Bowling Arm': data.bowlingArm,
        'Bowling Type': data.bowlingType,
        'Played Tournament': data.playedTournament,
        'Tournaments': data.tournaments,
        'Man of the Match': data.manOfTheMatch,
        'MOM Details': data.manOfTheMatchDetails,
        'Man of the Series': data.manOfTheSeries,
        'MOS Details': data.manOfTheSeriesDetails,
        'Amount': data.amount,
        'Status': data.status,
        'Payment Method': data.paymentMethod,
        'Payment Date': data.createdAt,
        'Order ID': data.razorpayOrderId,
        'Payment ID': data.paymentId,
        'Invoice': data.invoiceGenerated
      };
    }) || [];

    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Set column widths
    const colWidths = [
      { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 30 }, { wch: 12 },
      { wch: 15 }, { wch: 8 }, { wch: 8 }, { wch: 10 }, { wch: 10 },
      { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 12 },
      { wch: 40 }, { wch: 12 }, { wch: 40 }, { wch: 12 }, { wch: 40 },
      { wch: 10 }, { wch: 12 }, { wch: 15 }, { wch: 20 }, { wch: 25 },
      { wch: 25 }, { wch: 8 }
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    const fileName = `payments_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
    toast.success(`Exported ${exportData.length} records to Excel`);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(79, 70, 229);
    doc.text('Payments Report', 14, 20);
    
    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    
    // Table data
    const tableData = filteredPayments?.map(payment => {
      const formData = payment.metadata?.formData || {};
      return [
        formData.fullName || 'N/A',
        formData.mobileNumber || 'N/A',
        `₹${payment.amount}`,
        payment.status,
        formData.isBatsman === 'true' ? 'Yes' : 'No',
        formData.isBowler === 'true' ? 'Yes' : 'No',
        payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A'
      ];
    }) || [];

    // Table columns
    const columns = [
      'Player Name',
      'Mobile',
      'Amount',
      'Status',
      'Batsman',
      'Bowler',
      'Date'
    ];

    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229], textColor: 255 },
      alternateRowStyles: { fillColor: [241, 245, 249] }
    });

    // Summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55);
    doc.text(`Total Records: ${filteredPayments?.length || 0}`, 14, finalY);
    doc.text(`Total Amount: ₹${stats.successfulAmount.toLocaleString()}`, 14, finalY + 6);
    doc.text(`Success Rate: ${completionRate}%`, 14, finalY + 12);

    doc.save(`payments_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success(`Exported ${tableData.length} records to PDF`);
  };

  // Export single payment as PDF
  const exportSinglePaymentPDF = (payment) => {
    const doc = new jsPDF();
    const formData = payment.metadata?.formData || {};
    const tournaments = parseJSONField(formData.tournaments);
    const momDetails = parseJSONField(formData.manOfTheMatchDetails);
    const mosDetails = parseJSONField(formData.manOfTheSeriesDetails);

    // Header
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 220, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Payment Receipt', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Receipt No: ${payment._id?.slice(-8)}`, 14, 30);
    doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`, 140, 30);

    // Status
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text('Payment Status:', 14, 50);
    
    const statusColor = payment.status === 'paid' ? 16 : payment.status === 'created' ? 245 : 239;
    doc.setFillColor(statusColor, 68, 68);
    doc.rect(60, 45, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(payment.status.toUpperCase(), 65, 51);

    // Player Information
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.text('Player Information', 14, 70);
    
    doc.setFontSize(10);
    doc.text(`Full Name: ${formData.fullName || 'N/A'}`, 14, 80);
    doc.text(`Email: ${formData.email || 'N/A'}`, 14, 87);
    doc.text(`Mobile: ${formData.mobileNumber || 'N/A'}`, 14, 94);
    doc.text(`Date of Birth: ${formData.dateOfBirth || 'N/A'}`, 14, 101);
    doc.text(`Aadhar: ${formData.aadharNumber || 'N/A'}`, 14, 108);
    doc.text(`Address: ${formData.address || 'N/A'}`, 14, 115);

    // Cricket Details
    doc.setFontSize(14);
    doc.text('Cricket Details', 14, 130);
    
    doc.setFontSize(10);
    doc.text(`Role: ${
      [
        formData.isBatsman === 'true' && 'Batsman',
        formData.isBowler === 'true' && 'Bowler',
        formData.isWicketKeeper === 'true' && 'WK'
      ].filter(Boolean).join(', ') || 'N/A'
    }`, 14, 140);
    
    doc.text(`Batting Hand: ${formData.battingHand || 'N/A'}`, 14, 147);
    doc.text(`Bowling: ${formData.bowlingArm || 'N/A'} ${formData.bowlingType || ''}`, 14, 154);

    // Payment Information
    doc.setFontSize(14);
    doc.text('Payment Information', 14, 170);
    
    doc.setFontSize(10);
    doc.text(`Amount: ₹${payment.amount}`, 14, 180);
    doc.text(`Payment Method: ${payment.paymentMethod || 'N/A'}`, 14, 187);
    doc.text(`Order ID: ${payment.razorpayOrderId}`, 14, 194);
    doc.text(`Payment ID: ${payment.razorpayPaymentId || 'N/A'}`, 14, 201);
    doc.text(`Paid At: ${payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A'}`, 14, 208);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('This is a computer generated receipt.', 14, 280);

    doc.save(`receipt_${formData.fullName || 'player'}_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('Receipt downloaded successfully');
  };

  // Calculate stats
  const successfulPayments = payments?.filter(p => p.status === 'paid') || [];
  
  const stats = {
    total: payments?.length || 0,
    successful: successfulPayments.length,
    successfulAmount: successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0),
    pending: payments?.filter(p => p.status === 'created').length || 0,
    failed: payments?.filter(p => p.status === 'failed' || p.status === 'cancelled').length || 0,
    averageAmount: successfulPayments.length > 0 
      ? (successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0) / successfulPayments.length).toFixed(2)
      : 0
  };

  const completionRate = stats.total > 0 ? ((stats.successful / stats.total) * 100).toFixed(1) : 0;

  // Filter payments
  const filteredPayments = payments?.filter(payment => {
    const formData = payment.metadata?.formData || {};
    const matchesSearch = 
      formData.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formData.mobileNumber?.includes(searchTerm) ||
      payment.razorpayOrderId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    let matchesDate = true;
    if (dateRange !== "all" && payment.createdAt) {
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch(dateRange) {
        case "today":
          matchesDate = paymentDate >= today;
          break;
        case "week":
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          matchesDate = paymentDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
          matchesDate = paymentDate >= monthAgo;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Status badge helpers
  const getStatusBadge = (status) => {
    const badges = {
      'paid': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'created': 'bg-amber-100 text-amber-700 border-amber-200',
      'failed': 'bg-rose-100 text-rose-700 border-rose-200',
      'cancelled': 'bg-slate-100 text-slate-700 border-slate-200',
      'refunded': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return badges[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'paid': <CheckCircle className="w-4 h-4" />,
      'created': <Clock className="w-4 h-4" />,
      'failed': <XCircle className="w-4 h-4" />,
      'cancelled': <XCircle className="w-4 h-4" />,
      'refunded': <RefreshCw className="w-4 h-4" />
    };
    return icons[status] || null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Payments</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(getAllPayments())}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-3">
                <Wallet className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />
                Payments Overview
              </h1>
              <p className="text-slate-500 mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
              >
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-slate-700">Filters</span>
                <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Export Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen(!exportMenuOpen)}
                  disabled={!filteredPayments?.length}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${exportMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {exportMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-10"
                    >
                      <button
                        onClick={() => {
                          exportToExcel();
                          setExportMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 text-slate-700"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-green-600" />
                        Excel Export
                      </button>
                      <button
                        onClick={() => {
                          exportToPDF();
                          setExportMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 text-slate-700"
                      >
                        <FileText className="w-4 h-4 text-red-600" />
                        PDF Export
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <CreditCard className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{stats.total}</h3>
            <p className="text-sm text-slate-500 mt-1">All payments received</p>
          </motion.div>

          {/* Successful Payments - Total Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <BadgeCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {completionRate}% success
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{stats.successful}</h3>
            <p className="text-sm text-slate-500 mt-1">Successful payments</p>
          </motion.div>

          {/* Total Revenue - FROM SUCCESSFUL PAYMENTS ONLY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Revenue
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">₹{stats.successfulAmount.toLocaleString()}</h3>
            <p className="text-sm text-slate-500 mt-1">From successful payments</p>
          </motion.div>

          {/* Average Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Average
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">₹{stats.averageAmount}</h3>
            <p className="text-sm text-slate-500 mt-1">Per successful payment</p>
          </motion.div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Pending</p>
                <p className="text-lg font-semibold text-slate-800">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Failed</p>
                <p className="text-lg font-semibold text-slate-800">{stats.failed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Success Rate</p>
                <p className="text-lg font-semibold text-slate-800">{completionRate}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Invoices</p>
                <p className="text-lg font-semibold text-slate-800">{payments?.filter(p => p.invoiceGenerated).length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="paid">Paid</option>
                      <option value="created">Pending</option>
                      <option value="failed">Failed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                  
                  {/* Date Range */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {filteredPayments?.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No payments found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Player</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPayments?.map((payment, index) => {
                    const formData = payment.metadata?.formData || {};
                    return (
                      <motion.tr
                        key={payment._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                              {formData.fullName?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{formData.fullName || 'N/A'}</p>
                              <p className="text-xs text-slate-500">ID: {payment._id?.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{formData.email || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{formData.mobileNumber || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">₹{payment.amount || 0}</p>
                          <p className="text-xs text-slate-500">{payment.paymentMethod || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${getStatusBadge(payment.status)}`}>
                            {getStatusIcon(payment.status)}
                            {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1)}
                          </span>
                          {payment.invoiceGenerated && (
                            <p className="text-xs text-emerald-600 mt-1">✓ Invoice</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A'}
                          </p>
                          <p className="text-xs text-slate-500">
                            {payment.createdAt ? new Date(payment.createdAt).toLocaleTimeString() : ''}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedPayment(payment);
                                setShowModal(true);
                              }}
                              className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => exportSinglePaymentPDF(payment)}
                              className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600"
                              title="Download Receipt PDF"
                            >
                              <FileDown className="w-5 h-5" />
                            </button>
                            {payment.status === 'paid' && (
                              <button
                                onClick={() => handleRefund(payment._id)}
                                disabled={processingRefund === payment._id}
                                className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600 disabled:opacity-50"
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
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 flex justify-between items-center text-sm text-slate-500">
          <p>Showing {filteredPayments?.length || 0} of {payments?.length || 0} payments</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Successful: ₹{stats.successfulAmount.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Payment Details Modal */}
      <AnimatePresence>
        {showModal && selectedPayment && (
          <PaymentDetailsModal
            payment={selectedPayment}
            onClose={() => {
              setShowModal(false);
              setSelectedPayment(null);
            }}
            onRefund={handleRefund}
            processingRefund={processingRefund}
            onDownloadPDF={exportSinglePaymentPDF}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Payment Details Modal with ALL metadata
const PaymentDetailsModal = ({ payment, onClose, onRefund, processingRefund, onDownloadPDF }) => {
  const formData = payment.metadata?.formData || {};

  const parseJSONField = (str) => {
    try {
      return str ? JSON.parse(str) : [];
    } catch {
      return [];
    }
  };

  const tournaments = parseJSONField(formData.tournaments);
  const manOfTheMatchDetails = parseJSONField(formData.manOfTheMatchDetails);
  const manOfTheSeriesDetails = parseJSONField(formData.manOfTheSeriesDetails);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Wallet className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Complete Payment Details</h2>
              <p className="text-sm text-slate-500">ID: {payment._id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownloadPDF(payment)}
              className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600"
              title="Download PDF"
            >
              <FileDown className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 rounded-xl ${
            payment.status === 'paid' ? 'bg-emerald-50 border border-emerald-200' :
            payment.status === 'created' ? 'bg-amber-50 border border-amber-200' :
            'bg-rose-50 border border-rose-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {payment.status === 'paid' ? <CheckCircle className="w-8 h-8 text-emerald-600" /> :
                 payment.status === 'created' ? <Clock className="w-8 h-8 text-amber-600" /> :
                 <XCircle className="w-8 h-8 text-rose-600" />}
                <div>
                  <p className="font-semibold text-slate-800">
                    Payment {payment.status === 'paid' ? 'Successful' : 
                             payment.status === 'created' ? 'Pending' : 'Failed'}
                  </p>
                  <p className="text-sm text-slate-600">
                    {payment.status === 'paid' ? `Paid via ${payment.paymentMethod || 'N/A'} on ${payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A'}` :
                     payment.status === 'created' ? 'Awaiting payment confirmation' :
                     'Payment was not completed'}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                payment.status === 'paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                payment.status === 'created' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                'bg-rose-100 text-rose-700 border-rose-200'
              }`}>
                {payment.status?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500">Full Name</p>
                <p className="font-medium text-slate-800">{formData.fullName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-medium text-slate-800">{formData.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Mobile</p>
                <p className="font-medium text-slate-800">{formData.mobileNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date of Birth</p>
                <p className="font-medium text-slate-800">{formData.dateOfBirth || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Aadhar Number</p>
                <p className="font-medium text-slate-800">{formData.aadharNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Address</p>
                <p className="font-medium text-slate-800">{formData.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Height</p>
                <p className="font-medium text-slate-800">{formData.height || 'N/A'} cm</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Weight</p>
                <p className="font-medium text-slate-800">{formData.weight || 'N/A'} kg</p>
              </div>
            </div>
          </div>

          {/* Cricket Details */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Cricket Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500">Batsman</p>
                <p className="font-medium text-slate-800">{formData.isBatsman === 'true' ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Bowler</p>
                <p className="font-medium text-slate-800">{formData.isBowler === 'true' ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Wicket Keeper</p>
                <p className="font-medium text-slate-800">{formData.isWicketKeeper === 'true' ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Batting Hand</p>
                <p className="font-medium text-slate-800">{formData.battingHand || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Bowling Arm</p>
                <p className="font-medium text-slate-800">{formData.bowlingArm || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Bowling Type</p>
                <p className="font-medium text-slate-800">{formData.bowlingType || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Tournament History */}
          {tournaments.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Tournament History</h3>
              <div className="space-y-2">
                {tournaments.map((t, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg border border-slate-200">
                    <p className="font-medium">{t.tournament}</p>
                    <p className="text-sm text-slate-600">Year: {t.year} | Ball Type: {t.ballType}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {(manOfTheMatchDetails.length > 0 || manOfTheSeriesDetails.length > 0) && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {manOfTheMatchDetails.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Man of the Match</p>
                    {manOfTheMatchDetails.map((m, i) => (
                      <div key={i} className="bg-white p-2 rounded border border-slate-200 mb-2">
                        <p className="text-sm">{m.tournament} ({m.year})</p>
                      </div>
                    ))}
                  </div>
                )}
                {manOfTheSeriesDetails.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Man of the Series</p>
                    {manOfTheSeriesDetails.map((m, i) => (
                      <div key={i} className="bg-white p-2 rounded border border-slate-200 mb-2">
                        <p className="text-sm">{m.tournament} ({m.year})</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              Payment Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500">Amount</p>
                <p className="text-xl font-bold text-slate-800">₹{payment.amount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Payment Method</p>
                <p className="font-medium text-slate-800">{payment.paymentMethod || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Description</p>
                <p className="font-medium text-slate-800">{payment.description}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Order ID</p>
                <p className="text-sm font-mono text-slate-600">{payment.razorpayOrderId}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Payment ID</p>
                <p className="text-sm font-mono text-slate-600">{payment.razorpayPaymentId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Created At</p>
                <p className="text-sm text-slate-600">{payment.createdAt ? new Date(payment.createdAt).toLocaleString() : 'N/A'}</p>
              </div>
              {payment.paidAt && (
                <div>
                  <p className="text-xs text-slate-500">Paid At</p>
                  <p className="text-sm text-slate-600">{new Date(payment.paidAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {payment.status === 'paid' && (
              <button
                onClick={() => {
                  onRefund(payment._id);
                  onClose();
                }}
                disabled={processingRefund === payment._id}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {processingRefund === payment._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                Process Refund
              </button>
            )}
            <button
              onClick={() => onDownloadPDF(payment)}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <FileDown className="w-5 h-5" />
              Download Receipt
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Players;