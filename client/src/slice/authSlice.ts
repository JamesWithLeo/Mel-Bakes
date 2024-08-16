import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartTypeface } from "../Product/CartComponent";

const userlocal = localStorage.getItem("melbakesUser");
const user: IAccount | null = userlocal ? JSON.parse(userlocal) : null;

export type IAccount = {
  Type: "admin" | "user";
  _id: string;
  Gmail: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Contact: string;
  Address: string;
  Cart: CartTypeface[];
};
export type IAuthMessage = "Account doesn't exist" | null | "Wrong Password";
interface IUserInit {
  User: IAccount | null;
  AuthMessage: null | string;
  LoginTriesCount: number;
}
const userInit: IUserInit = {
  User: user ? user : null,
  AuthMessage: null,
  LoginTriesCount: 0,
};
const authSlice = createSlice({
  initialState: userInit,
  name: "auth",
  reducers: {
    ResetAuthMessage: (state) => {
      state.AuthMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      state.User = action.payload.User;
      state.AuthMessage = action.payload.AuthMessage;
      localStorage.setItem("melbakesUser", JSON.stringify(action.payload.User));
    });
    builder.addCase(Login.rejected, (state) => {
      state.User = null;
      localStorage.removeItem("melbakesUser");
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.User = null;
      state.AuthMessage = null;
      localStorage.removeItem("melbakesUser");
    });
  },
});
const LoginRequest = async (email: string) => {
  return axios
    .get("melbake/login/" + email)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      return response;
    });
};

export const Login = createAsyncThunk(
  "auth/Login",
  async (
    { Gmail, Password }: { Gmail: string; Password: string },
    thunkApi,
  ) => {
    type returnType = {
      User: null | IAccount;
      AuthMessage: IAuthMessage | null;
    };
    const document = await LoginRequest(Gmail);
    if (!document) {
      const authloginResult: returnType = {
        User: null,
        AuthMessage: "Account doesn't exist",
      };
      return authloginResult;
    }
    if (document.Password && document.Password !== Password) {
      const authloginResult: returnType = {
        User: null,
        AuthMessage: "Wrong Password",
      };
      return authloginResult;
    }
    delete document.Password;
    const authloginResult: returnType = {
      User: document,
      AuthMessage: null,
    };
    return authloginResult;
  },
);

export const Logout = createAsyncThunk("auth/Logout", async () => {
  return;
});
export const { ResetAuthMessage } = { ...authSlice.actions };
export default authSlice.reducer;
