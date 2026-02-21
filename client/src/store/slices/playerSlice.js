import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

/* ================================
   ENV (Vite Syntax)
================================ */
const API = import.meta.env.VITE_BACKEND_URL;

/* ================================
   INITIAL STATE
================================ */
const initialState = {
  player: null,
  players: [],
  loading: false,
  error: null,
  success: false,
  message: null,
  totalCount: 0,
  registrationStatus: null,
  updateSuccess: false,
};

/* ================================
   ERROR HANDLER
================================ */
const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    return 'No response from server. Please check your connection.';
  } else {
    return error.message || 'An error occurred';
  }
};

/* ================================
   REGISTER PLAYER
================================ */
export const registerPlayer = createAsyncThunk(
  'player/register',
  async (playerData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post(
        `${API}/api/v1/players/register`,
        playerData,
        config
      );

      toast.success(data.message || 'Player registered successfully!');
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================================
   GET PROFILE
================================ */
export const getPlayerProfile = createAsyncThunk(
  'players/getProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.get(
        `${API}/api/v1/players/profile`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/* ================================
   UPDATE PROFILE
================================ */
export const updatePlayerProfile = createAsyncThunk(
  'players/updateProfile',
  async (playerData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config =
        playerData instanceof FormData
          ? {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token}`,
              },
            }
          : {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
              },
            };

      const { data } = await axios.put(
        `${API}/api/v1/players/profile`,
        playerData,
        config
      );

      toast.success(data.message || 'Profile updated successfully!');
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================================
   GET ALL PLAYERS (ADMIN)
================================ */
export const getAllPlayers = createAsyncThunk(
  'players/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.get(
        `${API}/api/v1/players/admin/all`,
        config
      );

      return data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================================
   UPDATE STATUS (ADMIN)
================================ */
export const updatePlayerStatus = createAsyncThunk(
  'players/updateStatus',
  async ({ id, status, jerseyNumber }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.put(
        `${API}/api/v1/players/admin/status/${id}`,
        { status, jerseyNumber },
        config
      );

      toast.success(data.message || 'Player status updated successfully!');
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================================
   CLEAR STATES
================================ */
export const clearPlayerError = createAsyncThunk(
  'player/clearError',
  async () => null
);

export const clearPlayerSuccess = createAsyncThunk(
  'player/clearSuccess',
  async () => null
);

/* ================================
   SLICE
================================ */
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    resetPlayerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.updateSuccess = false;
    },
    clearPlayerData: (state) => {
      state.player = null;
      state.players = [];
      state.totalCount = 0;
    },
    setRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* REGISTER */
      .addCase(registerPlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPlayer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.player = action.payload.player;
        state.message = action.payload.message;
        state.registrationStatus =
          action.payload.player?.registrationStatus || 'payment-pending';
      })
      .addCase(registerPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* PROFILE */
      .addCase(getPlayerProfile.fulfilled, (state, action) => {
        state.player = action.payload.player;
        state.registrationStatus =
          action.payload.player?.registrationStatus || null;
      })

      /* UPDATE */
      .addCase(updatePlayerProfile.fulfilled, (state, action) => {
        state.updateSuccess = true;
        state.player = action.payload.player;
      })

      /* ADMIN LIST */
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.players = action.payload.players;
        state.totalCount = action.payload.count;
      })

      /* CLEAR */
      .addCase(clearPlayerError.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(clearPlayerSuccess.fulfilled, (state) => {
        state.success = false;
        state.updateSuccess = false;
        state.message = null;
      });
  },
});

/* ================================
   EXPORTS
================================ */
export const {
  resetPlayerState,
  clearPlayerData,
  setRegistrationStatus,
} = playerSlice.actions;

export default playerSlice.reducer;