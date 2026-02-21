import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    loading: false,
    error: null,
    message: null,
    videos: [],
    video: null,
    totalVideos: 0,
  },
  reducers: {
    // Get all videos
    getAllVideosRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllVideosSuccess(state, action) {
      state.loading = false;
      state.videos = action.payload.videos || action.payload;
      state.totalVideos = action.payload.totalVideos || action.payload.length;
      state.error = null;
    },
    getAllVideosFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.videos = [];
    },

    // Get single video
    getVideoRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getVideoSuccess(state, action) {
      state.loading = false;
      state.video = action.payload.video || action.payload;
      state.error = null;
    },
    getVideoFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.video = null;
    },

    // Add video
    addVideoRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addVideoSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message || "Video added successfully";
      if (action.payload.video) {
        state.videos = [action.payload.video, ...state.videos];
      }
      state.error = null;
    },
    addVideoFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete video
    deleteVideoRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteVideoSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message || "Video deleted successfully";
      // Remove deleted video from state
      if (action.payload.videoId) {
        state.videos = state.videos.filter(video => video._id !== action.payload.videoId);
      }
      state.error = null;
    },
    deleteVideoFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear errors and messages
    clearVideoErrors(state) {
      state.error = null;
    },
    clearVideoMessages(state) {
      state.message = null;
    },
    resetVideoSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.videos = [];
      state.video = null;
      state.totalVideos = 0;
    },
  },
});

// Export actions
export const {
  clearVideoErrors,
  clearVideoMessages,
  resetVideoSlice,
} = videoSlice.actions;

// Thunk actions

// Get all videos
export const getAllVideos = () => async (dispatch) => {
  dispatch(videoSlice.actions.getAllVideosRequest());
  try {
    const { data } = await axios.get(`${API}/api/v1/videos/all`, {
      withCredentials: true,
    });
    dispatch(videoSlice.actions.getAllVideosSuccess(data));
  } catch (error) {
    dispatch(
      videoSlice.actions.getAllVideosFailed(
        error?.response?.data?.message || "Failed to fetch videos"
      )
    );
  }
};

// Get single video by ID (if you have this endpoint)
export const getVideo = (id) => async (dispatch) => {
  dispatch(videoSlice.actions.getVideoRequest());
  try {
    const { data } = await axios.get(`${API}/api/v1/videos/${id}`, {
      withCredentials: true,
    });
    dispatch(videoSlice.actions.getVideoSuccess(data));
  } catch (error) {
    dispatch(
      videoSlice.actions.getVideoFailed(
        error?.response?.data?.message || "Failed to fetch video"
      )
    );
  }
};

// Add video
export const addVideo = (videoData) => async (dispatch) => {
  dispatch(videoSlice.actions.addVideoRequest());
  try {
    const { data } = await axios.post(`${API}/api/v1/videos/add`, videoData, {
      withCredentials: true,
      headers: { 
        "Content-Type": videoData instanceof FormData ? "multipart/form-data" : "application/json" 
      },
    });
    dispatch(videoSlice.actions.addVideoSuccess(data));
    return data; // Return for potential chaining
  } catch (error) {
    dispatch(
      videoSlice.actions.addVideoFailed(
        error?.response?.data?.message || "Failed to add video"
      )
    );
    throw error; // Re-throw for component-level handling
  }
};

// Delete video
export const deleteVideo = (id) => async (dispatch) => {
  dispatch(videoSlice.actions.deleteVideoRequest());
  try {
    const { data } = await axios.delete(`${API}/api/v1/videos/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(
      videoSlice.actions.deleteVideoSuccess({
        ...data,
        videoId: id,
      })
    );
    return data;
  } catch (error) {
    dispatch(
      videoSlice.actions.deleteVideoFailed(
        error?.response?.data?.message || "Failed to delete video"
      )
    );
    throw error;
  }
};

// Export reducer
export default videoSlice.reducer;