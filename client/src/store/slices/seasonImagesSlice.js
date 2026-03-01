import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

/* ======================================================
   FETCH SEASON ONE IMAGES
====================================================== */
export const fetchSeasonOneImages = createAsyncThunk(
  "seasonImages/fetchSeasonOneImages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/upload/season-one-images`
      );
      return data.images;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Season One images"
      );
    }
  }
);

/* ======================================================
   FETCH SEASON TWO IMAGES
====================================================== */
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

/* ======================================================
   UPLOAD SEASON ONE
====================================================== */
export const uploadSeasonOneImages = createAsyncThunk(
  "seasonImages/uploadSeasonOneImages",
  async (files, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post(
        `${API}/api/v1/upload/image/seasonone`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return data.images;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Upload failed"
      );
    }
  }
);

/* ======================================================
   UPLOAD SEASON TWO
====================================================== */
export const uploadSeasonTwoImages = createAsyncThunk(
  "seasonImages/uploadSeasonTwoImages",
  async (files, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post(
        `${API}/api/v1/upload/image/seasontwo`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return data.images;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Upload failed"
      );
    }
  }
);

/* ======================================================
   DELETE SEASON ONE
====================================================== */
export const deleteSeasonOneImage = createAsyncThunk(
  "seasonImages/deleteSeasonOneImage",
  async (imageUrl, { rejectWithValue }) => {
    try {
      const fileName = imageUrl.split("/").pop();

      await axios.delete(
        `${API}/api/v1/upload/image/seasonone/${fileName}`
      );

      return imageUrl;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

/* ======================================================
   DELETE SEASON TWO
====================================================== */
export const deleteSeasonTwoImage = createAsyncThunk(
  "seasonImages/deleteSeasonTwoImage",
  async (imageUrl, { rejectWithValue }) => {
    try {
      const fileName = imageUrl.split("/").pop();

      await axios.delete(
        `${API}/api/v1/upload/image/seasontwo/${fileName}`
      );

      return imageUrl;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

/* ======================================================
   SLICE
====================================================== */
const seasonImagesSlice = createSlice({
  name: "seasonImages",
  initialState: {
    seasonOneImages: [],
    seasonTwoImages: [],
    loading: false,
    uploading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ========= FETCH ========= */
      .addCase(fetchSeasonOneImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeasonOneImages.fulfilled, (state, action) => {
        state.loading = false;
        state.seasonOneImages = action.payload;
      })
      .addCase(fetchSeasonOneImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSeasonTwoImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeasonTwoImages.fulfilled, (state, action) => {
        state.loading = false;
        state.seasonTwoImages = action.payload;
      })
      .addCase(fetchSeasonTwoImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= UPLOAD ========= */
      .addCase(uploadSeasonOneImages.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadSeasonOneImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.seasonOneImages = [
          ...action.payload,
          ...state.seasonOneImages,
        ];
      })
      .addCase(uploadSeasonOneImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      .addCase(uploadSeasonTwoImages.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadSeasonTwoImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.seasonTwoImages = [
          ...action.payload,
          ...state.seasonTwoImages,
        ];
      })
      .addCase(uploadSeasonTwoImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      /* ========= DELETE ========= */
      .addCase(deleteSeasonOneImage.fulfilled, (state, action) => {
        state.seasonOneImages = state.seasonOneImages.filter(
          (img) => img !== action.payload
        );
      })

      .addCase(deleteSeasonTwoImage.fulfilled, (state, action) => {
        state.seasonTwoImages = state.seasonTwoImages.filter(
          (img) => img !== action.payload
        );
      });
  },
});

export default seasonImagesSlice.reducer;