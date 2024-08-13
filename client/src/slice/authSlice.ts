import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userlocal = localStorage.getItem("melbakesUser");
const user = userlocal ? JSON.parse(userlocal) : null;

type IUser = {
  Type: "admin" | "user";
  _id: string;
  Gmail: string;
  Password: string;
  FirstName: string;
  LastName: string;
};
interface IUserInit {
  User: IUser | null;
}
const userInit: IUserInit = {
  User: user,
};

const authSlice = createSlice({
  initialState: userInit,
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      state.User = action.payload;
      localStorage.setItem("melbakesUser", JSON.stringify(action.payload));
    });
    builder.addCase(Login.rejected, (state) => {
      state.User = null;
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.User = null;
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
      return;
    });
};

export const Login = createAsyncThunk(
  "auth/Login",
  async (
    { Gmail, Password }: { Gmail: string; Password: string },
    thunkApi,
  ) => {
    return await LoginRequest(Gmail);
  },
);

export const Logout = createAsyncThunk("auth/Logout", async () => {
  return;
});

export default authSlice.reducer;
