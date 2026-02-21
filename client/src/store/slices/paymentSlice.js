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
        state.success = true;
        state.payment = action.payload.payment;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
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