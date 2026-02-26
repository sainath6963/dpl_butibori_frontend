import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

// ================= INITIAL STATE =================
const initialState = {
  loading: false,
  order: null,
  paymentId: null,
  payment: null,
  success: false,
  error: null,
};

// ================= CREATE PAYMENT ORDER =================
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/api/v1/payments/create-order`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create payment order";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= VERIFY PAYMENT =================
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/api/v1/payments/verify`,
        paymentData
      );

      // 🔥 ADD THIS CHECK
      if (!data.success) {
        return rejectWithValue("Payment not verified");
      }

      toast.success("Payment Successful 🎉");
      return data;

    } catch (error) {
      const message =
        error.response?.data?.message || "Payment verification failed";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


// ================= GET USER PAYMENTS =================
export const getUserPayments = createAsyncThunk(
  "payment/myPayments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/payments/my-payments`,
        { withCredentials: true }
      );
      return data.payments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ================= GET PAYMENT STATUS =================
export const getPaymentStatus = createAsyncThunk(
  "payment/status",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/payments/status/${id}`,
        { withCredentials: true }
      );
      return data.payment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ================= ADMIN: GET ALL PAYMENTS =================
export const getAllPayments = createAsyncThunk(
  "payment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/payments/admin/all`,
        { withCredentials: true }
      );
      return data.payments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ================= ADMIN: PROCESS REFUND =================
export const processRefund = createAsyncThunk(
  "payment/refund",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/api/v1/payments/admin/refund/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Refund Processed Successfully");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Refund failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= UPDATE PAYMENT STATUS (for cancellations) =================
export const updatePaymentStatus = createAsyncThunk(
  "payment/updateStatus",
  async ({ paymentId, status }, { rejectWithValue }) => {
    try {

        console.log("🔵 Updating payment status:", { paymentId, status });
      console.log("🔵 Full URL:", `${API}/api/v1/payments/status/${paymentId}`);
      const { data } = await axios.patch(
        `${API}/api/v1/payments/status/${paymentId}`,
        { status },
        { withCredentials: true }
      );
      return data;
    } catch (error) {

      console.error("❌ Update failed - Full error:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Error headers:", error.response?.headers);
      
      const message = error.response?.data?.message || "Failed to update payment status";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);






// ================= SLICE =================
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.order = null;
      state.paymentId = null;
      state.payment = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== CREATE ORDER =====
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.paymentId = action.payload.paymentId;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== VERIFY PAYMENT =====
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(verifyPayment.fulfilled, (state, action) => {
  state.loading = false;

  // ✅ Only mark success if backend  success = true
  if (action.payload?.success) {
    state.success = true;
    state.payment = action.payload.payment;
  } else {
    state.success = false;
  }
})
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  // User Payments
      .addCase(getUserPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })

      // Admin All Payments
           .addCase(getAllPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })

      // ===== UPDATE PAYMENT STATUS =====
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;

        // Update payment status locally if needed
        if (state.payment) {
          state.payment.status = action.payload?.payment?.status;
        }
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

// ================= EXPORTS =================
export const { clearPaymentState } = paymentSlice.actions;

export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentSuccess = (state) => state.payment.success;
export const selectPaymentError = (state) => state.payment.error;
export const selectPaymentOrder = (state) => state.payment.order;

export default paymentSlice.reducer;