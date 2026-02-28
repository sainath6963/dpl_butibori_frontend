import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

// ================= FETCH SEASON ONE =================
export const fetchSeasonOneImages = createAsyncThunk(
  "seasonImages/fetchSeasonOneImages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/upload/season-one-images`
      );
      console.log("Fetched Season One Images:", data.images);
      return data.images;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Season One images"
      );
    }
  }
);

// ================= FETCH SEASON TWO =================
export const fetchSeasonTwoImages = createAsyncThunk(
  "seasonImages/fetchSeasonTwoImages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/upload/season-two-images`
      );
      return data.images;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Season Two images"
      );
    }
  }
);

// ================= SLICE =================
const seasonImagesSlice = createSlice({
  name: "seasonImages",
  initialState: {
    seasonOneImages: [],
    seasonTwoImages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== SEASON ONE =====
      .addCase(fetchSeasonOneImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeasonOneImages.fulfilled, (state, action) => {
        state.loading = false;
        state.seasonOneImages = action.payload;
      })
      .addCase(fetchSeasonOneImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== SEASON TWO =====
      .addCase(fetchSeasonTwoImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeasonTwoImages.fulfilled, (state, action) => {
        state.loading = false;
        state.seasonTwoImages = action.payload;
      })
      .addCase(fetchSeasonTwoImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default seasonImagesSlice.reducer;