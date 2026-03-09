import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const initialState = {
  isAuthLoading: false,
  isAuthenticated: false,
  token: null,

  driverId: null,
};

// driver login
export const driverLogin = createAsyncThunk(
  'auth/Login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/driver/login`, {
        email,
        password,
      });
      // console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// driver checkAuth
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return false;
  }
  const decoded = jwtDecode(token);
  const now = new Date().getTime() / 1000;

  return {
    success: true,
    driverId: decoded.driverId,
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Login
      .addCase(driverLogin.pending, (state) => {
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(driverLogin.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
      })
      .addCase(driverLogin.rejected, (state) => {
        state.isAuthenticated = false;
        state.token = null;
      })

      //   check auth
      .addCase(checkAuth.pending, (state, action) => {
        state.isAuthLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthenticated = action.payload.success;
        state.driverId = action.payload.driverId;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.driverId = null;
      });
  },
});

export default authSlice.reducer;
