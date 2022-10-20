import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from "../store";

type UserBackendResponse = {
  roles: string[];
  token: string | undefined;
  message: string | null;
  statusCode: number;
};

type UserLogin = {
  phone: string;
  password: string;
};

type UserRegister = {
  firstName: string;
  lastName: string;
};

interface AuthState {
  user: UserBackendResponse | null;
  isLoading: boolean;
  errorFetch: any;
  message: string;
  //   urlBackendLogin: string;
  //   urlBackendRegister: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  errorFetch: null,
  message: '',
  // urlBackendLogin: "",
  // urlBackendRegister: ""
};

export const loginUser = createAsyncThunk<UserBackendResponse, UserLogin>(
  "auth/loginUser",
  async (userData: UserLogin): Promise<any> => {
    const response = await fetch("http://10.0.2.2:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, actions: PayloadAction<UserRegister>) => {},
  },
  extraReducers(builder) {
      builder.addCase(loginUser.pending, (state, action: PayloadAction) => {
        state.isLoading = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        const {statusCode} = action.payload;
        state.isLoading = false;
        switch (statusCode) {
          case 404:
            state.message = 'Пользователь не найден';
            break;
          case 401:
            state.message = 'Неправильный логин или пароль';
            break;

          default:
            state.user = action.payload;
            break;
        }

      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = true;
        state.errorFetch = action.error;
      });
  },
});

export const { register } = authSlice.actions;
export const userData = (state: RootState) => state.auth.user;
export default authSlice.reducer;
